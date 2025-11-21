const mongoose = require('mongoose');
const { Schema } = mongoose;


const taskSchema = new Schema({
title: { type: String, required: true },
description: { type: String },
assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
status: { type: String, enum: ['New','Accepted','Completed','Failed'], default: 'New' }
}, { timestamps: true });


module.exports = mongoose.model('Task', taskSchema);