DotLedger.module('Views.Statistics.ActivityPerCategory', function () {
  this.ListItem = (function (superClass) {
    extend(ListItem, superClass)

    function ListItem () {
      return ListItem.__super__.constructor.apply(this, arguments)
    }

    ListItem.prototype.template = 'statistics/activity_per_category/list_item'

    ListItem.prototype.className = 'list-group-item'

    ListItem.prototype.events = {
      'click strong.name a': 'search'
    }

    ListItem.prototype.search = function () {
      var params
      params = {
        category_id: this.model.get('id'),
        date_from: this.model.collection.metadata.date_from,
        date_to: this.model.collection.metadata.date_to,
        page: 1
      }
      DotLedger.navigate.search(params, {
        trigger: true
      })
      return false
    }

    ListItem.prototype.templateHelpers = function () {
      return {
        progressWidth: (function (_this) {
          return function () {
            if (_this.model.get('goal') * 1 > 0) {
              return (_this.model.get('spent') * 1 / _this.model.get('goal') * 1) * 100
            } else {
              if (_this.templateHelpers().overGoal()) {
                return 100
              }
            }
          }
        })(this),
        overGoal: (function (_this) {
          return function () {
            return _this.model.get('spent') * 1 > _this.model.get('goal') * 1
          }
        })(this),
        progressClass: (function (_this) {
          return function () {
            if (_this.templateHelpers().overGoal()) {
              return 'progress-bar-danger'
            } else {
              return 'progress-bar-success'
            }
          }
        })(this)
      }
    }

    return ListItem
  })(Backbone.Marionette.ItemView)
})
