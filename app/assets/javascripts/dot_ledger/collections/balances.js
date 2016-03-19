DotLedger.module('Collections', function () {
  this.Balances = (function (superClass) {
    extend(Balances, superClass)

    function Balances () {
      return Balances.__super__.constructor.apply(this, arguments)
    }

    Balances.prototype.url = '/api/balances'

    Balances.prototype.model = DotLedger.Models.Balance

    return Balances
  })(this.Base)
})
