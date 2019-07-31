(function ($) {

    var contacts = [
        { name: "Lyubashich", city: "Begoml", tel: "0123456789", rank: "high" },
        { name: "Anton", city: "Minsk", tel: "0123456789", rank: "low" },
        { name: "Nikita", city: "Brest", tel: "0123456789", rank: "mid" },
        { name: "Varya", city: "Minsk", tel: "0123456789", rank: "high" },
        { name: "Danik", city: "Minsk", tel: "0123456789",  rank: "mid" }
    ];

    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "img/av.jpg",
            name: "",
            city: "",
            tel: "",
            rank: ""
        }
    });

    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: _.template($("#contactTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            "click button.delete": "deleteContact"
        },

        deleteContact: function () {
            var removedType = this.model.get("rank").toLowerCase();

            this.model.destroy();

            this.remove();

            if (_.indexOf(directory.getTypes(), removedType) === -1) {
                directory.$el.find("#filter select").children("[value='" + removedType + "']").remove();
            }
        }
    });

    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function () {
            this.collection = new Directory(contacts);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderContact, this);
            this.collection.on("remove", this.removeContact, this);
        },

        render: function () {
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("rank"), false, function (rank) {
                return rank.toLowerCase();
            });
        },

        createSelect: function () {
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });

            return select;
        },

        events: {
            "change #filter select": "setFilter",
            "click #add": "addContact",
            "click #showForm": "showForm"
        },

        setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset(contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("rank").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
            }
        },

        addContact: function (e) {
            e.preventDefault();


            var formData = {};
            $("#addContact").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });

            contacts.push(formData);

            if (_.indexOf(this.getTypes(), formData.rank) === -1) {
                this.collection.add(new Contact(formData));
                this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            } else {
                this.collection.add(new Contact(formData));
            }
        },

        removeContact: function (removedModel) {
            var removed = removedModel.attributes;

            if (removed.photo === "/img/av.jpg") {
                delete removed.photo;
            }

            _.each(contacts, function (contact) {
                if (_.isEqual(contact, removed)) {
                    contacts.splice(_.indexOf(contacts, contact), 1);
                }
            });

        },

        showForm: function () {
            this.$el.find("#addContact").slideToggle();
        }
    });

    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:rank": "urlFilter"
        },

        urlFilter: function (rank) {
            directory.filterType = rank;
            directory.trigger("change:filterType");
        }
    });

    var directory = new DirectoryView();

    var contactsRouter = new ContactsRouter();

    Backbone.history.start();

} (jQuery));