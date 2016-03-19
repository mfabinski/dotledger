DotLedger.module('Views.SortedTransactions', function () {
  this.Form = (function (superClass) {
    extend(Form, superClass)

    function Form () {
      return Form.__super__.constructor.apply(this, arguments)
    }

    Form.prototype.template = 'sorted_transactions/form'

    Form.prototype.className = 'modal'

    Form.prototype.behaviors = {
      CategorySelector: {
        showAnyOption: false,
        showNoneOption: false
      }
    }

    Form.prototype.ui = {
      name: 'input[name=name]',
      category: 'select[name=category]',
      tags: 'input[name=tags]',
      note: 'textarea[name=note]'
    }

    Form.prototype.onRender = function () {
      new DotLedger.Helpers.FormErrors(this.model, this.$el)
      this.ui.name.val(this.model.get('name') || this.options.transaction.get('search'))
      this.ui.tags.val((this.model.get('tag_list') || []).join(', '))
      this.ui.note.val(this.model.get('note'))
    }

    Form.prototype.events = {
      'click button.save': 'save',
      'submit form': 'save'
    }

    Form.prototype.update = function () {
      var data
      data = {
        name: this.ui.name.val(),
        category_id: this.ui.category.val(),
        account_id: this.options.transaction.get('account_id'),
        transaction_id: this.options.transaction.get('id'),
        tags: this.ui.tags.val(),
        note: this.ui.note.val()
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
