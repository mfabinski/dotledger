DotLedger.module('Views.Accounts', function () {
  this.Show = (function (superClass) {
    extend(Show, superClass)

    function Show () {
      return Show.__super__.constructor.apply(this, arguments)
    }

    Show.prototype.initialize = function (options) {
      this.tab = options.tab
    }

    Show.prototype.template = 'accounts/show'

    Show.prototype.regions = {
      transactions: '#transactions',
      graph: '#graph'
    }

    Show.prototype.onRender = function () {
      this.$el.find("a[data-tab-id='" + this.tab + "-transactions']").parent().addClass('active')
    }

    return Show
  })(Backbone.Marionette.LayoutView)
})
