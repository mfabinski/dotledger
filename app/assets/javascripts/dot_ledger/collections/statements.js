DotLedger.module('Collections', function () {
  this.Statements = (function (superClass) {
    extend(Statements, superClass)

    function Statements () {
      return Statements.__super__.constructor.apply(this, arguments)
    }

    Statements.prototype.url = '/api/statements'

    Statements.prototype.model = DotLedger.Models.Statement

    return Statements
  })(this.Base)
})
