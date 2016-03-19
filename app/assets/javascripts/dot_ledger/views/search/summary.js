DotLedger.module('Views.Search', function () {
  this.Summary = (function (superClass) {
    extend(Summary, superClass)

    function Summary () {
      return Summary.__super__.constructor.apply(this, arguments)
    }

    Summary.prototype.template = 'search/summary'

    Summary.prototype.onRender = function () {
      this.collection.on('sync', this.render)
    }

    Summary.prototype.templateHelpers = function () {
      return {
        totalCount: (function (_this) {
          return function () {
            return _this.collection.pagination && _this.collection.pagination.total_items
          }
        })(this),
        totalSpent: (function (_this) {
          return function () {
            return _this.collection.metadata && _this.collection.metadata.total_spent
          }
        })(this),
        totalReceived: (function (_this) {
          return function () {
            return _this.collection.metadata && _this.collection.metadata.total_received
          }
        })(this)
      }
    }

    return Summary
  })(Backbone.Marionette.ItemView)
})
