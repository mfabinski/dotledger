DotLedger.module('Collections', function () {
  this.Accounts = (function (superClass) {
    extend(Accounts, superClass)

    function Accounts () {
      return Accounts.__super__.constructor.apply(this, arguments)
    }

    Accounts.prototype.url = '/api/accounts'

    Accounts.prototype.model = DotLedger.Models.Account

    return Accounts
  })(this.Base)
})
