const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    originalName: {
        type:String,
        required:true
    },
    
    url:{
        type:String,
        required:true
    },
    publicId: {
        type:String,
        required:true
    },
    fileType: {
        type: String,
        required: true
    },
    size:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps: true});

const File = mongoose.model("File", fileSchema);

module.exports = File;
