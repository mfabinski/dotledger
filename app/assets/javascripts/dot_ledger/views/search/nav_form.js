DotLedger.module('Views.Search', function () {
  this.NavForm = (function (superClass) {
    extend(NavForm, superClass)

    function NavForm () {
      return NavForm.__super__.constructor.apply(this, arguments)
    }

    NavForm.prototype.template = 'search/nav_form'

    NavForm.prototype.ui = {
      query: 'input[name=query]'
    }

    NavForm.prototype.events = {
      'click button.search': 'search',
      'submit form': 'search'
    }

    NavForm.prototype.search = function () {
      var data
      data = {}
      if (this.ui.query.val() !== '') {
        data['query'] = this.ui.query.val()
      }
      data['page'] = 1
      this.model.clear()
      this.model.set(data)
      this.trigger('search', this.model)

      // FIXME: This is yuck.
      DotLedger.navigate.search(this.model.attributes, {
        trigger: true
      })
      return false
    }

    return NavForm
  })(Backbone.Marionette.ItemView)
})
