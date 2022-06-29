import createRenderer from './renderer.js'
import contentDisposition from 'content-disposition'
import { getFileName } from './utils.js'

let renderer = null

createRenderer({
  ignoreHTTPSErrors: !!process.env.IGNORE_HTTPS_ERRORS,
  ignoreDefaultArgs: ['--enable-automation'],
  headless: true
}).then(rendered => {
  renderer = rendered
  console.info('Initialized renderer.')
}).catch(e => {
  console.error(e)
  process.exit(1)
})

const renderHandler = async (req, res, next) => {
  let { url, type, filename, ...options } = req.body
  if (!url) {
    return res.status(400).send('Search with url parameter. For eaxample, ?url=http://yourdomain')
  }

  if (!url.includes('://')) {
    url = `http://${url}`
  }
  try {
    switch (type) {
      case 'pdf':
        let pdfFileName = filename || getFileName(url)
        if (!pdfFileName.toLowerCase().endsWith('.pdf')) {
          pdfFileName += '.pdf'
        }
        const pdf = await renderer.pdf(url, options)
        res
          .set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdf.length,
            'Content-Disposition': contentDisposition(pdfFileName, {
              type: 'attachment',
            }),
          })
          .send(pdf)
        break
      case 'screenshot':
        const { screenshotType, buffer } = await renderer.screenshot(url, options)
        res
          .set({
            'Content-Type': `image/${screenshotType || 'png'}`,
            'Content-Length': buffer.length,
          })
          .send(buffer)
        break
      default:
        const html = await renderer.html(url, options)
        res.status(200).send(html)
    }
  } catch (e) {
    next(e)
  }

}

export default renderHandler
