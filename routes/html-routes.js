const express = require('express');
const router = express.Router();

// Each route has a true boolean attached to it. This is for the navbar so the webpage knows which page is "active".
router.get('/', (req, page) => {
    page.render('index', {
        home: true
    });
});

router.get('/about', (req, page) => {
    page.render('about', {
        about: true
    });
});

router.get('/programs', (req, page) => {
    page.render('programs', {
        programs: true
    });
});

router.get('/gallery', (req, page) => {
    page.render('gallery', {
        gallery: true
    });
});

router.get('/involved', (req, page) => {
    page.render('involved', {
        involved: true
    });
});

module.exports = router;
