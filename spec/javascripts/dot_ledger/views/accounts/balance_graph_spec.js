$.plot = $.noop

describe('DotLedger.Views.Accounts.BalanceGraph', function () {
  var createView
  createView = function () {
    var account, balances, view
    account = new DotLedger.Models.Account({
      id: 1
    })
    balances = new DotLedger.Collections.Balances
    view = new DotLedger.Views.Accounts.BalanceGraph({
      balances: balances,
      model: account
    })
    return view
  }
  it('should be defined', function () {
    expect(DotLedger.Views.Accounts.BalanceGraph).toBeDefined()
  })
  it('should use the correct template', function () {
    expect(DotLedger.Views.Accounts.BalanceGraph).toUseTemplate('accounts/balance_graph')
  })
  return it('can be rendered', function () {
    var view
    view = createView()
    expect(view.render).not.toThrow()
  })
})
