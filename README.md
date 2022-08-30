# puppeteer api
#### 基于puppeteer和Node的服务端渲染，提供Docker一键部署及API调用接口。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220714221947.png)

## 功能 features

- [x] 支持三种渲染模式的API接口（HTML、PDF、screenshots)
- [x] 支持随机动态user-agent
- [x] 支持在fuck模式下隐藏浏览器特征
- [x] 支持自定义cookies、自定义headers、自定义代理proxy

## 运行

- docker
如果你想直接使用本项目，可以直接docker运行。
> docker run -d -p 8080:3000 --name render miclon/puppeteer-render

- 本地运行
你首先需要拉取此项目。
  - 安装依赖
  > npm install
  - 执行
  > npm run dev


## API

```
POST http://127.0.0.1:3000/render

{
  "url": "https://www.baidu.com", // 必要参数
  "mode": "fuck" // 可选，隐藏浏览器特征
  "timeout": 30000, // 超时时间，默认30000ms
  "waitUntil": "load", // 渲染完成时等待的事件，默认load，可选：load、domcontentloaded、networkidle0、networkidle2
  "type": "pdf",  // 三种模式：html, pdf, screenshot
  "filename": "123.pdf", // 可选，在pdf模式下保存的文件名
  "pdf": {        // 可选，在pdf模式下的配置，所有属性可选
      ...
      // 具体属性配置参考：
      // https://github.com/puppeteer/puppeteer/blob/v1.1.0/docs/api.md#pagepdfoptions
  },
  "screenshot": { // 可选，在screenshot模式下的配置，所有属性可选
      ...
      // 具体属性配置参考：
      // https://github.com/puppeteer/puppeteer/blob/v1.1.0/docs/api.md#pagescreenshotoptions
  },
  "waitForXPath": { // 可选，等待指定xpath显示。
    xpath: "...",
    ...
    // 具体属性配置参考：
    // https://github.com/puppeteer/puppeteer/blob/v1.1.0/docs/api.md#pagewaitforxpathxpath-options
  },
  "cookies": "...", // 可选，设置cookies，格式为cookies字符串，可以直接从浏览器抓包复制。例如："_ga=GA1.2.1234567890.1548994800; _gid=GA1.2.1234567890.1548994800; _gat=1"
  "headers": {
    "...": "...", // 可选，设置headers，格式为headers对象，可以直接从浏览器抓包复制。例如：{"Accept-Language": "zh-CN,zh;q=0.9"}
  },
  "proxy": "",
  "credentials": {  // 可选，设置credentials，例如：{"username": "...", "password": "..."}
     "username": "...", // 可选，设置用户名
     "password": "..." // 可选，设置密码
  }
}
```
完整的API接口请查看：[接口文档](https://www.apifox.cn/apidoc/shared-6dcc2010-6913-4fe0-88a3-333791d80548)

## fuck模式

利用的`puppeteer-extra-plugin-stealth`插件中提取的stealth.min.js文件。
参考文章：[最完美方案！模拟浏览器如何正确隐藏特征](https://mp.weixin.qq.com/s/Bge-_yiatSq4CQq7fRvjdQ)

## License

[MIT](http://opensource.org/licenses/MIT)
