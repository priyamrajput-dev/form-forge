import * as formService from '../services/formService.js';

const createForm = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const form = await formService.createForm(title, description, req.user._id);
    res.status(201).json(form);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const getMyForms = async (req, res, next) => {
  try {
    const forms = await formService.getFormsByUser(req.user._id);
    res.status(200).json(forms);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const getFormWithFields = async (req, res, next) => {
  try {
    const data = await formService.getFormWithFields(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

export { createForm, getMyForms, getFormWithFields };
