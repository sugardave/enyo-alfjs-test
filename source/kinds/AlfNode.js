enyo.kind({
	name:"AlfNode",
	//kind: onyx.Item,
	layoutKind: enyo.FittableRowsLayout,
	classes: "alf-node",
	published: {
		author: "",
		description: "",
		thumbnail: "",
		title: "",
		url: ""
	},
	components: [
		{name: "title"},
		{name: "thumbnail"},
		{name: "author"},
		{name: "description"}
	],
	create: function() {
		this.inherited(arguments);
		this.authorChanged();
		this.descriptionChanged();
		this.thumbnailChanged();
		this.titleChanged();
	},
	authorChanged: function() {
		this.$.author.setContent(this.author);
	},
	descriptionChanged: function() {
		this.$.description.setContent(this.description);
	},
	thumbnailChanged: function() {
		this.$.thumbnail.setContent(this.thumbnail);
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