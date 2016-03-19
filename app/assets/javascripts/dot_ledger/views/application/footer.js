DotLedger.module('Views.Application', function () {
  this.Footer = (function (superClass) {
    extend(Footer, superClass)

    function Footer () {
      return Footer.__super__.constructor.apply(this, arguments)
    }

    Footer.prototype.template = 'application/footer'

    return Footer
  })(Backbone.Marionette.ItemView)
})
