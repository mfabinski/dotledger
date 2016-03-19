//= require_self
//= require ./helpers
//= require_tree ./templates
//= require ./routers
//= require ./models
//= require ./collections
//= require_tree ./behaviors
//= require_tree ./regions
//= require_tree ./views
//= require_tree ./initializers

var extend = function (child, parent) {
  for (var key in parent) {
    if (hasProp.call(parent, key)) {
      child[key] = parent[key]
    }
  }
  function ctor () {
    this.constructor = child
  }
  ctor.prototype = parent.prototype
  child.prototype = new ctor()
  child.__super__ = parent.prototype
  return child
}

var hasProp = {}.hasOwnProperty

var slice = [].slice

this.DotLedgerData = {}

this.DotLedger = new Marionette.Application()

DotLedger.title = function () {
  var title_parts
  title_parts = 1 <= arguments.length ? slice.call(arguments, 0) : []
  return DotLedger.trigger('document:title', title_parts)
}

Backbone.Marionette.Renderer.render = function (template, data) {
  return JST['dot_ledger/templates/' + template](data)
}

Marionette.Behaviors.behaviorsLookup = function () {
  return DotLedger.Behaviors
}

DotLedger.addRegions({
  headerRegion: 'header',
  notificationsRegion: '#notifications',
  mainRegion: '#main',
  footerRegion: 'footer'
})
