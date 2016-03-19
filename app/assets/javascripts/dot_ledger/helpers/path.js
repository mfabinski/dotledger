DotLedger.module('Helpers', function () {
  var namedParam
  namedParam = /[:\*](\w+)/g
  this.Path = {
    routesToNavigateHelpers: function (routes) {
      var helpers
      helpers = {}
      _.each(routes, function (funcName, route) {
        var fn
        fn = DotLedger.Helpers.Path.routeToPathHelper(route)
        return helpers[funcName] = function (args, navigateOptions) {
          if (args == null) {
            args = {}
          }
          if (navigateOptions == null) {
            navigateOptions = {}
          }
          return Backbone.history.navigate(fn(args), navigateOptions)
        }
      })
      return helpers
    },
    routesToPathHelpers: function (routes) {
      var helpers
      helpers = {}
      _.each(routes, function (funcName, route) {
        return helpers[funcName] = DotLedger.Helpers.Path.routeToPathHelper(route)
      })
      return helpers
    },
    routeToPathHelper: function (route) {
      return function (args) {
        var matched, omitted, path
        if (args == null) {
          args = {}
        }
        matched = []
        path = route.replace(namedParam, function (_, key) {
          if (args.hasOwnProperty(key)) {
            matched.push(key)
            return args[key]
          } else {
            return ''
          }
        })
        omitted = new DotLedger.Models.QueryParams(_.omit(args, matched))
        if (omitted.isEmpty()) {
          return '/' + path
        } else {
          return '/' + path + '?' + omitted
        }
      }
    }
  }
})
