DotLedger.module('Views.Accounts', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.tagName = 'div'

    ListItem.prototype.template = 'accounts/list_item'

    ListItem.prototype.className = 'list-group-item'

    return ListItem
  })(Backbone.Marionette.ItemView)
})
