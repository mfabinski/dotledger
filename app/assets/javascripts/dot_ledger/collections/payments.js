DotLedger.module('Collections', function () {
  this.Payments = (function (superClass) {
    extend(Payments, superClass)

    function Payments () {
      return Payments.__super__.constructor.apply(this, arguments)
    }

    Payments.prototype.url = '/api/payments'

    Payments.prototype.model = DotLedger.Models.Payment

    return Payments
  })(this.Base)
})
