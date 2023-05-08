const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');
const ObjectId = require('mongodb').ObjectId;

console.log(" are you loading?", ObjectId)

// GET all users
router.get('/', async (req, res) => {

    try {

        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {

        res.sendStatus(500).json(err);

    }

});


// GET a single user by ID
router.get('/:id', async (req, res) => {

    try {

        const user = await User.findById(req.params.id);
        if (!user) {
            
            res.status(404).json({ message: 'No user found with this id!'});
            return;

        }
        res.status(200).json(user);

    } catch (err) {

        res.status(500).json(err);

    }

});


// Create a new user
router.post('/', async (req, res) => {
    console.log("getting users",req.body)

    try {

        const user = await User.create(req.body);
        res.status(200).json(user);

    } catch (err) {

        res.status(500).json(err);

    }
});


router.put('/:id/friends', async (req, res) => {
    console.log("getting users",req.body.friendId)

    try {

        let  friendList = [];
        friendList.push(friendId)

        const user = await User.updateOne(
        
            {_id: new ObjectId(req.params.id)}, 
            
                {
                    friends: friendList
                }
            
            );

    } catch (err) {

        res.status(500).json(err);

    }
});

// Update an existing user
router.put('/:id', async (req, res) => {
    console.log("hello put", req.params.id, req.body, new ObjectId(req.params.id))
 
    try {

        /*
        const user = await User.findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    */
          
      const user = await User.updateOne(
        {_id: new ObjectId(req.params.id)}, 
            req.body
        );
        


      console.log(user)
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
  });


 // Delete a user
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router; 

