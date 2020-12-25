// When the submit button is clicked
$('.submitBtn').click(event => {
    event.preventDefault();

    let fullName = `${$('#firstNameInput').val().trim()} ${$('#lastNameInput').val().trim()}`;
    let firstName = $('#firstNameInput').val().trim();
    let lastName = $('#lastNameInput').val().trim();
    let email = $('#emailInput').val().trim();
    let message = $('#textInput').val().trim();

    const data = {
        fullName: fullName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message
    }

    $.ajax({
        url: '/api/contact',
        method: 'POST',
        data: data
    }).then(() => {
        console.log('Post sent');
    });
});
