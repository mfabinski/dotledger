DotLedger.module('Views.Reports.IncomeAndExpenses', function () {
  this.Table = (function (superClass) {
    extend(Table, superClass)

    function Table () {
      return Table.__super__.constructor.apply(this, arguments)
    }

    Table.prototype.template = 'reports/income_and_expenses/table'

    Table.prototype.getChildView = function () {
      return DotLedger.Views.Reports.IncomeAndExpenses.TableRow
    }

    Table.prototype.childViewContainer = 'tbody'

    Table.prototype.childViewOptions = function (model, index) {
      return {
        metadata: this.collection.metadata
      }
    }

    Table.prototype.templateHelpers = function () {
      return {
        spentAmountTotal: (function (_this) {
          return function () {
            return DotLedger.Helpers.Format.money(_this.collection.metadata.total_spent)
          }
        })(this),
        receivedAmountTotal: (function (_this) {
          return function () {
            return DotLedger.Helpers.Format.money(_this.collection.metadata.total_received)
          }
        })(this)
      }
    }

    return Table
  })(Backbone.Marionette.CompositeView)
})
