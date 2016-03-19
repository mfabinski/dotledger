DotLedger.module('Views.Application', function () {
  this.MainNav = (function (superClass) {
    extend(MainNav, superClass)

    function MainNav () {
      return MainNav.__super__.constructor.apply(this, arguments)
    }

    MainNav.prototype.template = 'application/main_nav'

    MainNav.prototype.className = 'navbar navbar-default navbar-fixed-top'

    MainNav.prototype.ui = {
      nav_search: '#nav-search'
    }

    MainNav.prototype.initialize = function () {
      this.options.accounts.on('sync', (function (_this) {
        return function () {
          return _this.render()
        }
      })(this))
      this.active = 'root'
      return Backbone.history.on('route', (function (_this) {
        return function (app, route, args) {
          _this.active = route
          return _this.render()
        }
      })(this))
    }

    MainNav.prototype.templateHelpers = function () {
      return {
        activeClass: (function (_this) {
          return function () {
            var routes
            routes = 1 <= arguments.length ? slice.call(arguments, 0) : []
            if (_.include(routes, _this.active)) {
              return 'active'
            }
          }
        })(this),
        accounts: (function (_this) {
          return function () {
            return _this.options.accounts
          }
        })(this)
      }
    }

    MainNav.prototype.onRender = function () {
      // FIXME: This is yuck.
      var searchForm, searchModel
      searchModel = new DotLedger.Models.QueryParams()
      searchForm = new DotLedger.Views.Search.NavForm({
        model: searchModel
      })
      this.ui.nav_search.html(searchForm.render().el)
    }

    return MainNav
  })(Backbone.Marionette.ItemView)
})
