DotLedger.module('Views.Accounts', function () {
  this.Form = (function (superClass) {
    extend(Form, superClass)

    function Form () {
      return Form.__super__.constructor.apply(this, arguments)
    }

    Form.prototype.template = 'accounts/form'

    Form.prototype.ui = {
      name: 'input[name=name]',
      number: 'input[name=number]',
      type: 'select[name=type]'
    }

    Form.prototype.onRender = function () {
      new DotLedger.Helpers.FormErrors(this.model, this.$el)
      DotLedger.on('options:change', this.renderAccountTypes, this)
      this.ui.name.val(this.model.get('name'))
      this.ui.number.val(this.model.get('number'))
      this.renderAccountTypes()
    }

    Form.prototype.renderAccountTypes = function (data) {
      if (data == null) {
        data = DotLedgerData
      }
      this.ui.type.empty()
      _.each(data.account_types, (function (_this) {
        return function (option) {
          var $option
          $option = $("<option value='" + option + "'>" + option + '</option>')
          return _this.ui.type.append($option)
        }
      })(this))
      this.ui.type.val(this.model.get('type'))
    }

    Form.prototype.events = {
      'click button.save': 'save',
      'submit form': 'save'
    }

    Form.prototype.templateHelpers = function () {
      return {
        pageHeader: (function (_this) {
          return function () {
            if (_this.model.has('name')) {
              return _this.model.get('name')
            } else {
              return 'New Account'
            }
          }
        })(this),
        cancelPath: (function (_this) {
          return function () {
            if (_this.model.get('id')) {
              return DotLedger.path.showAccount({
                id: _this.model.get('id')
              })
            } else {
              return DotLedger.path.root()
            }
          }
        })(this)
      }
    }

    Form.prototype.update = function () {
      var data
      data = {
        name: this.ui.name.val(),
        number: this.ui.number.val(),
        type: this.ui.type.val()
      }
      this.model.set(data)
    }

    Form.prototype.save = function () {
      this.update()
      this.model.save({}, {
        success: (function (_this) {
          return function () {
            DotLedger.accounts.fetch()
            return _this.trigger('save', _this.model)
          }
        })(this)
      })
      return false
    }

    return Form
  })(Backbone.Marionette.ItemView)
})
