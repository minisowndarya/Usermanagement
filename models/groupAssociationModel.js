const mongoose = require('mongoose');

const groupAssociationSchema = new mongoose.Schema({
    groupName: {
        required: true,
        type: String
    },
    users: [{
        required: true,
        type: String
    }]
    
});


module.exports = mongoose.model('GroupAssociationModel', groupAssociationSchema);
