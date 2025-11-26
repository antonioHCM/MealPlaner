const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, trim: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.methods.toPublic = function () {
  const { _id, email, displayName, role, createdAt } = this.toObject();
  return { _id, email, displayName, role, createdAt };
};

module.exports = mongoose.model('User', UserSchema);
