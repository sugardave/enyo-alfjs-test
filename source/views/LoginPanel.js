enyo.kind({
	name: "LoginPanel",
	kind: enyo.FittableRows,
	events: {
		onLoginRequest: "",
		onShowSite: ""
	},
	components: [
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
				{name: "login", kind: onyx.Button, content: "Log in", disabled: true, ontap: "alfLogin"}
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
	],
	inputChanged: function(inSender, inEvent) {
		setTimeout(enyo.bind(this, function() {
			var username = this.$.username.getValue();
			var password = this.$.password.getValue();
			var empty = (!username || !password);
			this.$.login.setDisabled(empty);
		}), 0);
	},
	alfLogin: function(inSender, inEvent) {
		this.doLoginRequest({credentials: {login: "admin", password: "admin"}});
	},
	addSites: function(inData) {
		// add the sites to the siteList
		if (inData) {
			this.data = inData;
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
		this.$.site.setTitle(site.title + " (" + site.shortName + ")");

		return true;
	},
	pickSite: function(inSender, inEvent) {
		var index = inEvent.index;
		var site = this.data[index];
		this.log(site);

		// notify intent to go to main panel
		this.doShowSite({site: site});

		return true;

		// get the DocList
		this.$.alfWrapper.getDocList(site);

		this.$.panels.next();

		return true;
	}
});