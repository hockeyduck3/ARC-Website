// When the submit button is clicked
$('.submitBtn').click(event => {
    event.preventDefault();

    // This variable will be used to tell the code whether or not to send the email
    let anyErrors = false;

    // Variables needed for email data
    let firstName = $('#firstNameInput').val().trim();
    let lastName = $('#lastNameInput').val().trim();
    let fullName = `${firstName} ${lastName}`;
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

    // If there are no errors
    if (!anyErrors) {
        // Set the loader to the sending animation
        $('.submitBtn')
            .html('Sending <div class="loader"></div>')
            .removeClass('hover');

        // Disable all the input fields and the submit button
        $('#firstNameInput, #lastNameInput, #emailInput, #textInput, .submitBtn').prop('disabled', true);

        // Create a data object with everything the user typed in
        const data = {
            fullName: fullName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        }

        // Send the email
        $.ajax({
            url: '/api/mail',
            method: 'POST',
            data: data
        }).then((info) => {
            // If the email was succesfully sent
            if (info.response.includes('250')) {
                // Let the user know
                $('.submitBtn').html('Message Sent!');
            } 
            
            // If there was an error
            else {
                // Alert the user
                alert(`There has been an error sending your message. Code: ${info.responseCode}.`)

                // Reset the submit button
                $('.submitBtn')
                    .css('color', '#fff')
                    .html('Submit')
                    .addClass('hover');

                // Re-enable all the input fields and the submit button
                $('#firstNameInput, #lastNameInput, #emailInput, #textInput, .submitBtn').prop('disabled', false);
            }
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
