DotLedger.module('Views.Statements', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.template = 'statements/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.Statements.ListItem
    }

    List.prototype.childViewContainer = 'table tbody'

    List.prototype.initialize = function () {
      return DotLedger.Helpers.pagination(this, this.collection)
    }

    List.prototype.templateHelpers = function () {
      return {
        accountName: (function (_this) {
          return function () {
            return _this.options.account.get('name')
          }
        })(this),
        accountID: (function (_this) {
          return function () {
            return _this.options.account.get('id')
          }
        })(this)
      }
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
