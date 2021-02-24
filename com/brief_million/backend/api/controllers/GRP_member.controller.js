const GroupMember = require('../models/Group_members.model');

// GET GROUP MEMEBER 
const getGrpMemebr = async (req,res)=>{
    try {
        const groupMembers = await GroupMember.find().populate('participants.id_participant');
        res.json(groupMembers) 
    } catch (error) {
        res.json({message:error})
    }
};

// POST NEW GROUP MEMEBER 
const postGrpMember = async (req, res)=>{

    for (let i = 0; i < 4; i++) {
        const existParticipant = await GroupMember.findOne({id_participant:req.body.id_participant[i]})
        if(existParticipant) return res.status(400).send('Participant already exists in Group');
    }
    
    const newgroupMember = new GroupMember({
        id_participant  : req.body.id_participant,
        group_code      : req.body.group_code
    });
    try {
        const savegroupMember = await newgroupMember.save();
        res.json(savegroupMember);
    } catch (error) {
         res.status(400).send(error)
    } 
};

// JOIN GROUP MEMEBER 
const joiGroup = async (req, res, id)=>{

    // CHECK IF PARTICIPANT ARLEADY EXIST IN GROUP 
    for (let i = 0; i < 4; i++) {
        const existParticipant = await GroupMember.findOne({id_participant:req.body.id_participant[i]})
        if(existParticipant) return res.status(400).send('Already exists in Group');
    }

    // CHECK IF THIS GROUP CONTENT MORE 4 PARTICIPANT 
    const joiInGroup = await GroupMember.findOne({_id:req.params.id})
    if(joiInGroup.id_participant.length>=4) return res.status(400).send('THIS GROUP CONTENT MORE 4 PARTICIPANT ')
    // console.log(joiInGroup.id_participant.length)
    
    try {
        const joiInGroup = await GroupMember.updateOne(
            {_id:req.params.id},
            {
                $push:{    
                    id_participant  : req.body.id_participant,
                }, 
            }
        )        
        res.status(200).json(joiInGroup);
    } catch (error) {
        res.json({message:error})
    }
}

// UPDATE GROUP MEMEBER 
const updateGrpMember = async (req, res)=>{
    try {
        const groupMemberUpd = await groupMember.updateOne(
            {_id:req.params.id},
            {
                $set:{    
                    id_participant  : req.body.id_participant,
                    group_code      : req.body.group_code
                },
            }
        )
        res.status(200).json(groupMemberUpd);
    } catch (error) {
        res.json({message:error})
    }
}

// DELETE GROUP MEMEBER  
const deleteGrpMember = async (req, res)=>{
    try {
        const groupMemberDel = await GroupMember.remove({_id:req.params.id});
        res.json(groupMemberDel);
    } catch (err) {
        res.json({message:err});
    }
}

module.exports = {
    getGrpMemebr, 
    postGrpMember, 
    updateGrpMember, 
    deleteGrpMember,
    joiGroup
};