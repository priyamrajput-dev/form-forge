import Form  from '../models/Form.js';
import FormField  from '../models/FormField.js';

const createForm = async (title, description, createdBy) => {
  const form = await Form.create({ title, description, createdBy });
  return form;
};

const getFormsByUser = async (userId) => {
  const forms = await Form.find({ createdBy: userId }).sort('-createdAt');
  return forms;
};

const getFormWithFields = async (formId) => {
  const form = await Form.findById(formId);
  if (!form) throw new Error('Form not found');

  const fields = await FormField.find({ formId }).sort('index');
  return { form, fields };
};

export { createForm, getFormsByUser, getFormWithFields };
