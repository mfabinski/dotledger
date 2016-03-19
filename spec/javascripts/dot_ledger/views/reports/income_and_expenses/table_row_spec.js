describe('DotLedger.Views.Reports.IncomeAndExpenses.TableRow', function () {
  var createView, metadata, reveivedBalance, spentBalance
  spentBalance = function () {
    var model
    model = new Backbone.Model
    return model.set({
      id: 10,
      name: 'Bank Charges',
      net: '-27.23',
      received: '0.0',
      spent: '27.23',
      type: 'Essential'
    })
  }
  reveivedBalance = function () {
    var model
    model = new Backbone.Model
    return model.set({
      id: 10,
      name: 'Wages',
      net: '5423.23',
      received: '5423.23',
      spent: '0',
      type: 'Income'
    })
  }
  metadata = {
    date_from: '2014-05-10',
    date_to: '2014-05-17'
  }
  createView = function (model) {
    if (model == null) {
      model = new Backbone.Model
    }
    return new DotLedger.Views.Reports.IncomeAndExpenses.TableRow({
      model: model,
      metadata: metadata
    })
  }
  it('should be defined', function () {
    expect(DotLedger.Views.Reports.IncomeAndExpenses.TableRow).toBeDefined()
  })
  it('should use the correct template', function () {
    expect(DotLedger.Views.Reports.IncomeAndExpenses.TableRow).toUseTemplate('reports/income_and_expenses/table_row')
  })
  it('can be rendered', function () {
    var view
    view = createView()
    expect(view.render).not.toThrow()
  })
  describe('received', function () {
    it('renders the category', function () {
      var view
      view = createView(reveivedBalance()).render()
      expect(view.$el).toContainText('Wages')
    })
    return it('renders the amount', function () {
      var view
      view = createView(reveivedBalance()).render()
      expect(view.$el).toContainText('$5,423.23')
    })
  })
  return describe('spent', function () {
    it('renders the category', function () {
      var view
      view = createView(spentBalance()).render()
      expect(view.$el).toContainText('Bank Charges')
    })
    return it('renders the amount', function () {
      var view
      view = createView(spentBalance()).render()
      expect(view.$el).toContainText('$27.23')
    })
  })
})
