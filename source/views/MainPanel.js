enyo.kind({
	name: "MainPanel",
	kind: enyo.Panels,
	arrangerKind: enyo.CollapsingArranger,
	components: [
		{kind: enyo.FittableRows, fit: true, components: [
			{kind: enyo.FittableColumns, components: [
				{name: "docList", kind: enyo.List, fit: true, count: 0, onSetupItem: "setupDoc", ontap: "pickDoc", components: [
					{name: "doc", kind: "AlfNode"}
				]}
			]}
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