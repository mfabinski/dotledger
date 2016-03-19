DotLedger.module('Views.Application', function () {
  this.Pagination = (function (superClass) {
    extend(Pagination, superClass)

    function Pagination () {
      return Pagination.__super__.constructor.apply(this, arguments)
    }

    Pagination.prototype.template = 'application/pagination'

    Pagination.prototype.events = {
      'click .next': function () {
        if (this.collection.pagination && (this.collection.pagination.next_page != null)) {
          this.collection.nextPage()
        }
        return false
      },
      'click .previous': function () {
        if (this.collection.pagination && (this.collection.pagination.previous_page != null)) {
          this.collection.previousPage()
        }
        return false
      }
    }

    Pagination.prototype.initialize = function () {
      this.collection.on('reset sync', (function (_this) {
        return function () {
          return _this.render()
        }
      })(this))
      return this
    }

    Pagination.prototype.templateHelpers = function () {
      return {
        pagination: this.collection.pagination,
        disablePrevious: (function (_this) {
          return function () {
            if (_this.collection.pagination && (_this.collection.pagination.previous_page == null)) {
              return 'disabled'
            }
          }
        })(this),
        disableNext: (function (_this) {
          return function () {
            if (_this.collection.pagination && (_this.collection.pagination.next_page == null)) {
              return 'disabled'
            }
          }
        })(this)
      }
    }

    return Pagination
  })(Backbone.Marionette.ItemView)
})
