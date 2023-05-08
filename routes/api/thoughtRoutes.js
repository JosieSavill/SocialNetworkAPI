const express = require ('express');
const router = express.Router();
const { User, Thought, Reaction } = require('../../models');




// GET all thoughts
router.get('/', async (req, res) => {

    try {

        const thoughtsData = await Thought.find();
        res.status(200).json(thoughtsData);

    } catch (err) {

        res.status(500).json(err);

    }

});


// GET a single thought 
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
    console.log("creating thought")
    try {

        const { thoughtText, userId, username } = req.body;
        const thoughtData = await Thought.create({ thoughtText, username, userId });
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
        const thoughtData = await Thought.findByIdAndUpdate(
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




