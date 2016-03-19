DotLedger.addInitializer(function () {
  var initial_title
  initial_title = $('title').text()
  return DotLedger.on('document:title', function (title_parts) {
    var title
    title_parts.push(initial_title)
    title = title_parts.join(' &middot; ')
    return $('title').html(title)
  })
})
