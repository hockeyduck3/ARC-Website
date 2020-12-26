// When the submit button is clicked
$('.submitBtn').click(event => {
    event.preventDefault();

    // This variable will be used to tell the code whether or not to send the email
    let anyErrors = false;

    // Variables needed for email data
    let fullName = `${$('#firstNameInput').val().trim()} ${$('#lastNameInput').val().trim()}`;
    let firstName = $('#firstNameInput').val().trim();
    let lastName = $('#lastNameInput').val().trim();
    let email = $('#emailInput').val().trim();
    let message = $('#textInput').val().trim();

    // Array for checking for errors
    let errorTestArr = ['#firstNameInput', '#lastNameInput', '#emailInput'];

    // Loop through the array and see if there are any errors with any of them
    for (let i = 0; i < errorTestArr.length; i++) {
        if ($(errorTestArr[i]).val().trim().length === 0) {
            runError(errorTestArr[i]);
            anyErrors = true;
        }
    }

    // If there are no errors, send the email
    if (!anyErrors) {
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
    }
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
        $(element).css('border-color', 'rgb(128, 128, 128)');
        $(star).fadeOut('slow');
    }
});

// Show an error animation
function runError(element) {
    $(element).addClass('animate__animated animate__shakeX');
    $(element).css('border-color', 'red');

    setTimeout(() => {
        $(element).removeClass('animate__animated animate__shakeX');
    }, 800);
}
