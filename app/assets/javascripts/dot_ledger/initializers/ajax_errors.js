DotLedger.addInitializer(function () {
  return $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
    if (jqXHR.status === 0) {
      return DotLedger.Helpers.Notification.danger('Could not connect to server.')
    }
  })
})
