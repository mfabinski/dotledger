DotLedger.module('Views.Goals', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.tagName = 'div'

    ListItem.prototype.className = 'list-group-item'

    ListItem.prototype.template = 'goals/list_item'

    ListItem.prototype.ui = {
      amount: 'input[name=amount]',
      period: 'select[name=period]'
    }

    ListItem.prototype.initialize = function () {
      this.hasChanged = false
    }

    ListItem.prototype.onRender = function () {
      new DotLedger.Helpers.FormErrors(this.model, this.$el)
      DotLedger.on('options:change', this.renderGoalPeriods, this)
      this.ui.amount.val(this.model.get('amount'))
      this.renderGoalPeriods()
    }

    ListItem.prototype.renderGoalPeriods = function (data) {
      if (data == null) {
        data = DotLedgerData
      }
      this.ui.period.empty()
      _.each(data.goal_periods, (function (_this) {
        return function (option) {
          var $option
          $option = $("<option value='" + option + "'>" + option + '</option>')
          return _this.ui.period.append($option)
        }
      })(this))
      this.ui.period.val(this.model.get('period'))
    }

    ListItem.prototype.events = {
      'click button.save': 'save',
      'submit form': 'save',
      'change input': 'rerender',
      'change select': 'rerender'
    }

    ListItem.prototype.rerender = function () {
      this.update()
      this.render()
    }

    ListItem.prototype.update = function () {
      var data
      data = {
        amount: this.ui.amount.val(),
        period: this.ui.period.val()
      }
      this.model.set(data)
      if (this.model.hasChanged()) {
        this.hasChanged = true
      }
    }

    ListItem.prototype.save = function () {
      this.update()
      if (this.hasChanged) {
        this.model.save({}, {
          success: (function (_this) {
            return function () {
              _this.hasChanged = false
              return _this.trigger('save', _this.model)
            }
          })(this)
        })
      }
      return false
    }

    ListItem.prototype.templateHelpers = function () {
      return {
        monthAmount: (function (_this) {
          return function () {
            var amount
            amount = (function () {
              switch (this.model.get('period')) {
                case 'Month':
                  return 1 * this.model.get('amount')
                case 'Fortnight':
                  return 1 * this.model.get('amount') * 13.0 / 6
                case 'Week':
                  return 1 * this.model.get('amount') * 13.0 / 3
              }
            }).call(_this)
            return DotLedger.Helpers.Format.money(amount)
          }
        })(this)
      }
    }

    return ListItem
  })(Backbone.Marionette.ItemView)
})
