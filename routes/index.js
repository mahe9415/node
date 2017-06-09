const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // res.send('Hey! It works!');
  res.render('index',{
  	title:'whooo'
  })
});

router.get('/add',(req,res)=>{
	res.render('edit',{
		title:'cool!'
	})
})

module.exports = router;
