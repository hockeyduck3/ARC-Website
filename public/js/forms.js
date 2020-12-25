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

$('.form-control').on('keyup', (event) => {
    let element = `#${event.target.id}`;
    let star;
    
    switch (element) {
        case '#firstNameInput':
            star = '.starOne'
            break;
        
        case '#lastNameInput':
            star = '.starTwo'
            break;
        
        default:
            star = '.starThree'
    }

    if ($(element).val().length === 0) {
        $(star).fadeIn('slow');
    } else {
        $(star).fadeOut('slow');
    }
});
