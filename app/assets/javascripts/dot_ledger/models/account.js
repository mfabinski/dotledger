DotLedger.module('Models', function () {
  this.Account = (function (superClass) {
    extend(Account, superClass)

    function Account () {
      return Account.__super__.constructor.apply(this, arguments)
    }

    Account.prototype.urlRoot = '/api/accounts'

    return Account
  })(this.Base)
})
