enyo.kind({
	name: "MainPanel",
	//kind: enyo.Panels,
	//arrangerKind: enyo.CollapsingArranger,
	layoutKind: enyo.FittableRowsLayout,
	events: {
		onBack: ""
	},
	components: [
		{kind: onyx.Toolbar, content: "Alfresco Sample"},
		{kind: enyo.Panels, arrangerKind: enyo.CollapsingArranger, fit: true, components: [
			{name: "docList", kind: enyo.List, fit: true, count: 0, onSetupItem: "setupDoc", ontap: "pickDoc", style: "max-width: 25%;", components: [
				{name: "doc", kind: "AlfNode"}
			]},
			{content: "foo", style: "background-color: #fff; border: solid 1px red; min-width: 75%;"}
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
		this.log(doc);

		return true;
	}
});