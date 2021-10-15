import  express  from "express";
import { getQuestions,createQuestion,updateQuestion,deleteQuestion,likeQuestion,disLikeQuestion } from "../controllers/questions.js";
const router = express.Router();


router.get('/', getQuestions)
router.post('/', createQuestion)
router.patch('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)
router.patch('/:id/likeQuestion', likeQuestion)
router.patch('/:id/dislikeQuestion', disLikeQuestion)
//: - dynamic 
export default router;