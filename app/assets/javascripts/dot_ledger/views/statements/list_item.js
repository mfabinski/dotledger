DotLedger.module('Views.Statements', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.tagName = 'tr'

    ListItem.prototype.template = 'statements/list_item'

    return ListItem
  })(Backbone.Marionette.ItemView)
})
