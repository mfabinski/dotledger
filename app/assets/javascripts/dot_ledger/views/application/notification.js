DotLedger.module('Views.Application', function () {
  this.Notification = (function (superClass) {
    extend(Notification, superClass)

    function Notification () {
      return Notification.__super__.constructor.apply(this, arguments)
    }

    Notification.prototype.template = 'application/notification'

    Notification.prototype.ui = {
      close: 'button.close'
    }

    Notification.prototype.events = {
      'click button.close': 'remove'
    }

    return Notification
  })(Backbone.Marionette.LayoutView)
})
