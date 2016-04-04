//link to mongoose
var mongoose = require('mongoose');

// define pet store schema

var storeSchema = new mongoose.Schema({

    //JSON ARRAY
    name: {
        type: String,
        default: '',
        required: 'Store name cannot be blank'
    },
    address: {
        type: String,
        default: '',
        required: 'Store address cannot be blank'
    },
    phone: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    }

});

//make it public
module.exports = mongoose.model('Store', storeSchema);