DotLedger.addInitializer(function (options) {
  this.router = new DotLedger.Routers.App()
  this.router.on('route', function () {
    return DotLedger.Helpers.Notification.empty()
  })
  return Backbone.history.start({
    pushState: true
  })
})
