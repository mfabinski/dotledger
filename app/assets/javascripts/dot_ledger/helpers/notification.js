DotLedger.module('Helpers', function () {
  var i, len, level, notificationView, ref, results
  notificationView = function (message, class_name) {
    var model
    model = new Backbone.Model({
      message: message
    })
    return new DotLedger.Views.Application.Notification({
      model: model,
      className: 'alert alert-' + class_name + ' alert-dismissable'
    })
  }
  this.Notification = {
    levels: ['danger', 'success', 'info', 'warning'],
    empty: (function (_this) {
      return function () {
        return _this.app.notificationsRegion.empty()
      }
    })(this)
  }
  ref = this.Notification.levels
  results = []
  for (i = 0, len = ref.length; i < len; i++) {
    level = ref[i]
    results.push((function (_this) {
      return function (level) {
        return _this.Notification[level] = function (message) {
          var view
          view = notificationView(message, level)
          _this.app.notificationsRegion.show(view)
          return window.scroll(0, 0)
        }
      }
    })(this)(level))
  }
  return results
})
