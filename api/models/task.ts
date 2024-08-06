import mongoose from "../config/atlasdb";

const schema = new mongoose.Schema({
  textValue: {
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
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  htmlValue: {
    type: String,
    default: null
  }
}, { timestamps: true })

const model = mongoose.model('Task', schema)

export default model