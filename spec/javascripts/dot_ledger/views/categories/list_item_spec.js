describe('DotLedger.Views.Categories.ListItem', function () {
  it('should be defined', function () {
    expect(DotLedger.Views.Categories.ListItem).toBeDefined()
  })
  return it('should use the correct template', function () {
    expect(DotLedger.Views.Categories.ListItem).toUseTemplate('categories/list_item')
  })
})
