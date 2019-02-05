#!/usr/bin/env node
const path = require('path')

global.__basedir = process.cwd()



const watchFolders = require('./index.js') 

watchFolders()