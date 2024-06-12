const Expense = require("../models/Expense");

exports.getAllData = (req, res, next) => {
  Expense.findAll()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
};

exports.postData = (req, res) => {
  const expense = Expense.create({
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
  })
    .then(() => {
      res.json({
        id: Math.random().toString(),
        title: req.body.amount,
        description: req.body.description,
        category: req.body.category,
      });
    })
    .catch((err) => console.log(err));
};
exports.deleteData = (req, res) => {
  Expense.destroy({ where: { id: req.params.ExId } })
    .then(() => {
      res.json();
    })
    .catch((err) => console.log(err));
};

exports.putData = (req, res) => {
  Expense.findOne({ where: { id: req.params.ExId } })
    .then((data) => {
      data
        .update({
          amount: req.body.amount,
          description: req.body.description,
          category: req.body.category,
        })
        .then(() => {
          res.json({});
        });
    })
    .catch((err) => console.log(err));
};
