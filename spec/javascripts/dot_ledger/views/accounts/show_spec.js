describe('DotLedger.Views.Accounts.Show', function () {
  var createView
  createView = function () {
    var balances, model, view
    balances = new DotLedger.Collections.Balances
    model = new DotLedger.Models.Account({
      name: 'Some Account',
      type: 'Savings',
      number: '123',
      id: 1,
      unsorted_transaction_count: 5,
      sorted_transaction_count: 10,
      review_transaction_count: 15,
      balance: 123.45,
      updated_at: '2013-01-01T01:00:00Z'
    })
    view = new DotLedger.Views.Accounts.Show({
      model: model,
      balances: balances
    })
    return view
  }
  it('should be defined', function () {
    expect(DotLedger.Views.Accounts.Show).toBeDefined()
  })
  it('should use the correct template', function () {
    expect(DotLedger.Views.Accounts.Show).toUseTemplate('accounts/show')
  })
  it('can be rendered', function () {
    var view
    view = createView()
    expect(view.render).not.toThrow()
  })
  it('renders the account name', function () {
    var view
    view = createView().render()
    expect(view.$el).toHaveText(/Some Account/)
  })
  it('renders the account type', function () {
    var view
    view = createView().render()
    expect(view.$el).toHaveText(/Savings/)
  })
  it('renders the account number', function () {
    var view
    view = createView().render()
    expect(view.$el).toHaveText(/123/)
  })
  it('renders the updated at time', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('time[datetime="2013-01-01T01:00:00Z"]')
  })
  it('renders the account balance', function () {
    var view
    view = createView().render()
    expect(view.$el).toHaveText(/\$123.45/)
  })
  it('renders the account edit link', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('a[href="/accounts/1/edit"]')
  })
  it('renders the statement import link', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('a[href="/accounts/1/import"]')
  })
  it('renders the sorted transactions tab link', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('a[href="/accounts/1?tab=sorted&page=1"]')
  })
  it('renders the sorted transactions tab label with count', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainText(/Sorted 10/)
  })
  it('renders the review transactions tab link', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('a[href="/accounts/1?tab=review&page=1"]')
  })
  it('renders the unsorted transactions tab label with count', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainText(/Unsorted 5/)
  })
  it('renders the unsorted transactions tab link', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('a[href="/accounts/1?tab=unsorted&page=1"]')
  })
  return it('renders the review transactions tab label with count', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainText(/Review 15/)
  })
})
