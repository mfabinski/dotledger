DotLedger.module('Behaviors', function () {
  this.AccountsSelector = (function (superClass) {
    extend(AccountsSelector, superClass)

    function AccountsSelector () {
      AccountsSelector.__super__.constructor.apply(this, arguments)
    }

    AccountsSelector.prototype.initialize = function () {
      // FIXME: This is a hack to make it easier to test.
      if (this.view.options.accounts) {
        this.accounts = this.view.options.accounts
      } else {
        this.accounts = new DotLedger.Collections.Accounts()
        this.accounts.fetch()
      }
    }

    AccountsSelector.prototype.defaults = {
      showAnyOption: true,
      accountSelect: 'account',
      accountAttribute: 'account_id'
    }

    AccountsSelector.prototype.onRender = function () {
      this.accounts.on('sync', (function (_this) {
        return function () {
          return _this.renderAccounts()
        }
      })(this))
      this.renderAccounts()
    }

    AccountsSelector.prototype.renderAccounts = function () {
      var $accountSelect
      $accountSelect = this.view.ui[this.options.accountSelect]
      $accountSelect.empty()
      if (this.options.showAnyOption) {
        $accountSelect.append('<option value="">Any</option>')
      }
      this.accounts.each((function (_this) {
        return function (account) {
          var $option
          $option = $("<option value='" + (account.get('id')) + "'>" + (account.get('name')) + '</option>')
          return $accountSelect.append($option)
        }
      })(this))
      return $accountSelect.val(this.view.model.get(this.options.accountAttribute))
    }

    return AccountsSelector
  })(Marionette.Behavior)
})
