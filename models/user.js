const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
