const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const {
  models: { Assessment, Question },
} = require("../db");


//GET all assessments for a specific teacher
//(teacher id will be handled in a different way...)
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const assessments = await Assessment.findAll();
    res.status(200).json({
      data: {
        assessments,
      },
    });
  })
);

//GET: assessment and all questions for a given assessment
router.get(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findByPk(req.params.assessmentId, {
      include: {
        model: Question,
      },
    });
    res.status(200).json({
      data: {
        assessment,
      },
    });
  })
);

//POST: new assessment
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const newAssessment = await Assessment.create({
      title: req.body.title,
    });
    res.status(201).json({
      data: {
        newAssessment,
      },
    });
  })
);

//PUT: assign assessment to more than one class
router.put(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    const assessment = await Assessment.findByPk(req.params.assessmentId);
    await assessment.update(req.body);
    res.status(200).json({
      data: {
        assessment,
      },
    });
  })
);

//DELETE trash assessment
//question: what happens with associations once created in other tables?
router.delete(
  "/:assessmentId",
  asyncHandler(async (req, res, next) => {
    await Assessment.destroy({
      where: {
        id: req.params.assessmentId,
      },
    });
    res.sendStatus(204);
  })
);

module.exports = router;