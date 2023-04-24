/*
  store.js -- Router for the Transactions
*/
const express = require('express');
const bodyParser = require('body-parser'); //for reading values
const router = express.Router();
const Transaction = require('../models/Transaction');


//Get transactions
router.get('/transactions/',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id })
    res.render('transactions');
  });



//Post transactions
router.post('/transactions',
  isLoggedIn,
  async (req, res, next) => {
    const transaction = new Transaction(
      {
        userId: req.user._id,
        description: req.body.description,
        category: req.body.category,
        amount: req.body.amount,
        date: new Date(req.body.date)
      })
    await transaction.save();
    res.redirect('/transactions'); // Redirect to the transactions page
  });

//Delete transactions
  router.get('/transactions/delete/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    await Transaction.deleteOne({ _id: req.params.itemId });
    res.redirect('/transactions')
  });

//Edit transactions 
  router.get('/transactions/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /transactions/edit/:itemId")
    const item =
      await ToDoItem.findById({ _id: req.params.itemId });
    res.locals.item = item
    res.render('edit')
  });



// Sort transactions by amount
router.get('/transactions/sortBy=amount',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ amount: 1 });
    res.render('transactions');
  });



// Sort transactions by category
router.get('/transactions/sortBy=category',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ category: 1 });
    res.render('transactions');
  });



// Sort transactions by description
router.get('/transactions/sortBy=description',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ description: 1 });
    res.render('transactions');
  });


// Sort transactions by date
router.get('/transactions/sortBy=date',
  isLoggedIn,
  async (req, res, next) => {
    res.locals.transactions = await Transaction.find({ userId: req.user._id }).sort({ date: 1 });
    res.render('transactions');
  });


module.exports = router;

