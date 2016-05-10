import './app-body.html';

import '../components/loading.js';

Template.App_body.events({
	'click .nav a'(e, t) {
		console.log("click .nav a");
		// $('.navbar-toggle').click();
		// $('.nav-collapse').collapse('hide');
	},
});