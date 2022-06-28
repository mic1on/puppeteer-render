import yup from 'yup'

const screenshotSchema = yup.object({
  type: yup.string().default('png'),
  path: yup.string(),
  quality: yup.number().default(0),
  fullPage: yup.boolean().default(false),
  clip: yup
    .object({
      x: yup.number(),
      y: yup.number(),
      width: yup.number(),
      height: yup.number(),
    })
    .default(undefined),
  omitBackground: yup.boolean(),
  encoding: yup.string(),

  // Extra options
  width: yup.number().default(800),
  height: yup.number().default(600),
  animationTimeout: yup.number().default(0),
})

export default screenshotSchema
