module.exports = {
    video: function(val) {
        return val.includes('embed');
    },

    image: function(val) {
        let newVal;
        if (val.includes(' ')) {
           newVal = val.replace(/ /g, '');
        } else {
            newVal = val;
        }

        return newVal;
    }
}
