describe('DotLedger.Models.Statement', function () {
  it('should be defined', function () {
    expect(DotLedger.Models.Statement).toBeDefined()
  })
  return it('should use the correct url', function () {
    expect(DotLedger.Models.Statement.prototype.urlRoot).toEqual('/api/statements')
  })
})
