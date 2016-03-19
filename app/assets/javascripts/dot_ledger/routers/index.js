//= require_self
//= require_tree .

DotLedger.module('Routers', function () {
  this.Base = (function (superClass) {
    extend(Base, superClass)

    function Base () {
      return Base.__super__.constructor.apply(this, arguments)
    }

    Base.prototype.execute = function (callback, args, name) {
      var params
      params = _.parseQueryString(args.pop())
      this.QueryParams = new DotLedger.Models.QueryParams(params)
      args.push(params)
      if (callback != null) {
        return callback.apply(this, args)
      }
    }

    return Base
  })(Backbone.Marionette.AppRouter)
})
