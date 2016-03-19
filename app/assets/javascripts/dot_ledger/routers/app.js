DotLedger.module('Routers', function () {
  var routes
  routes = {
    // Root
    '': 'root',

    // Accounts
    'accounts/new': 'newAccount',
    'accounts/:id/sort': 'sortAccount',
    'accounts/:id/edit': 'editAccount',
    'accounts/:id/import': 'newStatement',
    'accounts/:id/statements': 'listStatements',
    'accounts/:id': 'showAccount',

    // Categories
    'categories': 'listCategories',
    'categories/new': 'newCategory',
    'categories/:id/edit': 'editCategory',

    // Sorting Rules
    'sorting-rules/new': 'newSortingRule',
    'sorting-rules/:id/edit': 'editSortingRule',
    'sorting-rules': 'listSortingRules',

    // Goals
    'goals': 'listGoals',

    // Payments
    'payments': 'listPayments',
    'payments/new': 'newPayment',
    'payments/:id/edit': 'editPayment',

    // Search
    'search': 'search',

    // Reports
    'reports/income-and-expenses': 'incomeAndExpenses',

    // Not Found
    '*path': 'notFound'
  }
  DotLedger.path = DotLedger.Helpers.Path.routesToPathHelpers(routes)
  DotLedger.navigate = DotLedger.Helpers.Path.routesToNavigateHelpers(routes)
  this.App = (function (superClass) {
    extend(App, superClass)

    function App () {
      return App.__super__.constructor.apply(this, arguments)
    }

    App.prototype.routes = routes

    App.prototype.root = function () {
      var accounts, category_statistics, dashboard
      DotLedger.title('Dashboard')
      dashboard = new DotLedger.Views.Application.Dashboard()
      DotLedger.mainRegion.show(dashboard)

      category_statistics = new (DotLedger.Collections.Base.extend({
        url: '/api/statistics/activity_per_category'
      }))

      category_statistics.fetch({
        success: function () {
          var activity
          activity = new DotLedger.Views.Statistics.ActivityPerCategory.List({
            collection: category_statistics
          })
          return dashboard.panelB.show(activity)
        }
      })
      accounts = new DotLedger.Collections.Accounts()
      return accounts.fetch({
        success: function () {
          var accounts_list
          accounts_list = new DotLedger.Views.Accounts.List({
            collection: accounts
          })
          return dashboard.panelA.show(accounts_list)
        }
      })
    }

    App.prototype.notFound = function (path) {
      var model, notFoundView
      model = new DotLedger.Models.Base({
        path: path
      })
      notFoundView = new DotLedger.Views.Application.NotFound({
        model: model
      })
      return DotLedger.mainRegion.show(notFoundView)
    }

    App.prototype.showAccount = function (account_id) {
      var account, balanceGraph, show, transactions
      if (!this.QueryParams.has('tab')) {
        this.QueryParams.set({
          tab: 'sorted'
        })
      }
      if (!this.QueryParams.has('page')) {
        this.QueryParams.set({
          page: 1
        })
      }
      account = new DotLedger.Models.Account({
        id: account_id
      })
      transactions = new DotLedger.Collections.Transactions()
      DotLedger.navigate.showAccount(_.extend({
        id: account_id
      }, this.QueryParams.attributes), {
        replace: true
      })
      transactions.on('page:change', (function (_this) {
        return function (page) {
          _this.QueryParams.set({
            page: page
          })
          return DotLedger.navigate.showAccount(_.extend({
            id: account_id
          }, _this.QueryParams.attributes))
        }
      })(this))
      switch (this.QueryParams.get('tab')) {
        case 'sorted':
          transactions.fetch({
            data: {
              account_id: account_id,
              sorted: true,
              review: false,
              page: this.QueryParams.get('page')
            }
          })
          break
        case 'review':
          transactions.fetch({
            data: {
              account_id: account_id,
              review: true,
              page: this.QueryParams.get('page')
            }
          })
          break
        case 'unsorted':
          transactions.fetch({
            data: {
              account_id: account_id,
              unsorted: true,
              page: this.QueryParams.get('page')
            }
          })
      }
      show = new DotLedger.Views.Accounts.Show({
        model: account,
        tab: this.QueryParams.get('tab')
      })
      balanceGraph = new DotLedger.Views.Accounts.BalanceGraph({
        model: account,
        days: 90
      })
      return account.fetch({
        success: function () {
          var transactionsTableView
          DotLedger.title('Accounts', account.get('name'))
          transactionsTableView = new DotLedger.Views.Transactions.Table({
            collection: transactions
          })
          DotLedger.mainRegion.show(show)
          show.graph.show(balanceGraph)
          return show.transactions.show(transactionsTableView)
        }
      })
    }

    App.prototype.newAccount = function () {
      var account, form
      account = new DotLedger.Models.Account()
      form = new DotLedger.Views.Accounts.Form({
        model: account
      })
      form.on('save', function (model) {
        return DotLedger.navigate.showAccount({
          id: model.get('id')
        }, {
          trigger: true
        })
      })
      DotLedger.title('New Account')
      return DotLedger.mainRegion.show(form)
    }

    App.prototype.sortAccount = function (account_id) {
      return $.ajax({
        url: '/api/transactions/sort',
        data: {
          account_id: account_id
        },
        type: 'POST',
        success: (function (_this) {
          return function (response) {
            DotLedger.Helpers.Notification.success(response.message)
            DotLedger.Helpers.Loading.stop()
            return _this.showAccount(account_id)
          }
        })(this)
      })
    }

    App.prototype.editAccount = function (account_id) {
      var account, form
      account = new DotLedger.Models.Account({
        id: account_id
      })
      form = new DotLedger.Views.Accounts.Form({
        model: account
      })
      account.fetch({
        success: function () {
          DotLedger.title('Edit Account', account.get('name'))
          return DotLedger.mainRegion.show(form)
        }
      })
      return form.on('save', function () {
        return DotLedger.navigate.showAccount({
          id: account_id
        }, {
          trigger: true
        })
      })
    }

    App.prototype.newStatement = function (account_id) {
      var account, form, statement
      account = new DotLedger.Models.Account({
        id: account_id
      })
      statement = new DotLedger.Models.Statement()
      form = new DotLedger.Views.Statements.Form({
        model: statement,
        account: account
      })
      account.fetch({
        success: function () {
          DotLedger.title('New Statement', account.get('name'))
          return DotLedger.mainRegion.show(form)
        }
      })
      return form.on('save', function () {
        return DotLedger.navigate.showAccount({
          id: account_id
        }, {
          trigger: true
        })
      })
    }

    App.prototype.listStatements = function (account_id) {
      var account, list, statements
      account = new DotLedger.Models.Account({
        id: account_id
      })
      statements = new DotLedger.Collections.Statements()
      list = new DotLedger.Views.Statements.List({
        account: account,
        collection: statements
      })
      statements.fetch({
        data: {
          account_id: account_id
        }
      })
      return account.fetch({
        success: function () {
          DotLedger.title('Statements', account.get('name'))
          return DotLedger.mainRegion.show(list)
        }
      })
    }

    App.prototype.listCategories = function () {
      var categories
      categories = new DotLedger.Collections.Categories()
      DotLedger.title('Categories')
      return categories.fetch({
        success: function () {
          var list
          list = new DotLedger.Views.Categories.List({
            collection: categories
          })
          return DotLedger.mainRegion.show(list)
        }
      })
    }

    App.prototype.newCategory = function () {
      var category, form
      category = new DotLedger.Models.Category()
      form = new DotLedger.Views.Categories.Form({
        model: category
      })
      DotLedger.title('New Category')
      form.on('save', function (model) {
        return DotLedger.navigate.listCategories({}, {
          trigger: true
        })
      })
      return DotLedger.mainRegion.show(form)
    }

    App.prototype.editCategory = function (category_id) {
      var category, form
      category = new DotLedger.Models.Category({
        id: category_id
      })
      form = new DotLedger.Views.Categories.Form({
        model: category
      })
      form.on('save', function (model) {
        return DotLedger.navigate.listCategories({}, {
          trigger: true
        })
      })
      return category.fetch({
        success: function () {
          DotLedger.title('Edit Category', category.get('name'))
          return DotLedger.mainRegion.show(form)
        }
      })
    }

    App.prototype.listSortingRules = function () {
      var list, sorting_rules, updateSortingRules
      if (!this.QueryParams.has('page')) {
        this.QueryParams.set({
          page: 1
        })
      }
      sorting_rules = new DotLedger.Collections.SortingRules()
      list = new DotLedger.Views.SortingRules.List({
        collection: sorting_rules,
        model: this.QueryParams
      })
      DotLedger.title('Sorting Rules')
      updateSortingRules = (function (_this) {
        return function () {
          DotLedger.navigate.listSortingRules(_this.QueryParams.attributes)
          return sorting_rules.fetch({
            data: _this.QueryParams.attributes
          })
        }
      })(this)
      list.on('search', updateSortingRules)
      updateSortingRules()
      DotLedger.mainRegion.show(list)
      return sorting_rules.on('page:change', (function (_this) {
        return function (page) {
          _this.QueryParams.set({
            page: page
          })
          return DotLedger.navigate.listSortingRules(_this.QueryParams.attributes)
        }
      })(this))
    }

    App.prototype.newSortingRule = function () {
      var form, sorting_rule
      sorting_rule = new DotLedger.Models.SortingRule()
      DotLedger.title('New Sorting Rule')
      form = new DotLedger.Views.SortingRules.Form({
        model: sorting_rule
      })
      form.on('save', function (model) {
        return DotLedger.navigate.listSortingRules({}, {
          trigger: true
        })
      })
      return DotLedger.mainRegion.show(form)
    }

    App.prototype.editSortingRule = function (sorting_rule_id) {
      var form, sorting_rule
      sorting_rule = new DotLedger.Models.SortingRule({
        id: sorting_rule_id
      })
      form = new DotLedger.Views.SortingRules.Form({
        model: sorting_rule
      })
      form.on('save', function (model) {
        return DotLedger.navigate.listSortingRules({}, {
          trigger: true
        })
      })
      return sorting_rule.fetch({
        success: function () {
          DotLedger.title('Edit Sorting Rule', sorting_rule.get('contains'))
          return DotLedger.mainRegion.show(form)
        }
      })
    }

    App.prototype.listGoals = function () {
      var goals
      goals = new DotLedger.Collections.Goals()
      DotLedger.title('Goals')
      return goals.fetch({
        success: function () {
          var list
          list = new DotLedger.Views.Goals.List({
            collection: goals
          })
          return DotLedger.mainRegion.show(list)
        }
      })
    }

    App.prototype.listPayments = function () {
      var payments
      payments = new DotLedger.Collections.Payments()
      DotLedger.title('Payments')
      return payments.fetch({
        success: function () {
          var list
          list = new DotLedger.Views.Payments.List({
            collection: payments
          })
          return DotLedger.mainRegion.show(list)
        }
      })
    }

    App.prototype.newPayment = function () {
      var form, payment
      payment = new DotLedger.Models.Payment()
      DotLedger.title('New Payment')
      form = new DotLedger.Views.Payments.Form({
        model: payment
      })
      form.on('save', function (model) {
        return DotLedger.navigate.listPayments({}, {
          trigger: true
        })
      })
      return DotLedger.mainRegion.show(form)
    }

    App.prototype.editPayment = function (payment_id) {
      var form, payment
      payment = new DotLedger.Models.Payment({
        id: payment_id
      })
      form = new DotLedger.Views.Payments.Form({
        model: payment
      })
      payment.fetch({
        success: function () {
          DotLedger.title('Edit Payment', payment.get('name'))
          return DotLedger.mainRegion.show(form)
        }
      })
      return form.on('save', function () {
        return DotLedger.navigate.listPayments({}, {
          trigger: true
        })
      })
    }

    App.prototype.search = function () {
      var searchFilters, searchLayout, searchResults, searchSummary, transactions, updateTransactions
      if (!this.QueryParams.has('page')) {
        this.QueryParams.set({
          page: 1
        })
      }
      searchLayout = new DotLedger.Views.Search.Search()
      searchFilters = new DotLedger.Views.Search.FilterForm({
        model: this.QueryParams
      })
      transactions = new DotLedger.Collections.Transactions()
      transactions.on('page:change', (function (_this) {
        return function (page) {
          _this.QueryParams.set({
            page: page
          })
          return DotLedger.navigate.search(_this.QueryParams.attributes)
        }
      })(this))
      searchSummary = new DotLedger.Views.Search.Summary({
        collection: transactions
      })
      updateTransactions = (function (_this) {
        return function () {
          if (_this.QueryParams.has('query')) {
            DotLedger.title('Search', _this.QueryParams.get('query'))
          } else {
            DotLedger.title('Search')
          }
          DotLedger.navigate.search(_this.QueryParams.attributes)
          return transactions.fetch({
            data: _this.QueryParams.attributes
          })
        }
      })(this)
      searchFilters.on('search', updateTransactions)
      updateTransactions()
      searchResults = new DotLedger.Views.Transactions.Table({
        collection: transactions
      })
      DotLedger.mainRegion.show(searchLayout)
      searchLayout.searchFilters.show(searchFilters)
      searchLayout.searchSummary.show(searchSummary)
      return searchLayout.searchResults.show(searchResults)
    }

    App.prototype.incomeAndExpenses = function () {
      var category_statistics, filterView, renderReport, reportView
      DotLedger.title('Reports', 'Income and Expenses')
      if (!this.QueryParams.has('period')) {
        this.QueryParams.set({
          period: 90
        })
      }
      DotLedger.navigate.incomeAndExpenses(this.QueryParams.attributes, {
        replace: true
      })
      filterView = new DotLedger.Views.Reports.IncomeAndExpenses.Filter({
        model: this.QueryParams
      })
      reportView = new DotLedger.Views.Reports.IncomeAndExpenses.Show()
      category_statistics = new (DotLedger.Collections.Base.extend({
        url: '/api/statistics/activity_per_category'
      }))
      renderReport = (function (_this) {
        return function () {
          var date_from, date_to
          DotLedger.navigate.incomeAndExpenses(_this.QueryParams.attributes)
          filterView.render()
          date_to = moment()
          date_from = moment().subtract('day', _this.QueryParams.get('period'))
          return category_statistics.fetch({
            data: {
              date_to: date_to.format('YYYY-MM-DD'),
              date_from: date_from.format('YYYY-MM-DD')
            },
            success: function () {
              var activity
              activity = new DotLedger.Views.Reports.IncomeAndExpenses.Table({
                collection: category_statistics
              })
              return reportView.report.show(activity)
            }
          })
        }
      })(this)
      this.QueryParams.on('change:period', renderReport)
      renderReport()
      DotLedger.mainRegion.show(reportView)
      return reportView.filter.show(filterView)
    }

    return App
  })(this.Base)
})
