describe('DotLedger.Models.Transaction', function () {
  it('should be defined', function () {
    expect(DotLedger.Models.Transaction).toBeDefined()
  })
  return it('should use the correct url', function () {
    expect(DotLedger.Models.Transaction.prototype.urlRoot).toEqual('/api/transaction')
  })
})
