const mongoose=require('mongoose')
const Store= mongoose.model('Store')
// const slug = require('slugs')
const multer=require('multer')
const jimp = require('jimp')
const uuid = require('uuid')


const multerOptions ={
	storage:multer.memoryStorage(),
	fileFilter(req,file,next){
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto){
			next(null,true);
		}
		else{
			next({message:'That filetype is not allowed'},false);
		}
	}
}

exports.homePage=(req,res)=>{
	res.render('index',{
		title:'woooo'
	});
}

exports.addStore=(req,res)=>{
	res.render('edit',{title:'cool'})
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req,res,next)=>{
	if(!req.file){
		next() 
		return
	}
	const extension= req.file.mimetype.split('/')[1]
	req.body.photo = `${uuid.v4()}.${extension}`;
	const photo= await jimp.read(req.file.buffer)	;
	await photo.resize(800,jimp.AUTO)
	await photo.write(`./public/uploads/${req.body.photo}`);
	next();
}


exports.createStore = async(req,res) => {
	const store = new Store(req.body);
	// store.slug=slug(req.body.name)
	// console.log(store)
	await store.save();
 	req.flash('success','Successfully create a store'+ store.name)
	res.redirect('/')
}

exports.getStores =async(req,res) => {
	const stores= await Store.find()
	res.render('stores',{title: 'Stores', stores })
}

exports.editStores =async(req,res) => {
	const store=await Store.findOne({_id:req.params.id}).
	then((store)=>{res.render('edit',{title:`Edit ${store.name}`, store });})
}

exports.updateStores =async(req,res) => {
	req.body.location.type='Point'
	const store=await Store.findOneAndUpdate({_id:req.params.id},req.body,{
		new:true,
		runValidators: true
	}).exec();
	req.flash('success',`Successfully updates <strong> ${store.name}</strong><a href="/stores/${store.slug}"> View Store</a>`)
	res.redirect(`/stores/${store._id}/edit`)
}


exports.getStore = async(req,res,next)=>{
	const store = await Store.findOne({slug:req.params.slug})
	if(!store) return next()
		
	res.render('store',{store,title:store.name})
}


exports.getTags = async(req,res)=>{
	const tag= req.params.tag;
	const tagQuery = tag || { $exists:true };
	const tagsPromise = Store.getTagslist()
	const storesPromise = Store.find({tags:tagQuery})
	const [tags, stores] = await Promise.all([tagsPromise,storesPromise])
	res.render('tags',{tags,title:'Tags', tag,stores})
}