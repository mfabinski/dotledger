DotLedger.addInitializer(function () {
  $(document).ajaxStart(function () {
    return DotLedger.Helpers.Loading.start()
  })
  return $(document).ajaxStop(function () {
    return DotLedger.Helpers.Loading.stop()
  })
})
