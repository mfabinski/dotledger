DotLedger.module('Views.Application', function () {
  this.NotFound = (function (superClass) {
    extend(NotFound, superClass)

    function NotFound () {
      return NotFound.__super__.constructor.apply(this, arguments)
    }

    NotFound.prototype.template = 'application/not_found'

    return NotFound
  })(Backbone.Marionette.ItemView)
})
