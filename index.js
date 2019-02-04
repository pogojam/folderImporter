const fs = require("fs");
const chokidar = require("chokidar");
const prependFile = require("prepend-file");

const CONFIG = JSON.parse(fs.readFileSync("./importrc.json", "utf-8"));

const ImportTemplate = {
  makeBraces: i => (i === 1 || i === module.variables.length ? "{" : ""),

  makeBasic: name => `import ${name}`,
  makeShallow: module => `import ${module.objects[0]}`,
  makeNested: (name, objects) =>
    `import ${objects.reduce(
      (sum, val, i) => makeBraces(i) + sum + "," + val
    )} from '${name}'`
};

const startChokidar = folders =>
  chokidar.watch(folders, {
    persistent: true
  });

const doesHaveImports = (filePath, module) => {
  const path = `${module}`;
  const pattern = new RegExp(path, "g");
  return fs.readFileSync(filePath, "utf-8").match(pattern);
};

const addImports = (file, imports) => {
  console.log(imports);

  prependFile(file, imports, err =>
    err ? console.log(err) : console.log("Added Imports",file)
  );
};

watchFolders = ()=>CONFIG.folders.map(folder => {
    
    console.log('starting watcher')

  startChokidar(folder.dir).on("add", () =>
    fs.readdir(folder.dir, (err, dirArray) => {
      dirArray.forEach(dirName => {
        const filePath = folder.dir + "/" + dirName;

        //  Add Imports

        folder.imports.forEach(({ name, objects }) => {
          // Check If Existing Import
          if (!doesHaveImports(filePath, name)) {
            const ImportedFiles = ImportTemplate.makeNested(name, objects);

            addImports(filePath, ImportedFiles);
          }
        });
      });
    })
  );
});


module.exports = watchFolders