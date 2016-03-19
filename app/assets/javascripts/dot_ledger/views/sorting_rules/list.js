DotLedger.module('Views.SortingRules', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.template = 'sorting_rules/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.SortingRules.ListItem
    }

    List.prototype.childViewContainer = 'table tbody'

    List.prototype.initialize = function () {
      return DotLedger.Helpers.pagination(this, this.collection)
    }

    List.prototype.behaviors = {
      TagSelector: {},
      CategorySelector: {
        showNoneOption: false
      }
    }

    List.prototype.ui = {
      query: 'input[name=query]',
      category: 'select[name=category]',
      tags: 'select[name=tags]'
    }

    List.prototype.events = {
      'click button.search': 'search',
      'submit form': 'search'
    }

    List.prototype.onRender = function () {
      this.ui.query.val(this.model.get('query'))
    }

    List.prototype.search = function () {
      var data
      data = {}
      if (this.ui.query.val() !== '') {
        data['query'] = this.ui.query.val()
      }
      if (this.ui.category.val() !== '') {
        data['category_id'] = this.ui.category.val()
      }
      data['tag_ids'] = this.ui.tags.val()
      data['page'] = 1
      this.model.clear()
      this.model.set(_.compactObject(data))
      this.trigger('search', this.model)
      return false
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
