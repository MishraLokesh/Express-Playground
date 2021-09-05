const members = require('../../members')
const express = require('express')
const router = express.Router()
const uuid = require('uuid')

// GETs all members (could be the same as retrieving data from database, except here we are hard coding in js object)
router.get('/', (req, res) => {
  res.json(members)
})

// GET single user with id
router.get('/:id', (req, res) => {
  // res.send(req.params.id)   //we can extract the id provided in the url using req.params
  const found = members.some((member => member.id === parseInt(req.params.id)))
  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `no user for id: ${req.params.id}` })
  }
})


// CREATE a new member (use POST this time)
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };
  if(!req.body.name || !req.body.email) {
    res.status(400).json({ msg: 'please enter the name and email' })
  }
  else {
    members.push(newMember)
    // res.json(members)
    res.redirect('/')  //to redirect when form details are entered
  }
})


// Update details of existing user
router.put('/:id', (req, res) => {
  // res.send(req.params.id)   //we can extract the id provided in the url using req.params
  const found = members.some((member => member.id === parseInt(req.params.id)))
  if(found) {
    const upMemb = req.body
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        member.name = upMemb.name ? upMemb.name : member.name
        member.email = upMemb.email ? upMemb.email : member.email

        res.json({ msg: 'member details updated successfully.', member })
      }
    })
    // res.send('updated successfully!')
  } else {
    res.status(400).json({ msg: `no user for id: ${req.params.id}` })
  }
})


// Delete user
router.delete('/:id', (req, res) => {
  // res.send(req.params.id)   //we can extract the id provided in the url using req.params
  const found = members.some((member => member.id === parseInt(req.params.id)))
  if(found) {
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        members.splice(members.findIndex(a => a.id === parseInt(req.params.id)) , 1)
      }
    })
    res.json({ msg: `member with id ${req.params.id} removed successfully.`, members })
    // res.send('updated successfully!')
  } else {
    res.status(400).json({ msg: `no user for id: ${req.params.id}` })
  }
})

module.exports = router



