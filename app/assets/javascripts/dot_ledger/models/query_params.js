DotLedger.module('Models', function () {
  this.QueryParams = (function (superClass) {
    extend(QueryParams, superClass)

    function QueryParams () {
      return QueryParams.__super__.constructor.apply(this, arguments)
    }

    QueryParams.prototype.toString = function () {
      return $.param(this.attributes).replace(/%5B%5D/g, '')
    }

    return QueryParams
  })(Backbone.Model)
})
