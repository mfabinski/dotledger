DotLedger.module('Views.Goals', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.template = 'goals/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.Goals.ListItem
    }

    List.prototype.events = {
      'click button.save-all': 'saveAll'
    }

    List.prototype.templateHelpers = function () {
      return {
        categoryTypes: (function (_this) {
          return function () {
            var types
            types = _.uniq(_this.collection.pluck('category_type'))
            return _.map(types, function (type) {
              return {
                label: type,
                id: 'category-type-' + (s.underscored(type))
              }
            })
          }
        })(this)
      }
    }

    List.prototype.attachHtml = function (collectionView, childView, index) {
      var list_id
      list_id = 'category-type-' + (s.underscored(childView.model.get('category_type')))
      return collectionView.$('div#' + list_id).append(childView.el)
    }

    List.prototype.saveAll = function () {
      this.children.call('save')
      return DotLedger.Helpers.Notification.success('Goals have been saved.')
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
