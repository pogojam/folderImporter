const fs = require("fs");
const chokidar = require("chokidar");
const prependFile = require("prepend-file")

const CONFIG = JSON.parse(fs.readFileSync("./importrc.json", "utf-8"));

// console.log(CONFIG)

// const makeImportTemplate = module => {
//   const makeBraces = i => (i === 1 || i === module.variables.length ? "{" : "");
//   return {
//     basic: `import ${module.name}`,
//     variables: `import ${module.variables.reduce(
//       (sum, val, i) => makeBraces(i) + sum + "," + val
//     )} ${module.name}`
//   };
// };


const ImportTemplate =  {
    makeBraces : i => (i === 1 || i === module.variables.length ? "{" : ""),
    
    makeBasic:(name)=> `import ${name}`,
    makeShallow:(module)=>`import ${module.objects[0]}`,
    makeNested:(name,objects)=>`import ${objects.reduce(
        (sum, val, i) => makeBraces(i) + sum + "," + val
      )} from '${name}'`
  };

const watchFolder = folders =>
  chokidar.watch(folders, {
    persistent: true
  });

const doesHaveImports = (filePath, module) => {
  const path = `${module}`;
  const pattern = new RegExp(path, "g");
  return fs.readFileSync(filePath, "utf-8").match(pattern);
};

const addImports = (file,imports) =>{
        console.log(imports);
        
    prependFile(file, imports, err =>
            err ? console.log(err) : console.log("saved")
          );
}

CONFIG.folders.map(folder => {
  watchFolder(folder.dir).on("add", () =>
    fs.readdir(folder.dir, (err, dirArray) => {
      dirArray.forEach(dirName => {

        const filePath = folder.dir + "/" + dirName;
       
        //  Add Imports

        folder.imports.forEach(({name,objects})=>{
            // Check If Existing Import
    if (!doesHaveImports(filePath, name)) {


        const ImportedFiles = ImportTemplate.makeNested(name,objects)

        addImports(filePath,ImportedFiles)
    }

})
      });
    })
  );
});
