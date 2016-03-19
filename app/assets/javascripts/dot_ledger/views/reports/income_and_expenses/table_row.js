DotLedger.module('Views.Reports.IncomeAndExpenses', function () {
  this.TableRow = (function (superClass) {
    extend(TableRow, superClass)

    function TableRow () {
      return TableRow.__super__.constructor.apply(this, arguments)
    }

    TableRow.prototype.template = 'reports/income_and_expenses/table_row'

    TableRow.prototype.tagName = 'tr'

    TableRow.prototype.templateHelpers = function () {
      return {
        searchLinkHref: (function (_this) {
          return function () {
            var params
            params = {
              date_from: _this.options.metadata.date_from,
              date_to: _this.options.metadata.date_to,
              category_id: _this.model.get('id'),
              page: 1
            }
            return DotLedger.path.search(params)
          }
        })(this),
        spentAmount: (function (_this) {
          return function () {
            if (_this.model.get('spent') !== '0.0') {
              return DotLedger.Helpers.Format.money(_this.model.get('spent'))
            }
          }
        })(this),
        receivedAmount: (function (_this) {
          return function () {
            if (_this.model.get('received') !== '0.0') {
              return DotLedger.Helpers.Format.money(_this.model.get('received'))
            }
          }
        })(this)
      }
    }

    return TableRow
  })(Backbone.Marionette.ItemView)
})
