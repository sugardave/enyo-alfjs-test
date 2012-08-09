enyo.kind({
    name: "alfWrapper",
    kind: enyo.Component,
    events: {
        onConnect: "",
        onLoadSites: "",
        onLoadNodes: ""
    },

    alf: null,
    connected: false,

    published: {
        config: {
            hostname: 'home.sala.us',
            login: 'admin',
            password: 'admin',
            protocol: 'http',
            port: 80,
            serviceBase: 'alfresco/service/',
            prefix: '/_proxy/'
        }
    },

    isConnected: function() {
        return this.connected;
    },

    connect: function() {
        this.alf = AlfJS.createConnection(this.config);
        var _self = this;
        this.alf.login(
            function() {
                // Success
                console.log('Login Succeeded');
                _self.connected = true;
                _self.doConnect();
            },
            function(error) {
                // Error
                _self.doConnect({error: error});
                console.log('Login Failed');
            });
    },

    getSites: function() {
        var _self = this;
        this.alf.getUserSites(function(data){
            _self.doLoadSites({data:data});
            console.log("The first site on the list is " + data[0].title);
        }, function(error){
            _self.doLoadSites({error:error})
            console.log("Oops!");
        });
    }

});

enyo.kind({
	name: "App",
    kind: enyo.FittableRows,
    classes: "onyx",
	fit: true,
	components:[
        {kind: "alfWrapper", onConnect: "handleConnect", onLoadSites: "handleLoadSites"},
        {   name: "docList",
            kind: enyo.List,
            onSetupItem: "handleAddItem",
            components: [
                {kind:"alfNode"}
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

/*
enyo.kind({
    name:"docList",
    kind: "enyo.List",
    fit: true,
    components: [{kind: "alfNode"}],
    setupItem: function(inSender, inEvent) {
        var data = this.data[inEvent.index];
        this.$.alfNode.setContent(data.properties["cm:name"]);
    },
    itemTap: function(inSender, inEvent) {
        alert("You tapped on row: " + inEvent.index);
    }
});
*/
enyo.kind({
    name:"alfNode",
    kind: enyo.Item,
    published: {
        title:""
    },

    components: [
        { tag: "span", name: "title" }
    ],

    create: function() {
        this.inherited(arguments);
        this.titleChanged();
    },
    titleChanged: function() {
        this.$.title.setContent(this.title);
    }
});