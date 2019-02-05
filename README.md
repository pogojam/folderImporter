# folderImporter
Automatically generate imports for new .js files created in your folders
## importrc.json
Add this file to your root directory
## Structure 
This file imports styled-component's styled object to all js files inside my *./components* dir
 ```json
{
  "folders": [
    {
      "dir": "./components",
      "imports": [
              { "name": "styled-components", "objects": ["styled"]},
              { "name": "react", "objects": ["React"] }
]
    }
  ]
}
```


