enyo.kind({
	name: "App",
	components: [
		{kind: "AlfWrapper", onConnect: "handleConnect", onLoadSites: "handleLoadSites", onLoadDocs: "handleLoadDocs"},
		{kind: enyo.Panels, classes: "enyo-fit", draggable: false, components: [
			{name: "loginPanel", kind: "LoginPanel"},
			{name: "mainPanel", kind: "MainPanel", onBack: "doBack"}
		]}
	],
	handlers: {
		onLoginRequest: "connectAlf",
		onRequestDocs: "requestDocs",
		onShowSite: "showSite"
	},
	connectAlf: function(inSender, inEvent) {
		// TODO: Needs a more robust config system
		var credentials = inEvent.credentials;
		var login = credentials.login;
		var password = credentials.password;
		
		var config = enyo.mixin(this.$.alfWrapper.getConfig(), {login: login, password: password});
		
		this.$.alfWrapper.setConfig(config);
		this.$.alfWrapper.connect();
	},
	handleConnect: function(inSender, inEvent) {
		this.log(inEvent.error === null);
		this.$.alfWrapper.getSites();

		return true;
	},
	handleLoadSites: function(inSender, inEvent) {

		this.$.loginPanel.addSites(inEvent.data);

		return true;
	},
	showSite: function(inSender, inEvent) {
		var site = inEvent.site;
		this.log("HAVE site");
		this.log(site);
		this.context = {
			site: inEvent.site.shortName,
			folderPath: "/"
		};
		this.log(this.context);
		//this.site = site;

		// get the DocList
		this.log("GETTING DOC LIST");
		this.$.alfWrapper.getDocList(this.context, enyo.bind(this, "handleLoadDocs"));

		this.$.panels.next();
	},
	handleLoadDocs: function(inSender, inEvent) {

		this.log();
		this.log(arguments);
		this.$.mainPanel.addDocs(inEvent.data);

		return true;
	},
	requestDocs: function(inSender, inEvent) {
		//this.$.alfWrapper.getDocList(this.site, )
	},
	doBack: function() {
		this.$.panels.previous();
	}
});