DotLedger.module('Collections', function () {
  this.Transactions = (function (superClass) {
    extend(Transactions, superClass)

    function Transactions () {
      return Transactions.__super__.constructor.apply(this, arguments)
    }

    Transactions.prototype.url = '/api/transactions'

    Transactions.prototype.model = DotLedger.Models.Transaction

    return Transactions
  })(this.Base)
})
