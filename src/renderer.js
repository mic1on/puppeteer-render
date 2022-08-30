import fs from 'fs'
import puppeteer from 'puppeteer'
import useProxy from 'puppeteer-page-proxy'

import {pageSchema, pdfSchema, screenshotSchema} from './schemas/index.js'
import waitForAnimations from './wait-for-animations.js'
import {randomUserAgent} from './utils.js'

class Renderer {
  constructor(browser) {
    this.browser = browser
  }

  async html(url, options = {}) {
    let page = null
    try {
      page = await this.createPage(url, options)
      return await page.content()
    } finally {
      await this.closePage(page)
    }
  }

  async pdf(url, options = {}) {
    let page = null
    try {
      const { pdf, ...extraOptions } = options

      page = await this.createPage(url, extraOptions)
      const pdfOptions = await pdfSchema.validate(pdf)

      return await page.pdf(pdfOptions)
    } finally {
      await this.closePage(page)
    }
  }

  async screenshot(url, options = {}) {
    let page = null
    try {
      const { screenshot, ...extraOptions } = options
      const {
        animationTimeout,
        ...screenshotOptions
      } = await screenshotSchema.validate(screenshot)

      page = await this.createPage(url, extraOptions)

      if (animationTimeout > 0) {
        await waitForAnimations(page, screenshotOptions, animationTimeout)
      }

      const buffer = await page.screenshot(screenshotOptions)
      return {
        screenshotType: screenshotOptions.type,
        buffer,
      }
    } finally {
      await this.closePage(page)
    }
  }

  async createPage(url, options = {}) {
    // 从 options 中提取 page 所需参数
    const {
      timeout,
      mode,
      waitUntil,
      credentials,
      emulateMediaType,
      headers,
      cookies,
      waitForXPath,
      proxy
    } = await pageSchema.validate(options)
    const page = await this.browser.newPage()
    try {
      page.setUserAgent(randomUserAgent())
      // remove webdriver
      await page.evaluateOnNewDocument('const newProto = navigator.__proto__;delete newProto.webdriver;navigator.__proto__ = newProto;');
      if (mode === 'fuck') {
        const preloadFile = fs.readFileSync('src/stealth.min.js', 'utf8')
        await page.evaluateOnNewDocument(preloadFile)
      }
      if (headers) {
        await page.setExtraHTTPHeaders(headers)
      }
      if (proxy) {
        await useProxy(page, proxy)
      }
      // add cookies
      if (cookies) {
        const cookiesArray = cookies.split('; ').map(cookie => {
          const [name, ...value] = cookie.split('=')
          return { name, value: value.join('='), url }
        })
        await page.setCookie(...cookiesArray)
      }

      await page.setCacheEnabled(false)

      page.on('error', async error => {
        console.error(error)
        await this.closePage(page)
      })

      if (emulateMediaType) {
        await page.emulateMediaType(emulateMediaType)
      }

      if (credentials) {
        await page.authenticate(credentials)
      }

      if (waitForXPath) {
        const { xpath, ...xpathOptions } = waitForXPath
        if (xpath) {
          await page.waitForXPath(xpath, xpathOptions)
        }
      }

      await page.goto(url, { timeout, waitUntil })
      return page
    } catch (e) {}
    return page
  }

  async closePage(page) {
    try {
      if (page && !page.isClosed()) {
        await page.close()
      }
    } catch (e) {}
  }

  async close() {
    await this.browser.close()
  }
}

async function create(options = {}) {
  const browser = await puppeteer.launch(Object.assign(
    { args: ['--no-sandbox', '--disable-web-security'] }, options)
  )
  return new Renderer(browser)
}

export default create
