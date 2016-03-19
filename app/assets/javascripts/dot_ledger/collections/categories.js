DotLedger.module('Collections', function () {
  this.Categories = (function (superClass) {
    extend(Categories, superClass)

    function Categories () {
      return Categories.__super__.constructor.apply(this, arguments)
    }

    Categories.prototype.url = '/api/categories'

    Categories.prototype.model = DotLedger.Models.Category

    return Categories
  })(this.Base)
})
