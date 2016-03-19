DotLedger.module('Views.Search', function () {
  this.Search = (function (superClass) {
    extend(Search, superClass)

    function Search () {
      return Search.__super__.constructor.apply(this, arguments)
    }

    Search.prototype.template = 'search/search'

    Search.prototype.regions = {
      searchFilters: '#search-filters',
      searchSummary: '#search-summary',
      searchResults: '#search-results'
    }

    return Search
  })(Backbone.Marionette.LayoutView)
})
