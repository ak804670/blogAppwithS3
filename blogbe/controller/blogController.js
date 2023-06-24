
const blogModel = require("../schema/blogSchema.js")

const sharp= require("sharp")

const {getObjectSignedUrl, uploadFile} = require("../s3.js")

const crypto = require("crypto")


const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


const storeBlog = async (req, res) => {
    try {

        const file = req.file
        console.log(req.file.buffer)
        const imageName= generateFileName()
        console.log(imageName)
        const { content,author, heading } = req.body;
        console.log(req.body)
        const fileBuffer= await sharp(file.buffer)
        .resize({height:1920, width:1080, fit:"contain"})
        .toBuffer()
        

        await uploadFile(fileBuffer, imageName, file.mimetype)
       

        const myData = new blogModel({ imageName, content,author, heading });
        const data = await myData.save();

        console.log(data)

        return res.status(200).json({
            message:"Blog Added successfully",
            status:200,
            data:data
        })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message:"something went wrong!",
            status:500,
            data:{}
        })
    }
}

const getBlog = async (req, res) => {
    try {
        // find last five blogs 
        const data = await blogModel.find().sort({_id:-1})
        console.log(data)
        

        for (let post of data) {
            post.imageName = await getObjectSignedUrl(post.imageName)
          }

        
        if (data.length === 0) {
            // if no blog found
            return res.status(200).json({
                message:"be the first to add somthing!",
                status:200,
                data:null
            })    
        }
        
        // have any blog then print this message
        return res.send(data)
        
            // res.status(200).json({
            // message:"some blogs for you!",
            // status:200,
            // data:data})
        
    } catch (error) {
        console.log("error", error.message);
        return res.status(503).json({
            message:"something went wrong! do",
            status:503,
            data:{}
        })
    }
}


// const deleteBlog = async (req, res) => {
//     try {
//         const id= +req.params.id
        
//         const [data] = await blogModel.find({_id : id})

//         await s3Operation.deleteFile(data.imageName)

//         await blogModel.deleteOne({_id : id})



//         return res.status(200).json({
//             message:"Blog is Deleted",
//             status:200,
//             data:data
//         })
        
//     } catch (error) {
//         console.log("error", error.message);
//         return res.status(503).json({
//             message:"something went wrong!",
//             status:503,
//             data:{}
//         })
//     }
// }
module.exports = { storeBlog, getBlog }