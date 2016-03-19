DotLedger.module('Views.Statistics.ActivityPerCategory', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.childViewContainer = '.list-group'

    List.prototype.className = 'panel panel-default'

    List.prototype.template = 'statistics/activity_per_category/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.Statistics.ActivityPerCategory.ListItem
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
