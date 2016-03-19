DotLedger.module('Models', function () {
  this.Goal = (function (superClass) {
    extend(Goal, superClass)

    function Goal () {
      return Goal.__super__.constructor.apply(this, arguments)
    }

    Goal.prototype.urlRoot = '/api/goals'

    return Goal
  })(this.Base)
})
