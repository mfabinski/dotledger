DotLedger.addInitializer(function (options) {
  return $.ajax({
    url: '/api/options',
    type: 'GET',
    success: function (response) {
      window.DotLedgerData = response
      return DotLedger.trigger('options:change', response)
    }
  })
})
