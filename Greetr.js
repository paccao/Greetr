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

    Greetr.init = function(firstName, lastName, language) {

        // Save reference to this so that we don't mutate the global prototype.
        const self = this;

        // Default properties
        self.firstName = firstName || "";
        self.lastName =  lastName || "";
        self.language = language || "en"; // en for English

    }

    // Accessible to the prototype object which will be exposed via CLOSURE.
    // However, these will not be exposed to the outside of the framework because they are not on the prototype, it's in the IIFE.
    const supportedLangs = ["en", "sv"];
    const greetings = {
        en: "Hey",
        sv: "Tjena"
    };

    const formalGreetings = {
        en: "Greetings",
        sv: "Goddag"
    };

    const logMessages = {
        en: "Logged in",
        sv: "Inloggad"
    };

    // Prototype to put any methods that I want to use inside my object that's returned from Greetr.
    // These will be exposed
    Greetr.prototype = {

        fullName: function() {
            return `${this.firstName} ${this.lastName}`;
        },

        validateLang: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Language is not supported."
            }
        },

        greeting: function() {
            return `${greetings[this.language]} ${this.firstName}!`;
        },

        formalGreeting: function() {
            return `${formalGreetings[this.language]}, ${this.fullName()}.`;
        },

        greet: function(formal) {
            let msg;

            // If undefined or null it will be coerced to "false"
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // "this" refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        log: function() {
            if(console) {
                console.log(`${logMessages[this.language]}: ${this.fullName}`);
            }
            // Chainable method
            return this;
        },

        // Change the language on the fly
        setLang: function(lang) {
            this.language = lang;

            this.validateLang();

            return this;
        }
    };

    // Any object that is created in the init function gets pointed to the Greetr.prototype prototype chain
    Greetr.init.prototype = Greetr.prototype;

    // Attach my Greetr to my global object so that I can call my function
    // from anywhere with an alias for my function
    // * Exposes Greetr and G$ identifiers
    global.Greetr = global.G$ = Greetr;


}(window, jQuery) );