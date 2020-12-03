const express = require('express');
const router = express.Router();

router.get('/', (req, page) => {
    page.render('index');
});

module.exports = router;
