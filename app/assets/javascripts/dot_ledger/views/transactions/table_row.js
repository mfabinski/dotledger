DotLedger.module('Views.Transactions', function () {
  this.TableRow = (function (superClass) {
    extend(TableRow, superClass)

    function TableRow () {
      return TableRow.__super__.constructor.apply(this, arguments)
    }

    TableRow.prototype.tagName = 'tr'

    TableRow.prototype.template = 'transactions/table_row'

    TableRow.prototype.events = {
      'click .transaction-details': 'showDetails',
      'click .sort-transaction': 'showSortForm',
      'click .edit-transaction': 'showEditForm',
      'click .review-okay-transaction': 'reviewOkay'
    }

    TableRow.prototype.showDetails = function () {
      var details
      details = new DotLedger.Views.Transactions.Details({
        model: this.model
      })
      return DotLedger.modalRegion.show(details)
    }

    TableRow.prototype.showSortForm = function () {
      var form
      form = this.sortedTransactionForm()
      return form.on('save', (function (_this) {
        return function () {
          form.destroy()
          return _this.remove()
        }
      })(this))
    }

    TableRow.prototype.showEditForm = function () {
      var form
      form = this.sortedTransactionForm()
      return form.on('save', function () {
        return form.destroy()
      })
    }

    TableRow.prototype.reviewOkay = function () {
      var sorted_transaction
      sorted_transaction = new DotLedger.Models.SortedTransaction(this.model.get('sorted_transaction'))
      sorted_transaction.set({
        review: false
      })
      return sorted_transaction.save({}, {
        success: (function (_this) {
          return function () {
            return _this.remove()
          }
        })(this)
      })
    }

    TableRow.prototype.sortedTransactionForm = function () {
      var form, sorted_transaction
      sorted_transaction = new DotLedger.Models.SortedTransaction(this.model.get('sorted_transaction'))
      sorted_transaction.set({
        review: false
      })
      form = new DotLedger.Views.SortedTransactions.Form({
        model: sorted_transaction,
        transaction: this.model
      })
      DotLedger.modalRegion.show(form)
      return form
    }

    TableRow.prototype.templateHelpers = function () {
      return {
        name: (function (_this) {
          return function () {
            if (_this.model.has('sorted_transaction')) {
              return _this.model.get('sorted_transaction').name
            } else {
              return _this.model.get('search')
            }
          }
        })(this),
        category: (function (_this) {
          return function () {
            if (_this.model.has('sorted_transaction')) {
              return _.escape(_this.model.get('sorted_transaction').category_name)
            } else {
              return '<span class="text-muted">Unsorted</span>'
            }
          }
        })(this),
        spentAmount: (function (_this) {
          return function () {
            if (_this.model.get('amount') < 0) {
              return DotLedger.Helpers.Format.money(-_this.model.get('amount'))
            }
          }
        })(this),
        receivedAmount: (function (_this) {
          return function () {
            if (_this.model.get('amount') > 0) {
              return DotLedger.Helpers.Format.money(_this.model.get('amount'))
            }
          }
        })(this),
        editSortReview: (function (_this) {
          return function () {
            var sorted_transaction
            if (_this.model.has('sorted_transaction')) {
              sorted_transaction = _this.model.get('sorted_transaction')
              if (sorted_transaction.review) {
                return '<div class="btn-group">' + '<a href="#" class="review-okay-transaction btn-xs btn btn-default" title="Review transaction">Ok</a>' + '<a href="#" class="sort-transaction btn-xs btn btn-default" title="Review transaction">Edit</a>' + '</div>'
              } else {
                return '<a href="#" class="edit-transaction btn-xs btn btn-default" title="Sort transaction">Edit</a>'
              }
            } else {
              return '<a href="#" class="sort-transaction btn-xs btn btn-default" title="Sort transaction">Sort</a>'
            }
          }
        })(this)
      }
    }

    return TableRow
  })(Backbone.Marionette.ItemView)
})
