DotLedger.module('Views.Payments', function () {
  this.List = (function (superClass) {
    extend(List, superClass)

    function List () {
      return List.__super__.constructor.apply(this, arguments)
    }

    List.prototype.template = 'payments/list'

    List.prototype.getChildView = function () {
      return DotLedger.Views.Payments.ListItem
    }

    List.prototype.templateHelpers = function () {
      return {
        paymentDates: (function (_this) {
          return function () {
            return _.sortBy(_.uniq(_.flatten(_this.collection.pluck('upcoming'))), function (date) {
              return DotLedger.Helpers.Format.unixTimestamp(date)
            })
          }
        })(this)
      }
    }

    List.prototype.attachHtml = function (collectionView, childView, index) {
      // FIXME: this is bad.
      return _.each(childView.model.get('upcoming'), function (date) {
        var date_id, view_string
        date_id = 'payment-date-' + (DotLedger.Helpers.Format.unixTimestamp(date))
        view_string = childView.el.outerHTML
        return collectionView.$('table#' + date_id + ' tbody').append(view_string)
      })
    }

    return List
  })(Backbone.Marionette.CompositeView)
})
