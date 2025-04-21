const { app, BrowserWindow ,Menu, globalShortcut} = require('electron');

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV != 'production' ? true : false;
const isMac = process.platform == 'darwin' ? true : false;
console.log(process.platform)

let win;
let aboutwin;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/profile-pic.png',
    resizable: isDev ? true : false,
    backgroundColor: '#2f3156',
  });

  win.loadFile('index.html');
   // Open DevTools
  //  win.webContents.openDevTools();



}

function createAboutWindow() {
  aboutwin = new BrowserWindow({
    title: 'About',
    width: 300,
    height: 200,
    icon: __dirname + '/profile-pic.png',
    resizable: isDev ? true : false,
    backgroundColor: '#2f3186',
    // parent: win,
    // modal: true,
  });

  aboutwin.loadFile('about.html');
   // Open DevTools
  //  win.webContents.openDevTools();



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

      label: help,
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