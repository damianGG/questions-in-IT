import mongoose  from "mongoose";

const questionSchema = mongoose.Schema({
    question:String,
    answer:String,
    creator:String,
    difficulty:Number,
    // createdAt:{
    //      type:Date,
    //      default: new Date()
    //  }   
      likeCount:{
          type:Number,
          default:0
      },
})

var PostQuestion = mongoose.model('PostQuestion',questionSchema);

export default PostQuestion;