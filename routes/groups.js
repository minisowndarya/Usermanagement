const express = require('express');
const GroupModel = require('../models/groupModel');
const GroupAssociationModel =  require('../models/groupAssociationModel');

const router = express.Router();


module.exports = router;

router.post('/create/:groupName', async (req, res) => {
    /*
        groupName, policy, resources (Array)

        if (is admin Available(admin)) {
            storeInMongoDB();
        } else {
                res.send('admin is not available ')
        }
    */
    let groupName = req.params.groupName;


    if (!groupName) {
        res.status(400).json({ message: "group name is mandatory. Please provide one." });
        return;
    }
    let policy = req.body.policy;
    if (!policy) {
        res.status(400).json({ message: "policy is mandatory. Please provide one." });
        return;
    }
    let resources = req.body.resources;
    if (!resources) {
        res.status(400).json({ message: "resources is mandatory. Please provide atleast one." });
        return;
    }

    const existingData = await GroupModel.find({ "groupName": groupName });
    if (existingData.length > 0) {
        res.status(400).json({ message: "Group " + groupName + "  name already exists" });
        return;
    }

    const data = new GroupModel({
        groupName: groupName,
        policy: policy,
        resources: resources
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.post('/modify/:groupName', async (req, res) => {

    let groupName = req.body.groupName;
    if (!groupName) {
        res.status(400).json({ message: "group name is mandatory. Please provide one." });
        return;
    }
    let policy = req.body.policy;
    if (!policy) {
        res.status(400).json({ message: "policy is mandatory.Please provide one" });
        return;
    }
    let resources = req.body.resources;
    if (!resources) {
        res.status(400).json({ message: "resources is mandatory.Please provide one" });
        return;
    }


    const existingData = await GroupModel.find({ "groupName": groupName });
    if (existingData.length == 0) {
        res.status(400).json({ message: "group name " + groupName + " doesnot exists to modify" });
        return;
    }
    const data = new GroupModel({
        groupName: groupName,
        policy: policy,
        resources: resources,

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/get/:groupName', async (req, res) => {
    /** username
     * if(username is available(get username)){
     * getfromMangoDB();
     * }else
     * {
     * res.get('username is not available')
     * }
     * 
     * 
     */
    let groupName = req.params.groupName;
    if (!groupName) {
        res.status(400).json({ message: "Group name is mandatory. Please provide one." });
        return;
    }
    
    try {
        const groupDetails = await GroupModel.find({ "groupName": groupName });
        if (groupDetails.length == 0) {
            res.status(400).json({ message: "Group name " + groupName + " doesnot exists." });
            return;
        }

        if (groupDetails.length == 1) {
            res.status(200).json(groupDetails)
        }
        // res.json(userDetails);
    }
    catch (error) {
        res.status(500).json({ message: "failed to get group name" })
    }


})

router.delete('/remove/:groupName', async (req, res) => {
    /**
     * 
     * 
     * 
     * res.remove('username is not available')
     * 
     * if (isUserAvailable) {
     * disociateAllGroupsForThisUser
     * then
     * delete}
     * 
     */

    try {
        const groupName = req.params.groupName;

        const existingData = await GroupModel.find({ "groupName": groupName });
        if (existingData.length == 0) {
            res.status(400).json({ message: "group name " + groupName + " doesnot exists" });
            return;
        }
        let id = existingData[0]._id;
        const deletedgroup = await GroupModel.findByIdAndDelete(id);
        res.status(200).json({ message: "group " + deletedgroup.groupName + " has been deleted" });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to delete " + groupName });
    }
})

/**
 * 
    AssociateGroups
  groupName: [ users, ]
 */
router.post('/associate/:groupName', async (req, res) => {
    /*
        admin,firstName, lastName, middleName, 
        emailAddress, phoneNumber, password

        if (isUserNameAvailable(username)) {
            replaceInMongoDB();
        } else {
            res.send('Username is not available ')
        }
    */
    let groupName = req.params.groupName;
    if (!groupName) {
        res.status(400).json({ message: "Group name is mandatory. Please provide one." });
        return;
    }
    let users = req.body.users;
    if (!users) {
        res.status(400).json({ message: "Users is mandatory.Please provide one" });
        return;
    }

    const data = new GroupAssociationModel({
        groupName: groupName,
        users: users,

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

