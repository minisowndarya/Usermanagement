const express = require('express');
const UserModel = require('../models/userModel');

const router = express.Router()

module.exports = router;


router.post('/create/:userName', async (req, res) => {

    let userName = req.params.userName;

    if (!userName) {
        res.status(400).json({ message: "Username is mandatory. Please provide one in the path param." });
        return;
    }
    let firstName = req.body.firstName;
    if (!firstName) {
        res.status(400).json({ message: "First name is mandatory. Please provide one in request body." });
        return;
    }
    let lastName = req.body.lastName;
    if (!lastName) {
        res.status(400).json({ message: "Last name is mandatory. Please provide one in request body" });
        return;
    }
    let emailAddress = req.body.emailAddress;
    if (!emailAddress) {
        res.status(400).json({ message: "EmailAddress is mandatory. Please provide one in request body" });
        return;
    }
    let password = req.body.password;
    if (!password) {
        res.status(400).json({ message: "Password is mandatory. Please provide one in request body" });
        return;
    }
    let phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
        res.status(400).json({ message: "phoneNumber is mandatory. Please provide one in request body" });
        return;
    }
    const existingData = await UserModel.find({ "userName": userName });
    if (existingData.length > 0) {
        res.status(400).json({ message: "User " + userName + " already exists" });
        return;
    }
    const data = new UserModel({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        middleName: req.body.middleName ? req.body.middleName : null,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        password: password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({ message: "User " + userName + " saved successfully"})
;    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.post('/modify/:userName', async (req, res) => {

    let firstName = req.body.firstName;
    if (!firstName) {
        res.status(400).json({ message: "First name is mandatory. Please provide one." });
        return;
    }
    let lastName = req.body.lastName;
    if (!lastName) {
        res.status(400).json({ message: "Last name is mandatory.Please provide one" });
        return;
    }
    let emailAddress = req.body.emailAddress;
    if (!emailAddress) {
        res.status(400).json({ message: "emailAddress is mandatory.Please provide one" });
        return;
    }
    let password = req.body.password;
    if (!password) {
        res.status(400).json({ message: "password is mandatory.Please provide one" });
        return;
    }
    let phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
        res.status(400).json({ message: "phoneNumber is mandatory.Please provide one" });
        return;
    }
    let userName = req.params.userName;
    const existingData = await UserModel.find({ "userName": userName });
    if (existingData.length == 0) {
        res.status(400).json({ message: "User " + userName + " doesnot exists to modify" });
        return;
    }
    const data = new UserModel({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        middleName: req.body.middleName ? req.body.middleName : null,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        password: password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/get/:userName', async (req, res) => {
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

    try {
        const userName = req.params.userName;
        const userDetails = await UserModel.find({ "userName": userName });
        if (userDetails.length == 1) {
            res.json( { 
                "userName" : userDetails[0].userName,
                "firstName": userDetails[0].firstName,
                "lastName": userDetails[0].lastName,
                "phoneNumber": userDetails[0].phoneNumber,
                "emailAddress": userDetails[0].emailAddress
            } )
        }
        res.json({ message: "Username doesn't exist" });
    }
    catch (error) {
        res.status(500).json({ message: "Error occured while getting user " })
    }

})

router.delete('/remove/:userName', async (req, res) => {
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
        const userName = req.params.userName;

        const existingData = await UserModel.find({ "userName": userName });
        if (existingData.length == 0) {
            res.status(400).json({ message: "User " + userName + " doesnot exists" });
            return;
        }
        let id = existingData[0]._id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User " + deletedUser.userName + " has been deleted"});
    }
    catch (error) {
        res.status(400).json({ message: "Usernmame deleted" })
    }
})


