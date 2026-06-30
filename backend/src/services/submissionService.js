import FormSubmission  from '../models/FormSubmission.js';

const createSubmission = async (formId, values) => {
  const submission = await FormSubmission.create({ formId, values });
  return submission;
};

const getSubmissionsByForm = async (formId) => {
  const submissions = await FormSubmission.find({ formId }).sort('-createdAt');
  return submissions;
};

export { createSubmission, getSubmissionsByForm };
