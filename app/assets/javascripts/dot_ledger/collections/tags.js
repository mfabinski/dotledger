DotLedger.module('Collections', function () {
  this.Tags = (function (superClass) {
    extend(Tags, superClass)

    function Tags () {
      return Tags.__super__.constructor.apply(this, arguments)
    }

    Tags.prototype.url = '/api/tags'

    Tags.prototype.model = DotLedger.Models.Tag

    return Tags
  })(this.Base)
})
