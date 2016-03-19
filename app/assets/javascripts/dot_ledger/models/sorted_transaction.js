DotLedger.module('Models', function () {
  this.SortedTransaction = (function (superClass) {
    extend(SortedTransaction, superClass)

    function SortedTransaction () {
      return SortedTransaction.__super__.constructor.apply(this, arguments)
    }

    SortedTransaction.prototype.urlRoot = '/api/sorted_transactions'

    return SortedTransaction
  })(this.Base)
})
