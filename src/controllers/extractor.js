import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

const extractorHandler = async(req, res, next) => {
    const { html } = req.body
    const doc = new JSDOM(html)
    const reader = new Readability(doc.window.document)
    const article = reader.parse()
    res.status(200).send(article)
}
export default extractorHandler
