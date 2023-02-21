//require modules for the user model
let mongoose = require('mongoose');
let contactModel = mongoose.Schema
(
    {
        contactName:
        {
            type:String,
            default:'',
            trim:true,
            required:'Contact name is required'
        },
        contactNumber:
        {
            type: Number,
            default:'',
            trim:true,
            required:'Contact number is required'
        },
        email:
        {
            type: String,
            default:'',
            trim:true,
            required:'email address is required'
        }
    },
    {
        collection:"contacts"
    }

);
//configure options for user model.

module.exports = mongoose.model('contact',contactModel);