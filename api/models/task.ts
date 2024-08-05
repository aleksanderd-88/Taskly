import mongoose from "../config/atlasdb";

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false
  },
  projectId: {
    type: String,
    required: true
  },
  userIds: {
    desc: 'Member/s belonging to task',
    type: Array,
    default: null
  }
}, { timestamps: true })

const model = mongoose.model('Task', schema)

export default model