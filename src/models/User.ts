// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true
  }
});

export const User = mongoose.model('User', userSchema);
export type UserModelType = ReturnType<typeof User>