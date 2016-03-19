DotLedger.module('Views.Application', function () {
  this.Dashboard = (function (superClass) {
    extend(Dashboard, superClass)

    function Dashboard () {
      return Dashboard.__super__.constructor.apply(this, arguments)
    }

    Dashboard.prototype.template = 'application/dashboard'

    Dashboard.prototype.regions = {
      panelA: '#panel-a',
      panelB: '#panel-b',
      panelC: '#panel-c',
      panelD: '#panel-d'
    }

    return Dashboard
  })(Backbone.Marionette.LayoutView)
})
