const express = require('express');
const router = express.Router();

const GameIdea = require('../models/gameidea')

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