enyo.kind({
	name: "App",
	components: [
		{kind: "AlfWrapper", onConnect: "handleConnect", onLoadSites: "handleLoadSites"},
		{kind: enyo.Panels, classes: "enyo-fit", components: [
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
				{content: "Main panel"}
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
		var config = this.$.alfWrapper.getConfig();
		var username = this.$.username.getValue();
		var password = this.$.password.getValue();
		config = enyo.mixin(config, {login: username, password: password});
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
	setupSite: function(inSender, inEvent) {
		var index = inEvent.index;
		var site = this.data[index];
		this.log(index);
		this.$.site.setTitle(site.title);

		return true;
	},
	pickSite: function(inSender, inEvent) {
		var index = inEvent.index;
		var site = this.data[index];
		this.log(site);

		this.$.panels.next();

		//return true;
	}
});