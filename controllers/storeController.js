const mongoose=require('mongoose')
const Store= mongoose.model('Store');
const slug = require('slugs')

exports.homePage=(req,res)=>{
	res.render('index',{
		title:'woooo'
	});
}
exports.addStore=(req,res)=>{
	res.render('edit',{title:'cool'})
};

exports.createStore = async(req,res) => {
	const store = new Store(req.body);
	store.slug=slug(req.body.name)
	console.log(store)
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
	const store=await Store.findOneAndUpdate({_id:req.params.id},req.body,{
		new:true,
		runValidators: true
	}).exec();

	req.flash('success',`Successfully updates <strong> ${store.name}</strong><a href="/stores/${store.slug}"> View Store</a>`)
	res.redirect(`/stores/${store._id}/edit`)
}