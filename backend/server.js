const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/group-management');


const groupSchema = new mongoose.Schema({
  name: String,
  members: [String],
});

const Group = mongoose.model('Group', groupSchema);

// Create a new group
app.post('/groups', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.status(201).send(group);
});

// Get all groups
app.get('/groups', async (req, res) => {
  const groups = await Group.find();
  res.send(groups);
});

// Search for groups
app.get('/groups/search', async (req, res) => {
  const { name } = req.query;
  const groups = await Group.find({ name: new RegExp(name, 'i') });
  res.send(groups);
});

// Add a member to a group
app.patch('/groups/:id', async (req, res) => {
  const { id } = req.params;
  const { member } = req.body;
  const group = await Group.findById(id);
  if (group) {
    group.members.push(member);
    await group.save();
    res.send(group);
  } else {
    res.status(404).send({ message: 'Group not found' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
