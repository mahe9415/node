const passport = require('passport')

exports.login=passport.authendication('local',{
failureRedirect:'/login',
failureFlash:'Login Failed!!!!',
successRedirect:'/',
successFlash:'Logged in ->'
})