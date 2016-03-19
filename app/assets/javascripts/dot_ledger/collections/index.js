//= require_self
//= require_tree .

DotLedger.module('Collections', function () {
  this.Base = (function (superClass) {
    extend(Base, superClass)

    function Base () {
      return Base.__super__.constructor.apply(this, arguments)
    }

    Base.prototype.pagination = {}

    Base.prototype.metadata = {}

    Base.prototype.parse = function (response, options) {
      this._fetch_options_data = options.data || {}
      this.pagination = JSON.parse(options.xhr.getResponseHeader('X-Pagination'))
      this.metadata = JSON.parse(options.xhr.getResponseHeader('X-Metadata'))
      return response
    }

    Base.prototype.nextPage = function () {
      var data
      this.trigger('page:change', this.pagination.next_page)
      if (this.pagination && (this.pagination.next_page != null)) {
        data = _.extend(this._fetch_options_data, {
          page: this.pagination.next_page
        })
        this.fetch({
          reset: true,
          data: data
        })
      }
    }

    Base.prototype.previousPage = function () {
      var data
      this.trigger('page:change', this.pagination.previous_page)
      if (this.pagination && (this.pagination.previous_page != null)) {
        data = _.extend(this._fetch_options_data, {
          page: this.pagination.previous_page
        })
        this.fetch({
          reset: true,
          data: data
        })
      }
    }

    return Base
  })(Backbone.Collection)
})
