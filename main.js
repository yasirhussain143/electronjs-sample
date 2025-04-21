const { app, BrowserWindow } = require('electron');

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV != 'production' ? true : false;
const isMac = process.platform == 'darwin' ? true : false;
console.log(process.platform)

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/profile-pic.png',
    resizable: isDev ? true : false,
  });

  win.loadFile('index.html');
   // Open DevTools
  //  win.webContents.openDevTools();



}

app.on ('ready' , createWindow);

app.on('window-all-closed' ,() => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});