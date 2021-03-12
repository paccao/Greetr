// Create a new execution context for our entire framework, 
// so that all our variables declared are safe and we are only exposing on the global object what we want.

( function( global, $) {

    // Setup Greetr so that it creates an object but imitates jQuery.
    // When I call my framework I only want to call using an easy structure like: "PV$()", it's a function.
    // I don't want to have to say the "new" keyword all the time.

    // "new" an object
    const Greetr = function(firstName, lastName, language) {
        // I want it to return the results of a different function constructor.
        return new Greetr.init(firstName, lastName, language);
    }

    // The actual object is created here, allowing us to "new" an object withot calling "new"
    Greetr.init = function(firstName, lastName, language) {

        // Save reference to this so that we don't mutate the global prototype.
        const self = this;

        // Default properties
        self.firstName = firstName || "";
        self.lastName =  lastName || "";
        self.language = language || "en"; // en for English

        self.validateLang();
    }

    // Accessible to the prototype object which will be exposed via CLOSURE.
    // However, these will not be exposed to the outside of the framework because they are not on the prototype, it's in the IIFE.

    /// Hidden within the scope of the IIFE and never directly accessible
    const supportedLangs = ["en", "sv"];

    // informal greetings
    const greetings = {
        en: "Hey",
        sv: "Tjena"
    };

    // formal greetings
    const formalGreetings = {
        en: "Greetings",
        sv: "Goddag"
    };

    // Log messages
    const logMessages = {
        en: "Logged in",
        sv: "Inloggad"
    };
    ///

    // Prototype to put any methods that I want to use inside my object that's returned from Greetr.
    // Holds methods (to save memory space)
    // These will be exposed
    Greetr.prototype = {

        // "this" refers to the calling object at execution time
        fullName: function() {
            return `${this.firstName} ${this.lastName}`;
        },

        validateLang: function() {
            // check that it is a valid language
            // references the externally inaccessible "supportedLangs" within the CLOSURE
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Language is not supported."
            }
        },

        /// Retrieve messages from object by referring to properties
        greeting: function() {
            return `${greetings[this.language]} ${this.firstName}!`;
        },

        formalGreeting: function() {
            return `${formalGreetings[this.language]}, ${this.fullName()}.`;
        },
        ///

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

        // Log the first name of the person in the selected language
        log: function() {
            if(console) {
                console.log(`${logMessages[this.language]}: ${this.fullName()}`);
            }
            // Chainable method
            return this;
        },

        // Change the language on the fly
        setLang: function(lang) {
            // set language
            this.language = lang;

            // Validate
            this.validateLang();

            // Make chainable
            return this;
        },

        // Method that accepts a selector with jQuery and whether or not it's a formal greeting
        // Uses jQuery to update the value
        outPutGreeting: function(selector, formal) {
            // Throw errors if jQuery or selector missing
            if(!$) {
                throw "jQuery not loaded";
            }
            // ! TODO: Check for further invalid selectors.
            if(!selector) {
                throw "Missing jQuery selector";
            }

            // Sets message to formal or informal
            let msg;
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // Display message in the the chosen DOM element
            $(selector).text(msg);

            // Makes the method chainable
            return this;
        }
    };

    // A trick borrowed from jQuery so I don't have to use the "new" keyword
    // Any object that is created in the init function gets pointed to the Greetr.prototype prototype chain
    Greetr.init.prototype = Greetr.prototype;

    // Attach my Greetr to my global object so that I can call my function from anywhere with an alias for my function
    // * Exposes Greetr and G$ identifiers
    global.Greetr = global.G$ = Greetr;


}(window, jQuery) );