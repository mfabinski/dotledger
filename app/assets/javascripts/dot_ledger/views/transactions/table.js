DotLedger.module('Views.Transactions', function () {
  this.Table = (function (superClass) {
    extend(Table, superClass)

    function Table () {
      return Table.__super__.constructor.apply(this, arguments)
    }

    Table.prototype.template = 'transactions/table'

    Table.prototype.childViewContainer = 'tbody'

    Table.prototype.getChildView = function () {
      return DotLedger.Views.Transactions.TableRow
    }

    Table.prototype.initialize = function () {
      return DotLedger.Helpers.pagination(this, this.collection)
    }

    return Table
  })(Backbone.Marionette.CompositeView)
})
