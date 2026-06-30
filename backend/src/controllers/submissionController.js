import * as submissionService from '../services/submissionService.js';

const createSubmission = async (req, res, next) => {
  try {
    const { formId, values } = req.body;
    const submission = await submissionService.createSubmission(formId, values);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const getSubmissions = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const submissions = await submissionService.getSubmissionsByForm(formId);
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export { createSubmission, getSubmissions };
