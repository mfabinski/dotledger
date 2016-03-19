DotLedger.module('Views.Reports.IncomeAndExpenses', function () {
  this.Filter = (function (superClass) {
    extend(Filter, superClass)

    function Filter () {
      return Filter.__super__.constructor.apply(this, arguments)
    }

    Filter.prototype.template = 'reports/income_and_expenses/filter'

    Filter.prototype.className = 'nav nav-pills nav-justified'

    Filter.prototype.tagName = 'ul'

    Filter.prototype.events = {
      'click .period a': 'clickPeriod'
    }

    Filter.prototype.onRender = function () {
      this.$el.find('.period.period-' + (this.model.get('period')) + '-days').addClass('active')
    }

    Filter.prototype.clickPeriod = function (event) {
      this.model.set('period', $(event.target).data('period'))
      return false
    }

    return Filter
  })(Backbone.Marionette.ItemView)
})
