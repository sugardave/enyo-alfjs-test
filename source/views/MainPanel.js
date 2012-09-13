enyo.kind({
	name: "MainPanel",
	//kind: enyo.Panels,
	//arrangerKind: enyo.CollapsingArranger,
	layoutKind: enyo.FittableRowsLayout,
	events: {
		onBack: "",
		onRequestDocs: ""
	},
	components: [
		{kind: onyx.Toolbar, content: "Alfresco Sample"},
		{kind: enyo.Panels, arrangerKind: enyo.CollapsingArranger, fit: true, components: [
			{name: "docList", kind: enyo.List, fit: true, count: 0, onSetupItem: "setupDoc", ontap: "pickDoc", style: "max-width: 25%;", components: [
				{name: "doc", kind: "AlfNode"}
			]},
			{layoutKind: enyo.FittableRowsLayout, style: "min-width: 75%; background-color: #e3e3e3;", components: [
				{kind: enyo.Scroller, fit: true, horizontal: "hidden"}
			]}
		]},
		{kind: onyx.Toolbar, components: [
			{kind: enyo.Grabber},
			{kind: onyx.Button, content: "Back", ontap: "doBack"}
		]}
	],
	addDocs: function(inData) {
		if (inData) {
			this.docs = inData.items;
			this.$.docList.setCount(this.docs.length);
			this.$.docList.refresh();
		} else {
			this.log(inEvent.error);
		}
	},
	setupDoc: function(inSender, inEvent) {
		var index = inEvent.index;
		var doc = this.docs[index];
		this.$.doc.setTitle(doc.location.file);

		return true;
	},
	pickDoc: function(inSender, inEvent) {
		var index = inEvent.index;
		var doc = this.docs[index];
		var folderPath = doc.location.path + doc.location.file;
		this.log(doc);
		var callback = enyo.bind(this, function(inSender, inEvent) {
			var items = inEvent.data.items, item;
			var nodes = [], node;
			if (items.length) {
				for (var i = 0, j = items.length; i < j; i += 1) {
					item = items[i];
					this.log("ITEM");
					this.log(item);
					nodes.push({kind: "AlfTextNode", title: item.location.file, author: item.node.properties["cm:creator"].displayName, description: "Need a description", thumbnail: "Need a thumbnail"});
				}
				this.buildBricks(nodes);
			}
		});
		this.doRequestDocs({folderPath: folderPath, callback: callback});


		return true;
	},
	buildBricks: function(inNodes) {
		this.$.scroller.destroyClientControls();
		this.$.scroller.createComponent({name: "masonry", kind: "com.Pre101.Masonry"}, {owner: this});
		this.$.masonry.createComponents(inNodes, {owner: this});
		this.$.scroller.render();
	}
});