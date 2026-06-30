import mongoose  from 'mongoose';

const formSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
export default Form;
