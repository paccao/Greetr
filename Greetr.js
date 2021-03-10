// Create a new execution context for our entire framework, 
// so that all our variables declared are safe and we are only exposing on the global object what we want.

( function( global, $) {

    // Setup Greetr so that it creates an object but imitates jQuery.
    // When I call my framework I only want to call using an easy structure like: "PV$()", it's a function.
    // I don't want to have to say the "new" keyword all the time.

    // TODO: Greet people in different ways, read README.md
    const Greetr = function(firstName, lastName, language) {

        // I want it to return the results of a different function constructor.
        return new Greetr.init(firstName, lastName, language);
    }

    // Prototype to put any methods that I want to use inside my object that's returned from Greetr.
    Greetr.prototype = {};

    Greetr.init = function(firstName, lastName, language) {

        // Save reference to this so that we don't mutate the global prototype.
        const self = this;

        // Default properties
        self.firstName = firstName || "";
        self.lastName =  lastName || "";
        self.language = language || "en"; // en for English

    }

    // Any object that is created in the init function gets pointed to the Greetr.prototype prototype chain
    Greetr.init.prototype = Greetr.prototype;

    // Attach my Greetr to my global object.


}(global, jQuery) );