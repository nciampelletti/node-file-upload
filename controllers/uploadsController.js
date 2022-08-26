const { StatusCodes } = require("http-status-codes")
const path = require("path")
const CustomError = require("../errors")

const uploadProductImage = async (req, res) => {
  //check if file exists
  //check format
  //check size
  console.log(req.files)

  if (!req.files) {
    throw new CustomError.BadRequestError("no file uploaded")
  }

  let productIamge = req.files.image

  if (!productIamge.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("please upload image")
  }

  const maxSize = 1024 * 1024 //1MB
  if (!productIamge.size > maxSize) {
    throw new CustomError.BadRequestError("please upload image smaller 1KB")
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productIamge.name}`
  )
  await productIamge.mv(imagePath)

  return res.status(StatusCodes.OK).json({
    image: { src: `/uploads/${productIamge.name}` },
  })
}

module.exports = {
  uploadProductImage,
}
