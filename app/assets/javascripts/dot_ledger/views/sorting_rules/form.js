DotLedger.module('Views.SortingRules', function () {
  this.Form = (function (superClass) {
    extend(Form, superClass)

    function Form () {
      return Form.__super__.constructor.apply(this, arguments)
    }

    Form.prototype.template = 'sorting_rules/form'

    Form.prototype.behaviors = {
      CategorySelector: {
        showAnyOption: false,
        showNoneOption: false
      }
    }

    Form.prototype.ui = {
      name: 'input[name=name]',
      contains: 'input[name=contains]',
      category: 'select[name=category]',
      review: 'select[name=review]',
      tags: 'input[name=tags]'
    }

    Form.prototype.onRender = function () {
      new DotLedger.Helpers.FormErrors(this.model, this.$el)
      this.ui.name.val(this.model.get('name'))
      this.ui.contains.val(this.model.get('contains'))
      this.ui.review.val('' + (this.model.get('review'))).change()
      this.ui.tags.val((this.model.get('tag_list') || []).join(', '))
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
              return 'New Sorting Rule'
            }
          }
        })(this)
      }
    }

    Form.prototype.update = function () {
      var data
      data = {
        name: this.ui.name.val(),
        contains: this.ui.contains.val(),
        category_id: this.ui.category.val(),
        review: this.ui.review.val(),
        tags: this.ui.tags.val()
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
