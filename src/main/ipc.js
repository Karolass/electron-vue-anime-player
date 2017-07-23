import { ipcMain } from 'electron' // eslint-disable-line

import crawler from './lib/crawler.js'

async function getList(event, page) {
  const result = await crawler.list(page)
  event.sender.send('done-get-list', result.data)

  if (result.next) {
    getList(event, result.next)
  }
}

ipcMain.on('do-get-list', (event) => {
  getList(event)
})

ipcMain.on('do-get-page', async (event, page) => {
  const result = await crawler.page(page)
  event.sender.send('done-get-page', result)
})
