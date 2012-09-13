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
			{layoutKind: enyo.FittableRowsLayout, style: "min-width: 75%; background-color: #e3e3e3;", components: [
				{kind: enyo.Scroller, fit: true, horizontal: "hidden", components: [
					{kind: "com.Pre101.Masonry", components: [
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
						{content: "Wooba wooba", style: "width: 190px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 120px; height: 120px;"},
						{content: "Wooba wooba", style: "width: 50px; height: 50px;"},
					]}
				]}
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
		this.log(doc);

		return true;
	}
});