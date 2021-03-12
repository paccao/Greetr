// Prompt the user's name
const firstName = prompt("Enter your first name. ");
const lastName = prompt("Enter your last name. ");

// Login function with the user name and Greets the user back.
$("#login").click(function() {

    // Create a new "Greetr" object
    const loginGrtr = Greetr(firstName, lastName);
    console.log(loginGrtr);

    // Hide the login on the screen using jQuery
    $("#logindiv").hide();

    // Fire of an outPutGreeting based on the selected output element with jQuery,
    // and with the chosen language based on the select options, then log the welcome.
    loginGrtr.setLang($("#lang").val()).outPutGreeting("#greeting", true).log();
})

// Gets a new object (the architecture allows us to not have to use the "new" keyword here)
const g = G$("John", "Doe");

// Use of the architecture's chainable methods.
g.greet().setLang("es").greet(true).log();