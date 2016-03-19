describe('DotLedger.Views.Accounts.Form', function () {
  var createView
  createView = function (model) {
    var view
    if (model == null) {
      model = new DotLedger.Models.Account()
    }
    view = new DotLedger.Views.Accounts.Form({
      model: model
    })
    return view
  }
  it('should be defined', function () {
    expect(DotLedger.Views.Accounts.Form).toBeDefined()
  })
  it('should use the correct template', function () {
    expect(DotLedger.Views.Accounts.Form).toUseTemplate('accounts/form')
  })
  it('can be rendered', function () {
    var view
    view = createView()
    expect(view.render).not.toThrow()
  })
  it('renders the form fields', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('input[name=name]')
    expect(view.$el).toContainElement('input[name=number]')
    expect(view.$el).toContainElement('select[name=type]')
    expect(view.$el).toContainElement('select[name=type] option[value=Cheque]')
    expect(view.$el).toContainElement('select[name=type] option[value=Savings]')
    expect(view.$el).toContainElement('select[name=type] option[value="Credit Card"]')
    expect(view.$el).toContainElement('select[name=type] option[value=Other]')
  })
  it('renders the heading for new account', function () {
    var view
    view = createView().render()
    expect(view.$el).toHaveText(/New Account/)
  })
  it('renders the heading for existing account', function () {
    var model, view
    model = new DotLedger.Models.Account({
      name: 'Some Account'
    })
    view = createView(model).render()
    expect(view.$el).toHaveText(/Some Account/)
  })
  it('renders the cancel link for new account', function () {
    var view
    view = createView().render()
    expect(view.$el).toContainElement('a[href="/"]')
  })
  it('renders the cancel link for existing account', function () {
    var model, view
    model = new DotLedger.Models.Account({
      id: 123
    })
    view = createView(model).render()
    expect(view.$el).toContainElement('a[href="/accounts/123"]')
  })
  it('should set the values on the model when update is called', function () {
    var model, view
    model = new DotLedger.Models.Account()
    view = createView(model).render()
    view.$el.find('input[name=name]').val('Eftpos')
    view.$el.find('input[name=number]').val('12-1234-1234567-123')
    view.$el.find('select[name=type]').val('Cheque')
    spyOn(model, 'set')
    view.update()
    expect(model.set).toHaveBeenCalledWith({
      name: 'Eftpos',
      number: '12-1234-1234567-123',
      type: 'Cheque'
    })
  })
  return it('renders the form fields with the model values', function () {
    var model, view
    model = new DotLedger.Models.Account({
      name: 'Account',
      number: '12-1234-1234567-123',
      type: 'Savings'
    })
    view = createView(model).render()
    expect(view.$el.find('input[name=name]')).toHaveValue('Account')
    expect(view.$el.find('input[name=number]')).toHaveValue('12-1234-1234567-123')
    expect(view.$el.find('select[name=type]')).toHaveValue('Savings')
  })
})
