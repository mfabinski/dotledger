DotLedger.module('Models', function () {
  this.Balance = (function (superClass) {
    extend(Balance, superClass)

    function Balance () {
      return Balance.__super__.constructor.apply(this, arguments)
    }

    Balance.prototype.urlRoot = '/api/balances'

    return Balance
  })(this.Base)
})
