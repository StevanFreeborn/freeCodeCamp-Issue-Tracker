const mongoose = require('mongoose');

const issueSchemaOptions = {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    }
};

const IssueSchema = mongoose.Schema({

    issue: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String, required: true },
    open: { type: Boolean, default: true },
    status_text: { type: String },
    created_on: { type }

}, issueSchemaOptions);

const Issue = mongoose.model('issues', IssueSchema);

module.exports = Issue;