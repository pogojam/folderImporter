# FolderImporter
Automatically generate imports for new .js files created in your folders
## Install
`npm install folderimporter -g`
## *importrc.json*
Add this file to your root directory
## importrc.json Structure 
This file imports styled-component's *styled* object to all js files inside my *./components* dir
 ```json
{
  "folders": [
    {
      "dir": "/components",
      "imports": {
             "styled-componetns":"styled",
             //Add braces for destructured imports
             "react":"react {Components,reactDOM}"
}
    }
  ]
}
```
## Start
to start the service open your terminal and type
`folderWatch`

