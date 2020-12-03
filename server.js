const express = require('express');
const expressHandlebars = require('express-handlebars');

const server = express();

// This sets the server port to either one that the hosting server will provide, or a default port of 8080.
const PORT = process.env.PORT || 8080;

// Sets up the Express server to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Send over everything in the public folder
server.use(express.static('public'));

// Set the server engine to use handlebars, and set the layout to the main.handlebars file in the views/layouts folders
server.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}. If you're using localhost, click here: http://localhost:${PORT}`);
});
