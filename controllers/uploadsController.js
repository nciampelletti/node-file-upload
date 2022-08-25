const { StatusCodes } = require("http-status-codes")
const path = require("path")

const uploadProductImage = async (req, res) => {
  let productIamge = req.files.image

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
