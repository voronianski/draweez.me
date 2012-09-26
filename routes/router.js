function index (request, response) {
	response.render('base', { title: 'draweez.me' });
}

function draw (request, response) {
	response.render('app');
}

exports.index = index;
exports.draw = draw;