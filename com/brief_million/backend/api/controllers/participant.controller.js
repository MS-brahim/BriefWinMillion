const Paricipant = require('../models/Participant.model');
const {loginValidation,registerValidation} = require('../validation/particip.validation')
const jwt = require('jsonwebtoken');

// GET PARTICIPANT 
const getParticipant = async (req,res)=>{
    try {
        const paricipants = await Paricipant.find();
        res.json(paricipants) 
    } catch (error) {
        res.json({message:error})
    }
};

// REGISTER NEW PARTICIPANT 
const registerParticipant = async (req, res)=>{

    // VALIDATION REGISTER DATA 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF NUMBER PHONE OR EMAIL ALREADY EXISTS 
    const phoneExist = await Paricipant.findOne({phone:req.body.phone, email:req.body.email});
    if(phoneExist) return res.status(400).send('Email or Phone number already exists');

    const newParicipant = new Paricipant({
        full_name   : req.body.full_name,
        email       : req.body.email,
        age         : req.body.age,
        phone       : req.body.phone,
        password    : req.body.password
    });
    try {
        const saveParicipant = await newParicipant.save();
        res.json(saveParicipant);
    } catch (error) {
        res.json({message:error})
    } 
}

// VALIDE PARTICIPANT
const validerParticipant = async (req, res)=>{
    try {
        const paricipantUpd = await Paricipant.updateOne(
            {_id:req.params.id},
            {$set:{is_valid    : req.body.is_valid}}
        );
        res.status(200).json(paricipantUpd);
    } catch (error) {
        res.json({message:error})
    }
}

// LOGIN PARTICIPANT 
const loginParticipant = async (req, res)=>{

    // VALIDATION LOGIN DATA 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF PARTICIPANT ALREADY EXISTS 
    const authParticip = await Paricipant.findOne({phone:req.body.phone});
    if(!authParticip) return res.status(400).send('Phone Number is not found!!');

    const authParticipPwd = await Paricipant.findOne({password:req.body.password});
    if(!authParticipPwd) return res.status(400).send('Password incorrect!!');

    // CHECK IF THIS PARTICIPAN IS VALID 
    const authParticipIsValid = await Paricipant.findOne({is_valid:true});
    if(!authParticipIsValid) return res.status(400).send('Admin must verify your access!!');

    const token = jwt.sign({_id:authParticip._id}, process.env.TOKEN_SECRET,{expiresIn:'120m'});
    res.header('Authorization', token).send(token);

};

// UPDATE PARTICIPANT
const updateParticipant = async (req, res)=>{
    try {
        const paricipantUpd = await Paricipant.updateOne(
            {_id:req.params.id},
            {
                $set:{    
                    full_name   : req.body.full_name,
                    email       : req.body.email,
                    age         : req.body.age,
                    phone       : req.body.phone,
                    is_valid    : req.body.is_valid
                },
            }
        );
        res.status(200).json(paricipantUpd);
    } catch (error) {
        res.json({message:error})
    }
}

// DELETE PARTICIPANT 
const deleteParticipant = async (req, res)=>{
    try {
        const paricipantDel = await Paricipant.remove({_id:req.params.id});
        res.json(paricipantDel);
    } catch (err) {
        res.json({message:err});
    }
}

module.exports = {
    getParticipant, 
    registerParticipant,
    validerParticipant,
    loginParticipant,
    updateParticipant, 
    deleteParticipant
};