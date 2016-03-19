describe('DotLedger.Views.Transactions.Table', function () {
  var createView
  createView = function () {
    var collection, view
    collection = new DotLedger.Collections.Transactions
    view = new DotLedger.Views.Transactions.Table({
      collection: collection
    })
    return view
  }
  it('should be defined', function () {
    expect(DotLedger.Views.Transactions.Table).toBeDefined()
  })
  it('should use the correct template', function () {
    expect(DotLedger.Views.Transactions.Table).toUseTemplate('transactions/table')
  })
  return it('can be rendered', function () {
    var view
    view = createView()
    expect(view.render).not.toThrow()
  })
})
