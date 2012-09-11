enyo.kind({
	name: "App",
    kind: enyo.FittableRows,
    classes: "onyx",
	fit: true,
	components:[
        {kind: "AlfWrapper", onConnect: "handleConnect", onLoadSites: "handleLoadSites"},
        {   name: "docList",
            kind: enyo.List,
            onSetupItem: "handleAddItem",
            components: [
                {kind:"AlfNode"}
            ]
        }
	],

    create: function() {
        this.inherited(arguments);
        this.$.alfWrapper.connect();
    },

	handleConnect: function(inSender, inEvent) {
		this.log(inEvent.error === null);
        this.$.alfWrapper.getSites();
	},

    handleLoadSites: function(inSender, inEvent) {

        if (inEvent.data) {
            this.data = inEvent.data;
            this.log("Count: "+this.data.length);
            this.$.docList.setCount(this.data.length);
            this.$.docList.refresh();
            //this.$.docList.setData(inEvent.data);
        } else {
            this.log(inEvent.error);
        }

    },
    handleAddItem: function(inSender, inEvent) {
        this.log(this.data[inEvent.index].title);
        this.$.alfNode.setTitle(this.data[inEvent.index].title);
    }
});