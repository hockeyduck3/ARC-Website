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
    // Read the youtube json file
    fs.readFile('./public/galleryMedia.json', (err, mediaFiles) => {

        // videos error
        if (err) {
            console.log(err);

            page.render('error', {
                code: 'videos',
                cssFolder: 'error',
                styleSheets: ['error.css']
            });
        }

        else {
            // Parse the json file
            const media = JSON.parse(mediaFiles);
            let highlight;

            // Check to see if the highlight is a video
            if (media.Main.includes('watch?v=')) {
                // If it's a video link, change the main video link to an embeded link
                highlight = media.Main.replace(/watch\?v=/g, 'embed/');

            } else {
                // If it's an image, make sure it has no spaces
                highlight = media.Main.replace(/ /g, "\\ ");
            }


            // An empty array for the other media
            const otherMedia = [];

            // Loop through the other media in the json file
            media.Others.forEach(file => {
                if (file.includes('watch?v=')) {
                    // Set the file to be an embeded link
                    let newFile = file.replace(/watch\?v=/g, 'embed/');

                    // Add the new embeded link to the othersVideos array
                    otherMedia.unshift(newFile);

                } else {
                    let img = file.replace(/ /g, "\\ ");
                    otherMedia.unshift(img);
                }
            });

            // Read the css files
            fs.readdir('./public/css/gallery', (err, styleSheets) => {
                // gallery error
                if (err) {
                    console.log(err);
        
                    page.render('error', {
                        code: 'gallery',
                        cssFolder: 'error',
                        styleSheets: ['error.css']
                    });
                } 
                
                else {                    
                    page.render('gallery', {
                        gallery: true,
                        cssFolder: 'gallery',
                        styleSheets: styleSheets,
                        javascript: 'modal.js',
                        highlight: highlight,
                        mediaFile: otherMedia
                    });
                }
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
                        // This will take the ".json" off of the file name
                        let urlLink = file.split('.').splice(0, 1).join('.');
        
                        // Read the incoming file and parse it
                        let data = JSON.parse(fs.readFileSync(`./public/forums/${file}`));

                        // Just in case the image has spaces in it this will make sure those spaces get added properly
                        let img = data.img.replace(/ /g, "\\ ");
        
                        let dataObj = {
                            url: urlLink,
                            title: data.title,
                            date: data.date,
                            img: img,
                            // This will show the first 140 characters of the article
                            message: data.paragraphs[0].substring(0, 140)
                        }
        
                        dataArray.unshift(dataObj);
                    });

                    // This will sort the array and make sure that the newest article will always appear first.
                    dataArray.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date)
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
                                    author: file.author,
                                    date: file.date,
                                    img: file.img,
                                    paragraphs: file.paragraphs
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
