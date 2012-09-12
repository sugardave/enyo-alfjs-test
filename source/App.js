enyo.kind({
	name: "App",
	components: [
		{kind: "AlfWrapper", onConnect: "handleConnect", onLoadSites: "handleLoadSites", onLoadDocs: "handleLoadDocs"},
		{kind: enyo.Panels, classes: "enyo-fit", draggable: false, components: [
			{name: "loginPanel", kind: enyo.FittableRows, components: [
				{kind: enyo.FittableColumns, classes: "enyo-center", components: [
					{kind: enyo.FittableRows, components: [
						{content: "Please log in", style: "font-size: 0.7em; font-style: italic;"},
						{kind: onyx.InputDecorator, components: [
							{name: "username", kind: onyx.Input, placeholder: "username", classes: "center-placeholder", onkeydown: "inputChanged"}
						]},
						{tag: "br"},
						{kind: onyx.InputDecorator, components: [
							{name: "password", kind: onyx.Input, placeholder: "password", classes: "center-placeholder", onkeydown: "inputChanged"}
						]},
						{tag: "br"},
						{name: "login", kind: onyx.Button, content: "Log in", disabled: true, ontap: "connectAlf"}
					]}
				]},
				{tag: "br"},
				{name: "siteListWrapper", kind: enyo.FittableColumns, classes: "enyo-center", showing: false, components: [
					{kind: enyo.FittableRows, components: [
						{content: "Select a site", style: "font-size: 0.7em; font-style: italic;"},
						{kind: enyo.FittableColumns, components: [
							{name: "siteList", kind: enyo.List, count: 0, onSetupItem: "setupSite", ontap: "pickSite", style: "width: 15em;", components: [
								{name: "site", kind: "AlfNode"}
							]}
						]}
					]}
				]}
			]},
			{name: "mainPanel", kind: enyo.FittableRows, components: [
				{name: "docListWrapper", kind: enyo.FittableColumns, classes: "enyo-center", showing: false, components: [
					{kind: enyo.FittableRows, components: [
						//{content: "Select a site", style: "font-size: 0.7em; font-style: italic;"},
						{kind: enyo.FittableColumns, components: [
							{name: "docList", kind: enyo.List, count: 0, onSetupItem: "setupSite", ontap: "pickSite", style: "width: 15em;", components: [
								{name: "doc", kind: "AlfNode"}
							]}
						]}
					]}
				]}
			]}
		]}
	],
	inputChanged: function(inSender, inEvent) {
		setTimeout(enyo.bind(this, function() {
			var username = this.$.username.getValue();
			var password = this.$.password.getValue();
			var empty = (!username || !password);
			this.$.login.setDisabled(empty);
		}), 0);
	},
	connectAlf: function() {
		// TODO: Needs a more robust config system
		var username = this.$.username.getValue();
		var password = this.$.password.getValue();
		var config = enyo.mixin(this.$.alfWrapper.getConfig(), {login: username, password: password});
		this.$.alfWrapper.setConfig(config);
		this.$.alfWrapper.connect();
	},
	handleConnect: function(inSender, inEvent) {
		this.log(inEvent.error === null);
		this.$.alfWrapper.getSites();

		return true;
	},
	handleLoadSites: function(inSender, inEvent) {
		if (inEvent.data) {
			this.data = inEvent.data;
			this.log("Count: "+this.data.length);
			this.$.siteListWrapper.setShowing(this.data.length);
			this.$.siteList.setCount(this.data.length);
			this.$.siteList.refresh();
		} else {
			this.log(inEvent.error);
		}

		return true;
	},
	handleLoadDocs: function(inSender, inEvent) {
		if (inEvent.data) {
			this.docs = inEvent.data.items;
			this.log("Count: "+ this.docs.length);
			this.log(this.docs);
			//this.$.siteListWrapper.setShowing(this.docs.length);
			//this.$.siteList.setCount(this.docs.length);
			//this.$.siteList.refresh();
		} else {
			this.log(inEvent.error);
		}

		return true;
	},
	setupSite: function(inSender, inEvent) {
		var index = inEvent.index;
		var site = this.data[index];
		this.log(index);
		this.$.site.setTitle(site.title + " (" + site.shortName + ")");

		return true;
	},
	pickSite: function(inSender, inEvent) {
		var index = inEvent.index;
		var site = this.data[index];
		this.log(site);

		// get the SkyClip directory
		this.$.alfWrapper.getDocList(site);

		this.$.panels.next();

		//return true;
	}
});