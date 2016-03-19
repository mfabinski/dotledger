DotLedger.module('Views.Accounts', function () {
  this.BalanceGraph = (function (superClass) {
    extend(BalanceGraph, superClass)

    function BalanceGraph () {
      return BalanceGraph.__super__.constructor.apply(this, arguments)
    }

    BalanceGraph.prototype.tagName = 'div'

    BalanceGraph.prototype.template = 'accounts/balance_graph'

    BalanceGraph.prototype.initialize = function () {
      this.balances = new DotLedger.Collections.Balances()
    }

    BalanceGraph.prototype.fetchBalances = function () {
      this.balances.fetch({
        data: {
          account_id: this.model.id,
          date_from: DotLedger.Helpers.Format.queryDate(moment().subtract(this.options.days, 'days')),
          date_to: DotLedger.Helpers.Format.queryDate()
        }
      })
    }

    BalanceGraph.prototype.ui = {
      balanceGraph: '.balance .graph',
      balanceTooltip: '.balance .tooltip',
      balanceTooltipInner: '.balance .tooltip .tooltip-inner'
    }

    BalanceGraph.prototype.balanceGraphData = function () {
      return [
        {
          color: 'rgb(111, 202, 194)',
          data: this.balances.map(function (balance) {
            return [DotLedger.Helpers.Format.unixMilliTimestamp(balance.get('date')), balance.get('balance')]
          })
        }
      ]
    }

    BalanceGraph.prototype.balanceGraphOptions = function () {
      return {
        series: {
          shadowSize: 1,
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: 'rgba(111, 202, 194, 0.6)'
          }
        },
        grid: {
          borderWidth: 0,
          hoverable: true
        },
        points: {
          radius: 2
        },
        xaxis: {
          mode: 'time',
          timeformat: '%e %b',
          tickLength: 0
        },
        yaxis: {
          tickColor: 'rgba(238, 238, 238, 1)'
        }
      }
    }

    BalanceGraph.prototype.renderBalanceGraph = function () {
      if (this.isRendered) {
        this.graph = $.plot(this.ui.balanceGraph, this.balanceGraphData(), this.balanceGraphOptions())
        this.ui.balanceGraph.bind('plothover', (function (_this) {
          return function (event, pos, item) {
            var balance
            if (item) {
              balance = DotLedger.Helpers.Format.money(item.datapoint[1])
              _this.ui.balanceTooltipInner.html(balance)
              return _this.ui.balanceTooltip.css({
                top: item.pageY - 35,
                left: item.pageX - 40
              }).addClass('in')
            } else {
              return _this.ui.balanceTooltip.removeClass('in')
            }
          }
        })(this))
      }
    }

    BalanceGraph.prototype.onRender = function () {
      this.balances.on('sync', (function (_this) {
        return function () {
          return _this.renderBalanceGraph()
        }
      })(this))
      this.fetchBalances()
      return _.defer((function (_this) {
        return function () {
          return _this.renderBalanceGraph()
        }
      })(this))
    }

    return BalanceGraph
  })(Backbone.Marionette.ItemView)
})
