enyo.kind({
	name:"AlfNode",
	kind: onyx.Item,
	classes: "alf-node",
	published: {
		url: "",
		title: "",
		description: ""
	},
	components: [
		{tag: "span", name: "title"}
	],
	create: function() {
		this.inherited(arguments);
		this.titleChanged();
	},
	titleChanged: function() {
		this.$.title.setContent(this.title);
	}
});


/*"url": "\/alfresco\/service\/api\/sites\/swsdp",
	"sitePreset": "site-dashboard",
	"shortName": "swsdp",
	"title": "Sample: Web Site Design Project",
	"description": "This is a Sample Alfresco Team site.",
	"node": "\/alfresco\/service\/api\/node\/workspace\/SpacesStore\/b4cff62a-664d-4d45-9302-98723eac1319",
	"tagScope": "\/alfresco\/service\/api\/tagscopes\/workspace\/SpacesStore\/b4cff62a-664d-4d45-9302-98723eac1319",
	"siteManagers":
	[
			"mjackson",
			"admin"
	],
	"isPublic": true,
	"visibility": "PUBLIC"*/