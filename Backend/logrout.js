const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.use(express.json());



const {Login,validate}=require('../model/logmod');
// Get all users
router.get('/api/get', async(req, res) => {
let users = await Login.find();
res.send(users)
});

// User login - authenticate


//post


// ...

router.post('/api/login', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await Login.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });
  if (existingUser) return res.status(400).send('User with given email or username already exists');

  // Use Login here
  const newUser = new Login({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send('Error saving user: ' + err.message);
  }
});

//put


router.put('/:id', async (req, res) => {
  // Use your imported validation function
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find and update the user by ID, updating relevant fields
  const updatedUser = await Login.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password // In a real app, hash before saving!
    },
    { new: true }
  );

  // Handle not found
  if (!updatedUser) return res.status(404).send('The user with the given ID was not found.');

  // Respond with updated user
  res.send(updatedUser);
});

//Delete

// In your user routes file (adjust the model name to 'User' for your login system)
router.delete('/api/:id', async (req, res) => {
  // Find the user by ID and delete
  const userItem = await Login.findByIdAndDelete(req.params.id);

  // If not found, send a 404 error
  if (!userItem) return res.status(404).send('The user with the given ID was not found.');

  // Respond with the deleted user object
  res.send(userItem);
});


//get by id
router.get('/:id',async(req,res)=>{
    const Getuser=await Login.findById(req.params.id);
    if(!Getuser) return res.status(404).send('The categoryItem with the given ID was not found.');
     res.send(Getuser);
});


module.exports = router;

