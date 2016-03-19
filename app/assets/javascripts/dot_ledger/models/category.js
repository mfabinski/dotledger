DotLedger.module('Models', function () {
  this.Category = (function (superClass) {
    extend(Category, superClass)

    function Category () {
      return Category.__super__.constructor.apply(this, arguments)
    }

    Category.prototype.urlRoot = '/api/categories'

    return Category
  })(this.Base)
})
