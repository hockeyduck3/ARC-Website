const express = require('express');
const router = express.Router();
const fs = require('fs');

// Each route has a true boolean attached to it. This is for the navbar so the webpage knows which page is "active".

// Index / Homepage
router.get('/', (req, page) => {
    // Each route will have this function around it. This function will grab all of the styleSheets before it loads the page.
    fs.readdir('./public/css/index', (err, styleSheets) => {
        // If there is an error on this page

        // index error
        if (err) {
            // Log the error in the console
            console.log(err);

            // Render the error page with the code: index
            page.render('error', {
                code: 'index',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }
        
        // If there was no error
        else {
            // Render the page normally
            page.render('index', {
                home: true,
                cssFolder: 'index',
                styleSheets: styleSheets
            });
        }
    });
});


// About
router.get('/about', (req, page) => {
    fs.readdir('./public/css/about', (err,  styleSheets) => {
        // about error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'about',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        } 
        
        else {
            page.render('about', {
                about: true,
                cssFolder: 'about',
                styleSheets: styleSheets
            });
        };
    });
});


// Programs
router.get('/programs', (req, page) => {
    fs.readdir('./public/css/programs', (err, styleSheets) => {
        // pregrams error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'programs',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }

        else {
            page.render('programs', {
                programs: true,
                cssFolder: 'programs',
                styleSheets: styleSheets
            });
        }
    })
});


// Gallery
router.get('/gallery', (req, page) => {
    fs.readdir('./public/css/gallery', (err, styleSheets) => {
        // gallery error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'gallery',
                cssFolder: 'error',
                styleSheets: ['error.css']
            })
        } 
        
        else {
            page.render('gallery', {
                gallery: true,
                cssFolder: 'gallery',
                styleSheets: styleSheets
            });
        }
    });
});


// Get Involved
router.get('/involved', (req, page) => {
    fs.readdir('./public/css/involved', (err, styleSheets) => {
        // involved error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'involved',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }

        else {
            page.render('involved', {
                involved: true,
                cssFolder: 'involved',
                styleSheets: styleSheets,
                javascript: 'forms.js'
            });
        }
    });
});


// Contact
router.get('/contact', (req, page) => {
    fs.readdir('./public/css/contact', (err, styleSheets) => {
        // contact error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'contact',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }

        else {
            page.render('contact', {
                about: true,
                cssFolder: 'contact',
                styleSheets: styleSheets,
                javascript: 'forms.js'
            });
        }
    });
});


// Press
router.get('/press', (req, page) => {
    fs.readdir('./public/css/press', (err, styleSheets) => {
        // press-style error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'press-style',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }
        
        else {
            fs.readdir('./public/forums', (err, files) => {
                // press-forums error
                if (err) {
                    console.log(err);
        
                    page.render('error',  {
                        code: 'press-forums',
                        cssFolder: 'error',
                        styleSheets: ['error.css']
                    });
                }
        
                else {
                    let dataArray = [];
        
                    files.forEach(file => {
                        let urlLink = file.split('.').splice(0, 1).join('.');
        
                        let data = fs.readFileSync(`./public/forums/${file}`);
        
                        let parsedData = JSON.parse(data);
        
                        let dataObj = {
                            url: urlLink,
                            title: parsedData.title,
                            date: parsedData.date,
                            img: parsedData.img,
                            message: parsedData.message.substring(0, 140)
                        }
        
                        dataArray.unshift(dataObj);
                    });
        
                    page.render('press', {
                        about: true,
                        cssFolder: 'press',
                        styleSheets: styleSheets,
                        card: dataArray
                    });
                }
            });
        }
    });
});

// Blog posts
router.get('/press/:forum', (req, page) => {
    const url = req.params.forum;
    let fileFound = false;

    fs.readdir('./public/css/blogs', (err, styleSheets) => {
        // blogs-style error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'blogs-style',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }

        else {
            // Find each JSON file within this folder
            fs.readdir('./public/forums/', (err, files) => {
                // blogs error
                if (err) {
                    console.log(err);

                    page.render('error', {
                        code: 'blogs',
                        cssFolder: 'error',
                        styleSheets: ['error.css']
                    });
                }

                else {
                    let fileArray = files;

                    for (let i = 0; i < fileArray.length; i++) {
                        // Check and see if any file matches the forum name in the url
                        if (fileArray[i].toLowerCase() === `${url.toLowerCase()}.json`) {
                            fileFound = true;
                            
                            // If it does then grab that file and save it to the fileName variable
                            fs.readFile(`./public/forums/${fileArray[i]}`, (err, data) => {
                                if (err) throw err;
            
                                let file = JSON.parse(data);
            
                                // Render the blog page
                                page.render('blog', {
                                    about: true,
                                    cssFolder: 'blogs',
                                    styleSheets: styleSheets,
                                    title: file.title,
                                    date: file.date,
                                    img: file.img,
                                    message: file.message
                                });
                            });
                
                            // Then break the loop
                            break;
                        }
                    }
            
                    // If there was no matching file found
                    if (!fileFound) {
                        page.render('404', {
                            errorTitle: 'Blog',
                            errorText: 'blog post',
                            cssFolder: 'four',
                            styleSheets: ['index.css']
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;
