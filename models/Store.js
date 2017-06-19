const mongoose =require('mongoose');
mongoose.Promise=global.Promise;
const slug =require('slugs');

const storeSchema = new mongoose.Schema({
	name:{
		type:String,
		trim:true,
		required:'Enter a name'
	},
	description:{
		type:String,
		// required:'Enter description',
		trim:true
	},
	tags:[String],
	slug:String,
	created:{
		type:Date,
		default:Date.now
	},
	location:{
		type:{
			type:String,
			default:'Point'
		},
		coordinates:[{
			type:Number,
			required:'You must provide coordinates'
		}],
		address:{
			type:String,
			required:'You mush provide adn address!'
		}
	}
})


// storeSchema.pre('save',function(next,done){
// 	this.slug=slug(this.name)
// 	next();
// 	})

module.exports=mongoose.model('Store',storeSchema);