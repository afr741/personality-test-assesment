const express = require('express');

const router = express.Router();
const Question = require('../../Models/Question');

// api/questions

router.get('/', async (req, res) => {
  try {
    const question = await Question.find().sort({ number: 1 });

    if (!question) {
      return res.status(404).json({
        status: 'error',
        message: 'No Questions',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        question,
      },
    });
  } catch {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
});

// API requesting for question

router.post('/question', (req, res) => {
  const { number } = req.body;

  if (number) {
    Question.findOne({ number: req.body.number })
      .then((question) => {
        if (question) {
          return res.status(200).json({
            status: 'success',
            data: {
              question,
            },
          });
        }
        return res.status(404).json({
          status: 'error',
          message: 'Question not found',
        });
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      }));
  } else {
    return res.status(404).json({
      status: 'error',
      message: 'No number selected',
    });
  }

  return null;
});

// POST

router.post('/addquestion', (req, res) => {
  const date = Date.now(); // yyyy-mm-dd.
  const { number } = req.body;
  const questionz = req.body.question;
  const { name } = req.body;
  const { optiona } = req.body;
  const { optionb } = req.body;
  const { optionc } = req.body;
  const { optiond } = req.body;

  if (questionz) {
    Question.findOne({ number: req.body.number })
      .then((question) => {
        if (question) {
          return res.status(400).json({ question: 'Question number exists' });
        }
        const newQuestion = new Question({
          date,
          number,
          question: questionz,
          name,
          optiona,
          optionb,
          optionc,
          optiond,
        });
        newQuestion
          .save()

          .then((savedQuestion) => res.status(200).json({
            status: 'success',
            data: {
              savedQuestion,
            },
          }))
          .catch(() => res.status(500).json({
            status: 'error',
            message: 'something went wrong',
          }));
        return null;
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          message: 'something went wrong',
        });
      });
  } else {
    return res.status(404).json({
      status: 'error',
      message: 'Nos item selected',
    });
  }
  return null;
});

// UPDATE

router.put('/updatequestion/:questionId', (req, res) => {
  const { questionId } = req.params;
  const {
    question, optiona, optionb, optionc, optiond,
  } = req.body;

  Question.findOneAndUpdate(
    questionId,
    {
      question,
      optiona,
      optionb,
      optionc,
      optiond,
    },
    { new: true },
  )
    .then((updatedQuestion) => {
      if (!updatedQuestion) {
        return res.status(404).json({
          status: 'error',
          message: 'Question not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          updatedQuestion,
        },
      });
    })
    .catch(() => {
      res.status(500).send({
        status: 'error',
        message: 'something went wrong',
      });
    });
});

// DELETE

router.delete('/:questionId', (req, res) => {
  const { questionId } = req.params;
  Question.findOneAndDelete({ number: questionId }) // we would get id from the URL
    .then((deletedQuestion) => {
      if (!deletedQuestion) {
        return res.status(404).json({
          status: 'error',
          message: 'Question not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          deletedQuestion,
        },
      });
    })
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
