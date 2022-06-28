import yup from 'yup'

const pdfSchema = yup.object({
  path: yup.string(),
  scale: yup.number().default(1.0),
  displayHeaderFooter: yup.boolean(),
  headerTemplate: yup.string(),
  footerTemplate: yup.string(),
  printBackground: yup.boolean(),
  landscape: yup.boolean(),
  pageRanges: yup.string(),
  format: yup.string(),
  width: yup.string(),
  height: yup.string(),
  margin: yup.object({
    top: yup.string(),
    right: yup.string(),
    bottom: yup.string(),
    left: yup.string(),
  }),
  preferCSSPageSize: yup.boolean(),
})

export default pdfSchema
