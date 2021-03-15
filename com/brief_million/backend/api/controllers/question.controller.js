const Question = require('../models/Question.model');

// GET QUESTIONS
const getQuestin = async (req,res)=>{
    try {
        const questions = await Question.find().limit(1);
        res.json(questions) 
    } catch (error) {
        res.json({message:error})
    }
};

// POST NEW QUESTION 
const postQuestion = async (req, res)=>{

    // CHECK IF NUMBER PHONE ALREADY EXISTS 
    // const phoneExist = await Question.findOne({phone:req.body.phone});
    // if(phoneExist) return res.status(400).send('Phone Number already exists');

    const newQuestion = new Question({
        question        : req.body.question,
        answer          : req.body.answer,
        false_choices   : req.body.false_choices,
        points          : req.body.points
    });
    try {
        const saveQuestion = await newQuestion.save();
        res.json(saveQuestion);
    } catch (error) {
        res.json({message:error})
    } 
};

// UPDATE QUESTION
const updateQuestion = async (req, res)=>{
    try {
        const questionUpd = await Question.updateOne(
            {_id:req.params.id},
            {
                $set:{    
                    question        : req.body.question,
                    answer          : req.body.email,
                    false_choices   : req.body.age,
                    points          : req.body.phone
                },
            }
        );
        res.status(200).json(questionUpd);
    } catch (error) {
        res.json({message:error})
    }
}

// DELETE QUESTION 
const deleteQuestion = async (req, res)=>{
    try {
        const questionDel = await Question.remove({_id:req.params.id});
        res.json(questionDel);
    } catch (err) {
        res.json({message:err});
    }
}

module.exports = {
    getQuestin, 
    postQuestion, 
    updateQuestion, 
    deleteQuestion
};