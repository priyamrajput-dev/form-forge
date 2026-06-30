import mongoose  from 'mongoose';

const formFieldSchema = mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  label: { type: String, required: true },
  labelKey: { type: String, required: true },
  description: { type: String },
  placeholder: { type: String },
  isRequired: { type: Boolean, default: false },
  index: { type: Number, required: true },
  type: { type: String, required: true },
}, { timestamps: true });

const FormField = mongoose.model('FormField', formFieldSchema);
export default FormField;
