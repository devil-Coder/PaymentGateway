/**
 * Created by Raj Chandra on 10-11-2017.
 */
/**
 * Created by Raj Chandra on 11/4/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    number : {
        type : String,
        required : true
    },
    cvc :{
        type:String,
        required :true
    },
    doe : {
        type: String,
        required :true
    },
    domain : [{
        type : String
    }]
});

module.exports = mongoose.model('card', cardSchema);
