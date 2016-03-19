DotLedger.addInitializer(function (options) {
  this.footer = new DotLedger.Views.Application.Footer()
  return DotLedger.footerRegion.show(this.footer)
})
