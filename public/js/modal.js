$('.galleryImage').click((event) => {
    let image;

    if ($(event.target).data('img').includes('\\')) {
        image = $(event.target).data('img').replace(/\\/g, ' ');
    } else {
        image = $(event.target).data('img');
    }

    $('#modalImage').attr('src', image);

    $('#imageModal').modal('show');
});
