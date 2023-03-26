const mongoose = require("mongoose");

const WorkSchema = mongoose.Schema({
     name: String,
     email: String,
     password: String
},{
    versionKey: false
});

const Workmodel = mongoose.model("work",WorkSchema);

module.exports = {Workmodel};