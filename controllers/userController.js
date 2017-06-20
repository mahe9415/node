const mongoose=require('mongoose')
const Store= mongoose.model('Store')
const promisify = require("es6-promisify")
const User= mongoose.model('User')
exports.loginForm=(req,res)=>{
res.render('login',{title:'Login'})
}


exports.registerForm=(req,res)=>{
	res.render('register',{title:'Register'})
}


exports.validateRegister= (req,res,next)=>{
	req.sanitizeBody('name');
	req.checkBody('name','You must give a name').notEmpty()
	req.checkBody('email','You must give an email').isEmail()
	req.sanitizeBody('email').normalizeEmail({
		remove_dots:false,
		remove_extension:false,
		gmail_remove_subaddress:false
	})

	req.checkBody('password','Enter a password').notEmpty()
	req.checkBody('password-confirm','Enter a password-confirm').notEmpty()
	req.checkBody('password-confirm','Oops!! not match').equals(req.body.password)

const errors= req.validationErrors();
if(errors){
	req.flash('error',errors.map(err=>err.msg))
	res.render('register',{title:'Register',body :req.body,flashes:req.flash()})
};
next()
}

exports.register= async(req,res,next)=>{
	const user = new User({email:req.body.email,name:req.body.name})
	console.log(user)
	const register = promisify(User.register,User)
	await register(user,req.body.password)
	next()
}