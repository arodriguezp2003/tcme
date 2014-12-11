exports.render = function(req,res){
	if (req.session.lasVisit) {
		console.log(req.session.lasVisit);
	}
	req.session.lasVisit = new Date();
	res.render('index',{
		title: 'TCME'
	});
}