DotLedger.module('Views.Reports.IncomeAndExpenses', function () {
  this.Show = (function (superClass) {
    extend(Show, superClass)

    function Show () {
      return Show.__super__.constructor.apply(this, arguments)
    }

    Show.prototype.template = 'reports/income_and_expenses/show'

    Show.prototype.regions = {
      filter: '#filter',
      report: '#report'
    }

    return Show
  })(Backbone.Marionette.LayoutView)
})
