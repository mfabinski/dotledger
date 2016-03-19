DotLedger.module('Views.SortingRules', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.tagName = 'tr'

    ListItem.prototype.template = 'sorting_rules/list_item'

    ListItem.prototype.templateHelpers = function () {
      return {
        flag: (function (_this) {
          return function () {
            if (_this.model.get('review')) {
              return 'Review'
            } else {
              return ''
            }
          }
        })(this)
      }
    }

    return ListItem
  })(Backbone.Marionette.ItemView)
})
