
import express from 'express'
import PostQuestion from "../models/postQuestion.js";
import mongoose from "mongoose";

const router = express.Router()

export const getQuestions = async(req, res)=>{
  //  res.send('WORKS');
    try {
        const postQuestion = await PostQuestion.find();
        console.log(postQuestion)
        res.status(200).json(postQuestion);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const createQuestion = async (req, res) => {
    const { question, answer ,creator,difficulty} = req.body;

    const newPostQuestion = new PostQuestion({ question, answer ,creator,difficulty })

    try {
        await newPostQuestion.save();

        res.status(201).json(newPostQuestion);
    } catch (error) {
        res.status(409).json({ error});
    }
}

export const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { question, answer ,creator,difficulty } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedQuestion = { question, answer ,creator,difficulty, _id: id };

    await PostQuestion.findByIdAndUpdate(id, updatedQuestion, { new: true });

    res.json(updatedQuestion);
}

export const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);


    await PostQuestion.findByIdAndRemove(id);

    res.json({message:'Question Deleted'}); 
}

export const likeQuestion = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostQuestion.findById(id);

    const updatedQuestion = await PostQuestion.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedQuestion); 
}

export const disLikeQuestion = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostQuestion.findById(id);

    const updatedQuestion = await PostQuestion.findByIdAndUpdate(id, { likeCount: post.likeCount -1 }, { new: true });
    
    res.json(updatedQuestion);
}
export default router;