import axios from 'axios';

var self = {
	method: "GET",
	headers: {
		'Content-Type' : 'application/json'
	},
	setMethod: function(method) {
		self.method = method;
		return self;
	},
	setHeader: function(key, value) {
		self.headers[key] = value;
		return self;
	},
	reset: function() {
        self.method = "GET";
        self.headers = {"Content-Type" : "application/json"};
        return self;
    },
	handleApiError : function() {
		return auth.signout();
	},
	sendRequest: function(url, data, authenticate, callback, dispatch) {

		return axios({
			method: self.method,
			url: url,
			// responseType:'json',
			// headers: self.headers,
			// data: data,
			timeout : 120000,
			params: (self.method == "GET") ? data : {}
		})
		.then(function (response) {
			self.reset();
			callback(response);
		})
		.catch(function (error) {
			console.log('error : ', error);
		});
	}
}

export default self;