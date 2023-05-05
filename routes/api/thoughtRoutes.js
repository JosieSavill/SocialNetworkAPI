const express = require ('express');
const router = express.Router();

// import the User and Thought models
const { User, Thought } = require('../models');


// GET all thoughts
router.get('/', async (req, res) => {

    try {

        const thougthsData = await Thought.find();
        res.status(200).json(thoughtsData);

    } catch (err) {

        res.status(500).json(err);

    }

});


GET a single thought by IdleDeadline
router.get('/:id', async (req, res) => {

    try {

        const thoughtData = await Thought.findById(req.params.id);

        if (!thoughtData) {

            res.status(404).json({ message: 'No thought found with this id!'});
            return;

        }
        
        res.status(200).json(thoughtData);
        
    }    catch (err) {

                console.error(err);
                res.status(500).json(err);

        }


    
});


// POST a new thought (and associate it with a user)
router.post('/', async (req, res) => {

    try {

        const { thoughtText, userId } = req.body;
        const thoughtData = await Thought.create({ thoughtText });
        await User.findByIdAndUpdate(

            userId,
            {$push: { thoughts: thoughtData._id } },
            { new: true }
            
        );

        res.status(200).json(thoughtData);

    } catch (err) {

        console.error(err);
        res.status(500).json(err);

    }

});


// PUT to update a thought by id
router.put('/:id', async (req, res) => {

    try {

        const { thoughtText } = req.body;
        const thoughtData = await Thought.findByidAndUpdate(
            req.params.id,
            { thoughtText },
            { new: true }

        );

        if (!thoughtData) {

            res.status(404).json({ message: "No thought found with this id! "});
            return;

        }

        res.status(200).json(thoughtData);

    } catch (err) {

        console.error(err);
        res.status(500).json(err);
    }

});


// DELETE a thought by id
router.delete('/:id', async (req, res) => {

    try {

        const thoughtData = await Thought.findByIdAndDelete(req.params.id);
        if (!thoughtData) {

            res.status(404).json({ message: 'No thought found with this id!'});
            return;

        }

        await User.findByIdAndUpdate(

            thoughtData.userId,
            { $pull: { thoughts: thoughtData._id } },
            { new: true } 

        );
        
        res.status(200).json(thoughtData);
        
    }  catch (err) {

        console.error(err);
        res.status(500).json(err);
        
    }
    

});


module.exports = router;




