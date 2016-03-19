DotLedger.module('Collections', function () {
  this.SortingRules = (function (superClass) {
    extend(SortingRules, superClass)

    function SortingRules () {
      return SortingRules.__super__.constructor.apply(this, arguments)
    }

    SortingRules.prototype.url = '/api/sorting_rules'

    SortingRules.prototype.model = DotLedger.Models.SortingRule

    return SortingRules
  })(this.Base)
})
