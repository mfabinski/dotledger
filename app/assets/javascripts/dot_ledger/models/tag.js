DotLedger.module('Models', function () {
  this.Tag = (function (superClass) {
    extend(Tag, superClass)

    function Tag () {
      return Tag.__super__.constructor.apply(this, arguments)
    }

    Tag.prototype.urlRoot = '/api/tags'

    return Tag
  })(this.Base)
})
