# FolderImporter
Automatically generate imports for new .js files created in your folders
## Install
`npm install folderimporter -g`
## *importrc.json*
Add this file to your root directory
## importrc.json Structure 
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
## Start
to start the service open your terminal and type
`folderWatch`

