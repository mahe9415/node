const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5= require('md5');
const validator = require('validator');
var mongodbErrorHandler= require('mongoose-mongodb-errors')
var passportLocalMongoose= require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
	email:
	{
		type:String,
		unique:true,
		lowercase:true,
		trim:true,
		validate:[validator.isEmail,'Invalid email'],
		required:'Please provide email addrress'
	},
	name:{
		type:String,
		required:'please provide name',
		trim:true
	}

});


userSchema.plugin(passportLocalMongoose,{usernameField:'email'})
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)