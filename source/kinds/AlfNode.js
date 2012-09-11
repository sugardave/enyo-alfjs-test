enyo.kind({
    name:"AlfNode",
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