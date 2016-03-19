//= require_self
//= require_tree .

DotLedger.module('Models', function () {
  this.Base = (function (superClass) {
    extend(Base, superClass)

    function Base () {
      Backbone.Model.prototype.constructor.apply(this, _.toArray(arguments))
      this.listenTo(this, 'error', this.serverSideErrors)
    }

    Base.prototype.serverSideErrors = function (model, resp, options) {
      var errors
      if (options == null) {
        options = {}
      }
      if (resp.status === 422) {
        errors = JSON.parse(resp.responseText).errors
        model.validationError = errors
        return model.trigger('invalid', model, errors, _.extend(options, {
          validationError: errors
        }))
      }
    }

    return Base
  })(Backbone.Model)
})
