const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('api', {
  getAllRows: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('query-result', (event, rows) => {
        resolve(rows);
      });
      ipcRenderer.send('query', 'SELECT * FROM testing');
    });
  }
});