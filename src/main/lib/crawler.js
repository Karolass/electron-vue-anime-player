const cheerio = require('cheerio')
const request = require('./request')

const baseUrl = 'http://myself-bbs.com/'

exports.list = async (page) => {
  try {
    // const html = await request.get(`forum-133-${page}.html`)
    const html = page ? await request.get(page) : await request.get('forum-133-1.html')

    const result = {
      next: '',
      data: [],
    }
    const $ = cheerio.load(html)

    $('.ml.mlt.mtw.cl li').each((i, element) => {
      const href = $(element).find('.c.cl a').attr('href')
      const title = $(element).find('.c.cl a').attr('title')
      const image = $(element).find('.c.cl a img').attr('src')
      const update = $(element).find('.c.cl .ep_box .ep_info').text()

      result.data[i] = {
        href,
        title,
        image: baseUrl + image,
        update,
      }
    })

    const next = $('.nxt')
    if (next.length > 0) {
      result.next = next[0].attribs.href
    }

    return result
  } catch (err) {
    return err
  }
}

exports.page = async (page) => {
  try {
    const html = await request.get(page)

    const result = {
      info: {},
      list: [],
    }
    const $ = cheerio.load(html)

    result.info = {
      image: $('.info_con .info_img_box img').attr('src'),
      desc: $('.info_con .info_info .info_introduction p').text(),
    }

    $('.main_list > li').each((i, element) => {
      const title = $(element).children('a').text()
      let google
      let bilibili

      $(element).find('ul li').each((i, element) => {
        const temp = $(element).children('a').text()
        if (temp === '雲端') {
          google = $(element).children('a').data('href').replace(/\n/, '')
        }
        if (temp === 'B站') {
          bilibili = $(element).children('a').data('href').replace(/\n/, '')
        }
      })

      result.list.push({
        title,
        google,
        bilibili,
      })
    })

    return result
  } catch (err) {
    return err
  }
}
