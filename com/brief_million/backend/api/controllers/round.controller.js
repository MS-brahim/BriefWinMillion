const Round = require('../models/Round.model')

// FIND ALL DATA ROUND 
const findAllRound = async(req, res)=>{
    try {
        const rounds = await Round.find().populate('id_group_member').populate('id_question').populate('id_question_token')
        res.status(200).json(rounds)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

// POST ROUND 
const postRound  = async (req, res)=>{
    const newRound = new Round({
        id_group_member     : req.body.id_group_member,
        id_question         : req.body.id_question,
        id_question_token   : req.body.id_question_token
    })
    try {
        const saveRound = await newRound.save()
        res.status(200).json(saveRound) 
    } catch (error) {
        res.status(400).json({message:error})
    }
}

module.exports = {
    findAllRound,
    postRound
};