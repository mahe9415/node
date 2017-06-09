exports.homePage=(res,req)=>{
	console.log(req.name);
	res.render('index');
}
exports.addStore=(req,res)=>{
	res.render('edit',{title:'cool'})
};