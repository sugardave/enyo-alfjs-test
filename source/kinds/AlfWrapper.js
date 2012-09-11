enyo.kind({
	name: "AlfWrapper",
	kind: enyo.Component,
	events: {
		onConnect: "",
		onLoadSites: "",
		onLoadNodes: ""
	},

	alf: null,
	connected: false,

	published: {
		config: {
			hostname: 'localhost',
			login: 'admin',
			password: 'admin',
			protocol: 'http',
			port: 8080,
			serviceBase: 'alfresco/service/',
			prefix: '/_proxy/'
		}
	},

	isConnected: function() {
		return this.connected;
	},

	connect: function() {
		this.alf = AlfJS.createConnection(this.config);
		var _self = this;
		this.alf.login(
			function() {
				// Success
				console.log('Login Succeeded');
				_self.connected = true;
				_self.doConnect();
			},
			function(error) {
				// Error
				_self.doConnect({error: error});
				console.log('Login Failed');
			}
		);
	},

	getSites: function() {
		var _self = this;
		this.alf.getUserSites(function(data){
			_self.doLoadSites({data:data});
			console.log("The first site on the list is " + data[0].title);
		}, function(error){
			_self.doLoadSites({error:error})
			console.log("Oops!");
		});
	}
});