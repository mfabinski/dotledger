DotLedger.module('Helpers', function () {
  this.Loading = {
    start: function () {
      return DotLedger.container.addClass('loading')
    },
    stop: function () {
      return DotLedger.container.removeClass('loading')
    }
  }
})
