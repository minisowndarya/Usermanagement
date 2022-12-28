const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        required: true,
        type: String
    },
    policy: {
        required: true,
        type: String
    },
    
    resources: [ {
        type: String
    } ]
    
    
});


module.exports = mongoose.model('GroupModel', groupSchema);
