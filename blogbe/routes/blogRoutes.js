const express = require('express')
const router = express.Router()
const controller = require("../controller/blogController.js")
const multer = require("multer")
// const { S3Client } = require('@aws-sdk/client-s3')
// const multerS3 = require('multer-s3')
require('dotenv').config()

const storage= multer.memoryStorage()
const upload = multer({stroage:storage})
// const s3 = new S3Client()


// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })


router.post("/blogs", upload.single('imageName'), controller.storeBlog)
router.get("/blogs", controller.getBlog)
// router.delete("/blogs/:id", controller.deleteBlog)

module.exports = router