const passport = require('passport')
const mongoose= require('mongoose')
const User= mongoose.model('User')
const crypto = require('crypto')
const promisify = require('es6-promisify')

exports.login=passport.authenticate('local',{
failureRedirect:'/login',
failureFlash:'Login Failed!!!!',
successRedirect:'/',
successFlash:'Logged in ->'
})


exports.logout=(req,res)=>{
	req.logout();
	req.flash('success','You are logged out')
	res.redirect('/')
}

exports.isLoggedIn=(req,res,next)=>{
	if(req.isAuthenticated()){
		next()
		return;
	}
	req.flash('error','Oops !! You should log in first')
	res.redirect('/login')
}

exports.forgot= async(req,res,next)=>{
	const user = await User.findOne({email:req.body.email})
	if(!user){	
		req.flash('error','No email with this ac')
		return res.redirect('/login')
	}
	user.resetPasswordToken=crypto.randomBytes(20).toString('hex')
	user.resetTokenExpries = Date.now() + 3600000
	await user.save();


	const resetURL = `http://${req.headers.host}.account/reset/${user.resetPasswordToken}`
	req.flash('success',`Yo Yo  Done!!. ${resetURL}`)
	res.redirect('/login')
	next()
}


exports.reset = async(req,res)=>{
	const user = await User.findOne({
		resetPasswordToken:req.params.token,
		resetTokenExpries: { $gt:Date.now() }
	})
	if(!user){
		req.flash('error','No user found or token expries')
		return res.redirect('/login')
	}
	res.render('reset',{title:'Reset Password'})
}


exports.confrimedPassword= (req,res,next)=>{
if(req.body.password === req.body['password-confirm']){
next()
return
}
req.flash('error','Password not match')
res.redirect('back')
}

exports.update = async(req,res)=>{
const user = await User.findOne({
		resetPasswordToken:req.params.token,
		resetTokenExpries: { $gt:Date.now() }
	})
	if(!user){
		req.flash('error','No user found or token expries')
		return res.redirect('/login')
	}
	
  	const setPassword = promisify(user.setPassword,user)
  	await setPassword(req.body.password)
  	user.resetPasswordToken=undefined;
  	user.resetTokenExpries=undefined;
  	console.log(req.body.password)
  	const updatedUser = await user.save()
  	await req.login(updatedUser)
  	req.flash('success','Password has been changed.Now you are logged in ')
  	res.redirect('/')
}