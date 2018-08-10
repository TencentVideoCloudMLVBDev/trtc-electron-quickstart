//'use strict';

const {app, BrowserWindow} = require('electron');

var mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    // 打开开发者工具
    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('./index.html');
}

app.on('ready', createWindow);