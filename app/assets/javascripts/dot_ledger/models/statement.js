DotLedger.module('Models', function () {
  this.Statement = (function (superClass) {
    extend(Statement, superClass)

    function Statement () {
      return Statement.__super__.constructor.apply(this, arguments)
    }

    Statement.prototype.urlRoot = '/api/statements'

    return Statement
  })(this.Base)
})
