//= require jquery
//= require bootstrap/button
//= require bootstrap/collapse
//= require bootstrap/dropdown
//= require bootstrap/modal
//= require bootstrap/tab
//= require bootstrap-datepicker
//= require jquery.flot
//= require jquery.flot.time
//= require moment
//= require underscore
//= require underscore.string
//= require backbone
//= require backbone.babysitter
//= require backbone.wreqr
//= require backbone.marionette
//= require dot_ledger

_.mixin({
  compactObject: function (object) {
    _.each(object, function (v, k) {
      if (_.isEmpty(object[k]) && !_.isNumber(object[k])) {
        delete object[k]
      }
    })
    return object
  },
  parseQueryString: function (queryString) {
    var pair, variables
    if (typeof queryString !== 'string' || queryString === '') {
      return {}
    }
    variables = queryString.trim().replace(/\+/g, ' ').split('&')
    return ((function () {
      var i, len, results
      results = []
      for (i = 0, len = variables.length; i < len; i++) {
        pair = variables[i]
        results.push(pair.split('='))
      }
      return results
    })()).reduce(function (output, pair) {
      var key, value
      key = pair[0], value = pair[1]
      key = decodeURIComponent(key)
      value = value != null ? decodeURIComponent(value) : null
      if (!(key in output)) {
        output[key] = value
      } else if (_.isArray(output[key])) {
        output[key].push(value)
      } else {
        output[key] = [output[key], value]
      }
      return output
    }, {})
  }
})
