DotLedger.module('Views.Accounts', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.className = 'panel panel-default'

    List.prototype.template = 'accounts/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.Accounts.ListItem
    }

    List.prototype.childViewContainer = '.list-group'

    List.prototype.templateHelpers = function () {
      return {
        totalCash: (function (_this) {
          return function () {
            var balances
            balances = _this.collection.map(function (account) {
              if (account.get('balance') > 0) {
                return account.get('balance')
              } else {
                return 0
              }
            })
            return _.reduce(balances, (function (b, total) {
              return parseFloat(total) + parseFloat(b)
            }), 0)
          }
        })(this),
        totalDebt: (function (_this) {
          return function () {
            var balances
            balances = _this.collection.map(function (account) {
              if (account.get('balance') < 0) {
                return account.get('balance')
              } else {
                return 0
              }
            })
            return -_.reduce(balances, (function (b, total) {
              return parseFloat(total) + parseFloat(b)
            }), 0)
          }
        })(this)
      }
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
