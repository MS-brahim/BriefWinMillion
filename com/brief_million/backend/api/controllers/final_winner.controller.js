const finalWinnerSchema = require('../models/Final_winner.model');

// FIND ALL FINAL WINNER
const findFinalWin = async (req, res)=>{
    try {
        const fWinners = await finalWinnerSchema.find().populate('id_round').populate('id_participant').populate('id_gift');
        res.json(fWinners) 
    } catch (error) {
        res.json({message:error})
    }
};

// POST NEW FINAL WINNER
const postFinalWin = async (req, res)=>{

    const newWinnner = new finalWinnerSchema({
        id_round        : req.body.id_round,
        final_score     : req.body.final_score,
        id_participant  : req.body.id_participant,
        id_gift         : req.body.id_gift
    });
    try {
        const saveWinner = await newWinnner.save();
        res.json(saveWinner);
    } catch (error) {
        res.json({message:error})
    } 
};

module.exports = {
    findFinalWin,
    postFinalWin
};