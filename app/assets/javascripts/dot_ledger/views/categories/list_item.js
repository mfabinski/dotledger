DotLedger.module('Views.Categories', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.tagName = 'div'

    ListItem.prototype.className = 'list-group-item'

    ListItem.prototype.template = 'categories/list_item'

    return ListItem
  })(Backbone.Marionette.ItemView)
})
