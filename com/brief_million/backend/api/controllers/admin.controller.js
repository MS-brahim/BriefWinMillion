const jwt = require('jsonwebtoken');
const {loginValidation} =require('../validation/admin.validation');
const Admin = require('../models/Admin.model');
const logSchema = require('../models/Logger.model');
const log = require('../config/log');

// GET DATA 
const getAdmin = async (req,res)=>{
    try {
        const admins = await Admin.find();
        res.json(admins) 
        log({
            file:'admins.controller.js',
            line:11,
            info:'Get Admins',
            type:'INFO'
        },logSchema)
    } catch (error) {
        res.json({message:error})
        log({
            file:'admins.controller.js',
            line:19,
            info:error.message,
            type:'ERROR'
        },logSchema)
    }
};

// LOGIN ADMIN 
const loginAdmin = async (req, res)=>{

    // VALIDATION LOGIN DATA 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF ADMIN ALREADY EXISTS 
    const authAdmin = await Admin.findOne({phone:req.body.phone});
    if(!authAdmin) return res.status(400).send('Phone Number is not found!!');

    const token = jwt.sign({_id:authAdmin._id}, process.env.TOKEN_SECRET,{expiresIn:'120m'});
    res.header('Authorization', token).send(token);

};

// POST NEW DATA 
const postAdmin = async (req, res)=>{

    // CHECK IF NUMBER PHONE ALREADY EXISTS 
    const phoneExist = await Admin.findOne({phone:req.body.phone});
    if(phoneExist) return res.status(400).send('Phone Number already exists');

    const newAdmin = new Admin({
        full_name   : req.body.full_name,
        phone       : req.body.phone,
        password    : req.body.password
    });
    try {
        const saveAdmin = await newAdmin.save();
        res.json(saveAdmin);
        log({
            file:'admins.controller.js',
            line:59,
            info:'Post new Admin',
            type:'INFO'
        },logSchema)
    } catch (error) {
        res.json({message:error})
        log({
            file:'admins.controller.js',
            line:67,
            info:error.message,
            type:'ERROR'
        },logSchema)
    } 
};

// UPDATE DATA
const updateAdmin = async (req, res)=>{
    try {
        const adminUpd = await Admin.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    full_name:req.body.full_name,
                    phone:req.body.phone,
                    password:req.body.password
                },
            }
        );
        res.status(200).json(adminUpd);
    } catch (error) {
        res.json({message:error})
    }
}

// DELETE DATA 
const deleteAdmin = async (req, res)=>{
    try {
        const adminDel = await Admin.remove({_id:req.params.id});
        res.json(adminDel);
    } catch (err) {
        res.json({message:err});
    }
}

module.exports = {
    getAdmin, 
    postAdmin, 
    updateAdmin, 
    deleteAdmin,
    loginAdmin
};