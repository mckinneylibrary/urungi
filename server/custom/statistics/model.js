var mongoose = require('mongoose');

var statisticsSchema = new mongoose.Schema({
    type: String,
    userID: String,
    userName: String,
    ip: String,
    companyID: { type: String },
    relationedID: { type: String },
    relationedName: { type: String },
    action: { type: String }, // 'create', 'update', 'delete'
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String }
}, { collection: 'wst_Statistics' });

statisticsSchema.statics.saveStat = function (req, data) {
    var companyID = req.isAuthenticated() ? req.user.companyID : null;

    var statistic = {
        type: data.type,
        relationedID: data.relationedID,
        relationedName: data.relationedName,
        action: data.action,
        companyID: companyID,
        userID: (req.isAuthenticated()) ? req.user._id : null,
        userName: (req.isAuthenticated()) ? req.user.userName : null,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        createdBy: (req.isAuthenticated()) ? req.user._id : null
    };

    return this.create(statistic);
};

var statistics = connection.model('statistics', statisticsSchema);
module.exports = statistics;
