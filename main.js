const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'videos.db');
const db = new Database(dbPath);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: 'logo.png',
  })

  ipcMain.handle('ping', () => 'pong')

  ipcMain.on('query', (event, query) => {
    const statement = db.prepare('SELECT * FROM testing');
    const rows = statement.all();
    event.sender.send('query-result', rows);
  });

  // Open the DevTools.
  win.webContents.openDevTools()

  // Make the window fullscreen
  win.maximize()

  // Final
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})