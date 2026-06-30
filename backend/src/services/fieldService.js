import FormField  from '../models/FormField.js';

const createField = async (formId, fieldData) => {
  const field = await FormField.create({
    formId,
    ...fieldData
  });
  return field;
};

const getFieldsByForm = async (formId) => {
  const fields = await FormField.find({ formId }).sort('index');
  return fields;
};

export { createField, getFieldsByForm };
