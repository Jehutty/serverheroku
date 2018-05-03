var mongoose = require('mongoose');
var Schema = mongoose.Schema;



/*
MODULES MODEL used to query the database,
consists of 2 fields 1 of type String that indicate the Module's codename
one String Array that holds the students for that particular module
 */

var ModuleModel = new Schema({
    modulecode: String,
    students: [String],
});

let Student = module.exports = mongoose.model('Module', ModuleModel);