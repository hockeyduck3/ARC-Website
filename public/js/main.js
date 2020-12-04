// This solution was found on https://stackoverflow.com/questions/46736823/how-can-i-close-my-bootstrap-4-navbar-collapse-menu-when-clicking-outside-the-me by Priyansh Garg
// This function will make it so that the navbar will close by itself on mobile, if the user clicks anywhere else on the page.
$(document).click((event) => {
    let click = $(event.target);
    let width = screen.width;

    if ($('.navbar-toggler').attr('aria-expanded') === 'true' && click.closest('.navbar').length === 0 && width < 1024) {
        $('button[aria-expanded="true"]').click();
    }
});
