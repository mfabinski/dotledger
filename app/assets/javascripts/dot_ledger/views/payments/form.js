DotLedger.module('Views.Payments', function () {
  this.Form = (function (superClass) {
    extend(Form, superClass)

    function Form () {
      return Form.__super__.constructor.apply(this, arguments)
    }

    Form.prototype.template = 'payments/form'

    Form.prototype.behaviors = {
      CategorySelector: {
        showAnyOption: false,
        showNoneOption: false
      }
    }

    Form.prototype.ui = {
      name: 'input[name=name]',
      amount: 'input[name=amount]',
      category: 'select[name=category]',
      date: 'input[name=date]',
      repeat: 'input[name=repeat]',
      repeat_interval: 'input[name=repeat_interval]',
      repeat_period: 'select[name=repeat_period]',
      type: 'select[name=type]'
    }

    Form.prototype.onRender = function () {
      new DotLedger.Helpers.FormErrors(this.model, this.$el)
      DotLedger.on('options:change', this.renderPaymentTypes, this)
      DotLedger.on('options:change', this.renderPaymentPeriods, this)
      this.ui.name.val(this.model.get('name'))
      this.ui.amount.val(this.model.get('amount'))
      this.ui.date.val(this.model.get('date'))
      this.ui.date.datepicker({
        format: 'yyyy-mm-dd'
      })
      this.ui.repeat.prop('checked', this.model.get('repeat'))
      this.ui.repeat_interval.val(this.model.get('repeat_interval'))
      this.ui.repeat_period.val(this.model.get('repeat_period'))
      this.renderPaymentTypes()
      this.renderPaymentPeriods()
      this.toggleRepeat()
    }

    Form.prototype.renderPaymentTypes = function (data) {
      if (data == null) {
        data = DotLedgerData
      }
      this.ui.type.empty()
      _.each(data.payment_types, (function (_this) {
        return function (option) {
          var $option
          $option = $("<option value='" + option + "'>" + option + '</option>')
          return _this.ui.type.append($option)
        }
      })(this))
      this.ui.type.val(this.model.get('type'))
    }

    Form.prototype.renderPaymentPeriods = function (data) {
      if (data == null) {
        data = DotLedgerData
      }
      this.ui.repeat_period.empty()
      _.each(data.payment_periods, (function (_this) {
        return function (option) {
          var $option
          $option = $("<option value='" + option + "'>" + option + '(s)</option>')
          return _this.ui.repeat_period.append($option)
        }
      })(this))
      this.ui.repeat_period.val(this.model.get('repeat_period'))
    }

    Form.prototype.events = {
      'click button.save': 'save',
      'submit form': 'save',
      'change input[name=repeat]': 'toggleRepeat'
    }

    Form.prototype.templateHelpers = function () {
      return {
        pageHeader: (function (_this) {
          return function () {
            if (_this.model.has('name')) {
              return _this.model.get('name')
            } else {
              return 'New Payment'
            }
          }
        })(this)
      }
    }

    Form.prototype.toggleRepeat = function () {
      if (this.ui.repeat.prop('checked')) {
        this.ui.repeat_period.parents('.form-group').show()
        this.ui.repeat_interval.parents('.form-group').show()
      } else {
        this.ui.repeat_period.parents('.form-group').hide()
        this.ui.repeat_interval.parents('.form-group').hide()
      }
    }

    Form.prototype.update = function () {
      var data
      data = {
        name: this.ui.name.val(),
        amount: this.ui.amount.val(),
        category_id: this.ui.category.val(),
        date: this.ui.date.val(),
        repeat: this.ui.repeat.prop('checked'),
        repeat_interval: this.ui.repeat_interval.val(),
        repeat_period: this.ui.repeat_period.val(),
        type: this.ui.type.val()
      }
      this.model.set(data)
    }

    Form.prototype.save = function () {
      this.update()
      this.model.save({}, {
        success: (function (_this) {
          return function () {
            return _this.trigger('save', _this.model)
          }
        })(this)
      })
      return false
    }

    return Form
  })(Backbone.Marionette.ItemView)
})
