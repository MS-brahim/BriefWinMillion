const QstToken = require('../models/Question_token.model');

// GET QUESTION TOKEN
const getQuestionToken = async (req, res)=>{
    try {
        const qstToken = await QstToken.find().populate('id_question').populate('id_participant');
        res.json(qstToken) 
    } catch (error) {
        res.json({message:error})
    }
};

// POST NEW QUESTION TOKEN 
const postQstToken = async (req, res)=>{

    const newQstToken = new QstToken({
        id_question             : req.body.id_question,
        participant_answer      : req.body.participant_answer,
        id_participant           : req.body.id_participant
    });
    try {
        const saveQstToken = await newQstToken.save();
        res.json(saveQstToken);
    } catch (error) {
        res.json({message:error})
    } 
};

module.exports = {
    getQuestionToken,
    postQstToken
};