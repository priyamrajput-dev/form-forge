import * as fieldService from '../services/fieldService.js';
import * as formService from '../services/formService.js';

const createField = async (req, res, next) => {
  try {
    const { formId } = req.body;
    // Verify form exists and user owns it
    const { form } = await formService.getFormWithFields(formId);
    if (form.createdBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to modify this form');
    }

    const field = await fieldService.createField(formId, req.body);
    res.status(201).json(field);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export { createField };
