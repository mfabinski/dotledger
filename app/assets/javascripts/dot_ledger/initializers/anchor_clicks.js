DotLedger.addInitializer(function () {
  return $('body').on('click', 'a[href]', function (e) {
    var href
    href = $(this).attr('href')
    if (href.match(/^\/.*/) || href === '/') {
      Backbone.history.navigate(href, {
        trigger: true
      })
      return e.preventDefault()
    }
  })
})
