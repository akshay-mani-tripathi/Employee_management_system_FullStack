const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','employee'], default: 'employee' },
  name: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
