const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cmsPagesSchema = new mongoose.Schema({
    page_title: {
        type: String,
    },
    content:{
        type : String
    },
    indexvalue : {
        type : Number
    },
    isdeleted : {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const cmsPages = mongoose.model('cmsPages', cmsPagesSchema);
module.exports = cmsPages;