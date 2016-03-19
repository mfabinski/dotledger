DotLedger.module('Models', function () {
  this.Payment = (function (superClass) {
    extend(Payment, superClass)

    function Payment () {
      return Payment.__super__.constructor.apply(this, arguments)
    }

    Payment.prototype.urlRoot = '/api/payments'

    return Payment
  })(this.Base)
})
