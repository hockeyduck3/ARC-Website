const express = require('express');
const router = express.Router();

// Each route has a true boolean attached to it. This is for the navbar so the webpage knows which page is "active".
// Each route also has a "style" attached. This will make it so each page can have it's own css file without needing to load in the others.
router.get('/', (req, page) => {
    page.render('index', {
        home: true,
        styleSheets: [
            'essentials',
            'mission',
            'accomplishments',
            'programs',
            'people',
            'follow'
        ]
    });
});

router.get('/about', (req, page) => {
    page.render('about', {
        about: true,
        style: 'about'
    });
});

router.get('/programs', (req, page) => {
    page.render('programs', {
        programs: true,
        style: 'programs'
    });
});

router.get('/gallery', (req, page) => {
    page.render('gallery', {
        gallery: true,
        styleSheets: [
            'gallery'
        ]
    });
});

router.get('/involved', (req, page) => {
    page.render('involved', {
        involved: true,
        style: 'involved'
    });
});

module.exports = router;
