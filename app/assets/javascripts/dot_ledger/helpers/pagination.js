DotLedger.module('Helpers', function () {
  this.pagination = function (view, collection, selector) {
    var paginationView, renderPagination
    if (selector == null) {
      selector = '.pager-region'
    }
    paginationView = new DotLedger.Views.Application.Pagination({
      collection: collection
    })
    renderPagination = function () {
      return view.$el.find(selector).html(paginationView.render().el)
    }
    view.on('render', renderPagination)
    return paginationView
  }
})
