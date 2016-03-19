DotLedger.module('Views.Statements', function () {
  this.Form = (function (superClass) {
    extend(Form, superClass)

    function Form () {
      return Form.__super__.constructor.apply(this, arguments)
    }

    Form.prototype.template = 'statements/form'

    Form.prototype.ui = {
      file: 'input[name=file]',
      button: 'button'
    }

    Form.prototype.events = {
      'click button.save': 'save',
      'submit form': 'save'
    }

    Form.prototype.onRender = function () {
      return new DotLedger.Helpers.FormErrors(this.model, this.$el)
    }

    Form.prototype.templateHelpers = function () {
      return {
        accountName: this.options.account.get('name'),
        accountId: this.options.account.get('id')
      }
    }

    Form.prototype.save = function () {
      var data, files
      this.ui.button.button('loading')

      // FIXME: this is a bit hacky
      data = new FormData()
      files = this.ui.file[0].files
      if (files.length > 0) {
        data.append('file', files[0])
      }
      data.append('account_id', this.options.account.get('id'))
      $.ajax({
        url: '/api/statements',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: (function (_this) {
          return function (statement) {
            var transaction_count
            _this.trigger('save')
            _this.ui.button.button('reset')
            transaction_count = DotLedger.Helpers.Format.pluralize(statement.transaction_count, 'transaction', 'transactions')
            DotLedger.Helpers.Notification.success(transaction_count + ' imported.')
            return DotLedger.Helpers.Loading.stop()
          }
        })(this),
        error: (function (_this) {
          return function (resp) {
            var errors
            if (resp.status === 422) {
              _this.ui.button.button('reset')
              errors = JSON.parse(resp.responseText).errors
              _this.model.validationError = errors
              _this.model.trigger('invalid', _this.model, errors, {
                validationError: errors
              })
            }
            return DotLedger.Helpers.Loading.stop()
          }
        })(this)
      })
      return false
    }

    return Form
  })(Backbone.Marionette.ItemView)
})
