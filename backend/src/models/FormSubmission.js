import mongoose  from 'mongoose';

const formSubmissionSchema = mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  values: { type: mongoose.Schema.Types.Mixed, required: true }, // Store arbitrary JSON data
}, { timestamps: true });

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
export default FormSubmission;
