const express = require('express');
const router = express.Router();
const { User, Thought, Reaction } = require('../../models');



// route to get all reactions
router.get('/', async (req, res) => {

    try {

        const reactionsData = await Reaction.find();
        res.json( reactionsData);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// route to create a new reaction
router.post('/', async (req, res) => {

    const reaction = new Reaction({

        reactionBody: req.body.reactionBody,
        username: req.body. username,
        

    });


    try {

        const newReaction = await reaction.save();
        res.status(201).json(newReaction);

    } catch (err) {

        res.status(400).json({ message: err.message });

    }

    
});


// route to update an existin reacction
router.patch('/:id', async (req, res) => {

    try {

        const reaction = await Reaction.findById(req.params.id);

        if (req.body.type) {

            reaction.type = req.body.type;

        }

        if (req.body.type) {

            reaction.type = req.body.type;

        }

        if (req.body.post_id) {

            reaction.post_id = req.body.post_id;
        }

        if (req.body.user_id) {

            reaction.user_id = req.body.user_id;

        }

        const updateReaction = await reaction.save();
        res.json(updateReaction);

    } catch (err) {

        res.status(400).json({ message: err.message });

    }

});


// route to delete a reaction
router.delete('/:id', async (req, res) => {

    try {

        const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
        res.json(deletedReaction);
     
    } catch (err) {

        res.status(500).json({ message: err.message });

    }


});


module.exports = router;

