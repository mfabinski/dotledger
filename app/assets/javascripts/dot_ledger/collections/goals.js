DotLedger.module('Collections', function () {
  this.Goals = (function (superClass) {
    extend(Goals, superClass)

    function Goals () {
      return Goals.__super__.constructor.apply(this, arguments)
    }

    Goals.prototype.url = '/api/goals'

    Goals.prototype.model = DotLedger.Models.Goal

    return Goals
  })(this.Base)
})
