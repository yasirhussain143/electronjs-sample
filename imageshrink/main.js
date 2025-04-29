const { app, BrowserWindow ,Menu, globalShortcut, ipcMain } = require('electron');
const path = require('path')

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV != 'production' ? true : false;
const isMac = process.platform == 'darwin' ? true : false;
console.log(process.platform)

let win;
let aboutwin;
function createWindow() {
  win = new BrowserWindow({
    width: isDev ? 900 : 800,
    height: 700,
    resizable: isDev ? true : false,
    backgroundColor: '#2f3156',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      allowFileAccess: true,  
       sandbox: false, 
            
    }
  });

  win.loadFile('app/index.html');
  if (isDev) {
    win.webContents.openDevTools()
  }



}

function createAboutWindow() {
  aboutwin = new BrowserWindow({
    title: 'About',
    width: 300,
    height: 300,
    icon:  `${__dirname}/app/assets/profile-pic.png`,
    resizable: isDev ? true : false,
    backgroundColor: '#2f3186',
    // parent: win,
    // modal: true,
  });

  aboutwin.loadFile('app/about.html');
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }



}
app.on ('ready' , () => {
  createWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  
  globalShortcut.register('CommandOrControl+R', () => win.reload())
  globalShortcut.register('CommandOrControl+Shift+I', () => win.webContents.toggleDevTools())


    win.on('close', () => win ='null' )
  })

const menu = [
  ...(isMac ? [{

        label: app.name,
        submenu:[
          {
          label: 'about',
          click: createAboutWindow,
          }
        ]
  }]  :[]),
    {
    role: 'fileMenu',
    } ,
    ...(!isMac ? [{

      label: Help,
      submenu:[
        {
        label: 'about',
        click: createAboutWindow,
        }
      ]
}]  :[]),
    ...(isDev ? [
      { label: 'developer'
        , submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {type: 'separator'},
          {role: 'toggledevtools'},
          {role: 'togglefullscreen'},
         

        ]
      }
] : [] ) 
]

ipcMain.on('image:minimize' , (e,options) => {
console.log(options)
})

app.on('window-all-closed' ,() => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    createAboutWindow();
  }
});