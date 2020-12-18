const express = require('express');
const router = express.Router();
const fs = require('fs');

// Each route has a true boolean attached to it. This is for the navbar so the webpage knows which page is "active".
// Each route also has a "style" attached. This will make it so each page can have it's own css file without needing to load in the others.
router.get('/', (req, page) => {
    page.render('index', {
        home: true,
        folderName: 'index',
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
        folderName: 'about',
        styleSheets: [
            'serving'
        ]
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
        folderName: 'gallery',
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


// Blog posts
router.get('/press/:forum', (req, page) => {
    const url = req.params.forum;
    let fileArray = [];
    let fileName = '';

    // Find each JSON file within this folder
    fs.readdirSync('./routes/forums/').forEach(file => {
        // Then add each file to the to fileArray
        fileArray.push(file);
    });
    
    for (let i = 0; i < fileArray.length; i++) {
        // Check and see if any file matches the forum name in the url
        if (fileArray[i].toLowerCase() === `${url.toLowerCase()}.json`) {
            // If it does then grab that file and save it to the fileName variable
            fileName = JSON.parse(fs.readFileSync(`./routes/forums/${fileArray[i]}`, 'utf-8'));

            // Then break the loop and continue running the rest of the code
            break;
        }
    }

    // If there was a matching file found
    if (fileName !== '') {
        // Render the blog page
        page.render('blog', {
            about: true,
            name: fileName.name,
            text: fileName.text
        });
    } else {
        // If there was no matching file then render the 404 page
        page.render('404', {
            errorTitle: 'Blog',
            errorText: 'blog post'
        });
    }
});

module.exports = router;
