const express = require('express');
const router = express.Router();

const GameIdea = require('../models/gameidea')

router.put('/:gameIdeaId', async function(req, res){
    try {
        
        const currentGameIdea = await GameIdea.findById(req.params.gameIdeaId);

        if(currentGameIdea.creator.equals(req.session.user._id)) {
            await currentGameIdea.updateOne(req.body);
            res.redirect('/game-ideas')
        } else {
            res.send("You don't have permission to do that.")
        }

    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }
})

router.get('/:gameIdeaId/edit', async function(req, res) {

    try {
        
        const currentGameIdea = await GameIdea.findById(req.params.gameIdeaId)

        res.render('game-ideas/edit.ejs', {
            gameIdea: currentGameIdea
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }

})

router.delete('/:gameIdeaId', async function(req, res) {
    try {

        const gameDoc = await GameIdea.findById(req.params.gameIdeaId)

        if(gameDoc.creator.equals(req.session.user._id)){
            await gameDoc.deleteOne();

            res.redirect('/game-ideas')

        } else {
            res.send("You don't have permission to do that.")
        }
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }
})

router.post('/:gameIdeaId/liked-by', async function(req, res){

    try {

        await GameIdea.findByIdAndUpdate(req.params.gameIdeaId, {
            $push: {likesByUsers: req.session.user._id}
        })

        res.redirect(`/game-ideas/${req.params.gameIdeaId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }

})

// localhost:3000/game-ideas/
router.get('/', async function(req, res){

    try {
        
        const populatedGameIdeas = await GameIdea.find({}).populate('creator');

        res.render('game-ideas/index.ejs', {
            gameDocs: populatedGameIdeas,
        });

    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }

})

router.post('/', async function(req, res){

    try {
        
        req.body.creator = req.session.user._id;
        await GameIdea.create(req.body);
        res.redirect('/game-ideas');
    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }
})

// localhost:3000/game-ideas/new.ejs
router.get('/new', async function(req, res){
    res.render('game-ideas/new.ejs')
})

// localhost:3000/game-ideas/liked-by
router.get('/:gameIdeaId', async function(req, res){

    try {
        
        const populatedGameIdea = await GameIdea.findById(
            req.params.gameIdeaId
        ).populate('creator')

        const isLikedByUser = populatedGameIdea.likesByUsers.some((userId) => {
            return userId.equals(req.session.user._id)
        })

        res.render('game-ideas/show.ejs', {
            gameDoc: populatedGameIdea,
            isLikedByUser,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }

})

// localhost:3000/game-ideas
router.get('/', async function(req, res){

    try {

        res.render('game-ideas/index.ejs', {
            user: req.session.user,
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

})

module.exports = router;