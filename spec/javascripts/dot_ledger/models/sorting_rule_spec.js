describe('DotLedger.Models.SortingRule', function () {
  it('should be defined', function () {
    expect(DotLedger.Models.SortingRule).toBeDefined()
  })
  return it('should use the correct url', function () {
    expect(DotLedger.Models.SortingRule.prototype.urlRoot).toEqual('/api/sorting_rules')
  })
})
