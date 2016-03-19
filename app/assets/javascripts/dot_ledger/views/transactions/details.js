DotLedger.module('Views.Transactions', function () {
  this.Details = (function (superClass) {
    extend(Details, superClass)

    function Details () {
      return Details.__super__.constructor.apply(this, arguments)
    }

    Details.prototype.template = 'transactions/details'

    Details.prototype.className = 'modal'

    return Details
  })(Backbone.Marionette.ItemView)
})
