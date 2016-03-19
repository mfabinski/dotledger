DotLedger.module('Models', function () {
  this.SortingRule = (function (superClass) {
    extend(SortingRule, superClass)

    function SortingRule () {
      return SortingRule.__super__.constructor.apply(this, arguments)
    }

    SortingRule.prototype.urlRoot = '/api/sorting_rules'

    return SortingRule
  })(this.Base)
})
