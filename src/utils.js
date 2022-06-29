import { URL } from 'url'
import UserAgent from 'user-agents'


const getFileName = (url) => {
  let filename
  const urlObj = new URL(url)
  filename = urlObj.hostname
  if (urlObj.pathname !== '/') {
    filename = urlObj.pathname.split('/').pop()
    if (filename === '') filename = urlObj.pathname.replace(/\//g, '')
    const extDotPosition = filename.lastIndexOf('.')
    if (extDotPosition > 0) filename = filename.substring(0, extDotPosition)
  }
  if (!filename.toLowerCase().endsWith('.pdf')) {
    filename += '.pdf'
  }
  return filename
}


const randomUserAgent = () => {
  // 生成随机的user-agent
  const userAgent = new UserAgent()
  return userAgent.toString()
}

export {
  getFileName,
  randomUserAgent
}
