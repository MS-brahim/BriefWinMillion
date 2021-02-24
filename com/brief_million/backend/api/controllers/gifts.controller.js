const Gift = require('../models/Gifts.model')

// GET GIFTS 
const getGifts = async (req,res)=>{
    try {
        const gifts = await Gift.find();
        res.json(gifts) 
    } catch (error) {
        res.json({message:error})
    }
};

// POST NEW GIFTS
const postGifts = async (req, res)=>{

    const newGift = new Gift({
        name      : req.body.name,
        image     : req.body.image
    });
    
    try {
        const saveGift = await newGift.save();
        res.json(saveGift);
    } catch (error) {
        res.json({message:error})
    } 
};

module.exports = {
    getGifts,
    postGifts
};