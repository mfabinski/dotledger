DotLedger.module('Views.Payments', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.tagName = 'tr'

    ListItem.prototype.template = 'payments/list_item'

    ListItem.prototype.templateHelpers = function () {
      return {
        spendAmount: (function (_this) {
          return function () {
            if (_this.model.get('type') === 'Spend') {
              return DotLedger.Helpers.Format.money(_this.model.get('amount'))
            }
          }
        })(this),
        receiveAmount: (function (_this) {
          return function () {
            if (_this.model.get('type') === 'Receive') {
              return DotLedger.Helpers.Format.money(_this.model.get('amount'))
            }
          }
        })(this)
      }
    }

    return ListItem
  })(Backbone.Marionette.ItemView)
})
