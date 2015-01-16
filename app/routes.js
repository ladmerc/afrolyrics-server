/*************************************************************************************************

        ROUTES FOR AUTHENTICATION ARE DEFINED HERE. FOR MODULARITY, ROUTES FOR CLIENT INTERACTION
                        ARE DEFINED IN client-routes.js 

*******************************************************************************************************/


/*  ========================================================

            DEFINING MIDDLEWARES

// ============================================================ */


    // =====================================
    // CHECK IF USER ALREADY HAS SESSION
    // =====================================

  function checkForSession(req, res, next) {
    if (req.user) {
        next(); //If session exists, go to the next function
    } else {
        res.redirect('/signup'); //otherwise redirect to signup
    }
  };

    // ====================================================================
    // VALIDATES USER GOING BACK TO LOGIN AND SIGN UP WHEN LOGGED IN
    // ===================================================================

  function checkDoubleLogin(req, res, next) {
    if (req.user) {
      res.send({ message: 'already Logged In' });
     //  setTimeout(function() {
     //   res.redirect('/profile');
     // }, 3000);
    }
    else {
      next();
    }
  };

    // =========================================================
    // CHECK FOR SESSION (DUPLICATE) USING NEW PASSPORT API (specifally for redirection on limited resources)
    // ========================================================

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
        console.log("You need to be logged in to view profile");
    };



/*  ========================================================

            DEFINING ROUTES

// ============================================================ */


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================


    app.get('/', checkForSession, function(req, res) {
        res.json(req.user); // load the index.ejs file
    });

    app.get('/lyrics', function(req, res) {
        // use mongoose to get all lyrics in the database
        Afrolyrics.find(function(err, lyrics) {
            res.json(lyrics); // return all lyrics in JSON format
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    
    app.get('/login', checkDoubleLogin, function(req, res) {
        // check if user is already registered and then display message
        res.send(req.user); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    
    app.get('/signup', function(req, res) {

        // send the logged user details
        // render the page and pass in any flash data if it exists
        res.send(req.user);
            // message: req.flash('signupMessage') });
    });

 
    // =====================================
    // SIGNUP ==============================
    // =====================================

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================

        // Check if user is registered and show profile.
        // Else, redirect user to login page
    app.get('/profile', isLoggedIn, function(req, res) {

        // res.render('profile.ejs', {
        //     user : req.user // get the user out of session and pass to template
        // });
        res.send(req.user);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        if (err)
            res.send(err);

        req.logout();
        res.redirect('/');
    });

    // =====================================
    // Catch any other request and throw a 404 error
    // =====================================
        // route to handle all other client requests
        app.get('*', function(req, res) {

            if (err)
                res.send(err);

            res.send({
            message: "Sorry! It seems you've lost your way. Please check if you typed the right address",
            status: 404
            }); // load our public/index.html file
        });

};


