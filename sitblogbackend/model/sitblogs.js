const mongoose = require("mongoose")
const SitBlogSchema = new mongoose.Schema({
    postData:{
        type: String,
    },postTitle:{
        type:String,
    },
    authorDetails:{
        type:String,
    },isDelete:{
        type:Boolean,
        default:false
    },
    authorProfile:{
        type:String,
    },
    postBannerImage:{
        type:String,
    },
    isCode:{
        type:Boolean,
        default:false
    },
    blogCodeData:{
        type:String,
    }
},
{timestamps:true}
);
module.exports= mongoose.model("sitblogs",SitBlogSchema);