#!/usr/bin/env node
const path = require('path')

global.__basedir = path.resolve(__dirname)

const watchFolders = require('./index.js') 

watchFolders()