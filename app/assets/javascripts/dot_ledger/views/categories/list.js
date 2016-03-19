DotLedger.module('Views.Categories', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.template = 'categories/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.Categories.ListItem
    }

    List.prototype.templateHelpers = function () {
      return {
        categoryTypes: (function (_this) {
          return function () {
            var types
            types = _.uniq(_this.collection.pluck('type'))
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
      list_id = 'category-type-' + (s.underscored(childView.model.get('type')))
      return collectionView.$('div#' + list_id).append(childView.el)
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
