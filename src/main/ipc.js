import { ipcMain } from 'electron' // eslint-disable-line

import crawler from './lib/crawler.js'

async function getList(event, page) {
  const result = await crawler.list(page)
  event.sender.send('done-get-list', result)
}

ipcMain.on('do-get-list', (event, page) => {
  getList(event, page)
})

ipcMain.on('do-get-page', async (event, page) => {
  const result = await crawler.page(page)
  event.sender.send('done-get-page', result)
})
