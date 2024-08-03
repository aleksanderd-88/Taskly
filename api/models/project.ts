import mongoose from "../config/atlasdb";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  members: {
    type: Array,
    default: null
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true })

const model = mongoose.model('Project', schema)

export default model