import { ipcMain } from 'electron' // eslint-disable-line

import crawler from './lib/crawler.js'

ipcMain.on('do-get-list', async (event, data) => {
  const result = await crawler.list(data.page, data.type)
  event.sender.send('done-get-list', result)
})

ipcMain.on('do-get-page', async (event, page) => {
  const result = await crawler.page(page)
  event.sender.send('done-get-page', result)
})
