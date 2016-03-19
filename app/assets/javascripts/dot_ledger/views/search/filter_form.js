DotLedger.module('Views.Search', function () {
  this.FilterForm = (function (superClass) {
    extend(FilterForm, superClass)

    function FilterForm () {
      return FilterForm.__super__.constructor.apply(this, arguments)
    }

    FilterForm.prototype.template = 'search/filter_form'

    FilterForm.prototype.behaviors = {
      TagSelector: {},
      CategorySelector: {},
      AccountsSelector: {}
    }

    FilterForm.prototype.ui = {
      query: 'input[name=query]',
      category: 'select[name=category]',
      date_from: 'input[name=date_from]',
      date_to: 'input[name=date_to]',
      tags: 'select[name=tags]',
      account: 'select[name=account]'
    }

    FilterForm.prototype.events = {
      'click button.search': 'search',
      'submit form': 'search'
    }

    FilterForm.prototype.onRender = function () {
      this.ui.query.val(this.model.get('query'))
      this.ui.date_from.val(this.model.get('date_from'))
      this.ui.date_to.val(this.model.get('date_to'))
      this.ui.date_from.datepicker({
        format: 'yyyy-mm-dd'
      })
      this.ui.date_to.datepicker({
        format: 'yyyy-mm-dd'
      })
    }

    FilterForm.prototype.search = function () {
      var data
      data = {}
      data['query'] = this.ui.query.val()
      if (this.ui.category.val()) {
        if (this.ui.category.val() > 0) {
          data['category_id'] = this.ui.category.val()
        } else {
          data['unsorted'] = 'true'
        }
      }
      data['date_from'] = this.ui.date_from.val()
      data['date_to'] = this.ui.date_to.val()
      data['tag_ids'] = this.ui.tags.val()
      data['account_id'] = this.ui.account.val()
      data['page'] = 1
      this.model.clear()
      this.model.set(_.compactObject(data))
      this.trigger('search', this.model)
      return false
    }

    return FilterForm
  })(Backbone.Marionette.ItemView)
})
