import yup from 'yup'

const pageSchema = yup.object({
  timeout: yup.number().default(30 * 1000),
  waitUntil: yup.string().default('networkidle2'),
  credentials: yup.object({
    username: yup.string(),
    password: yup.string()
  }),
  headers: yup.object(),
  proxy: yup.string(),
  cookies: yup.string(),
  emulateMediaType: yup.string(),
  waitForXPath: yup.object({
    xpath: yup.string(),
    timeout: yup.number().default(30 * 1000),
    visible: yup.boolean().default(false),
    hidden: yup.boolean().default(false),
  }).default({})
})

export default pageSchema
