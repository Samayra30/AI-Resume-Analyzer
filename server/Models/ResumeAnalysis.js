const mongoose = require("mongoose")

const resumeAnalysisSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
        required:true
    },
    atsScore:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
     strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },
  
    
},{timestamps:true});

module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);