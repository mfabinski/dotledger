DotLedger.module('Models', function () {
  this.Transaction = (function (superClass) {
    extend(Transaction, superClass)

    function Transaction () {
      return Transaction.__super__.constructor.apply(this, arguments)
    }

    Transaction.prototype.urlRoot = '/api/transaction'

    return Transaction
  })(this.Base)
})
