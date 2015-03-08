require 'rails_helper'

describe Api::AutocompleteController do
  describe 'GET transactions_search' do
    let!(:transaction_1) { FactoryGirl.create :transaction, memo: '', name: 'Foo' }

    let!(:transaction_2) { FactoryGirl.create :transaction, memo: '', name: 'Foobar' }

    let!(:transaction_3) { FactoryGirl.create :transaction, memo: '', name: 'Bazbar' }

    before { get :transactions_search, q: 'foo' }

    it { should respond_with :success }

    it 'returns values that match the query' do
      expect(JSON.parse(response.body)).to eq([{'value' => 'Foo'}, {'value' => 'Foobar'}])
    end
  end

  describe 'GET sorting_rules_name' do
    let!(:sorting_rule_1) { FactoryGirl.create :sorting_rule, name: 'Foo' }

    let!(:sorting_rule_2) { FactoryGirl.create :sorting_rule, name: 'Foobar' }

    let!(:sorting_rule_3) { FactoryGirl.create :sorting_rule, name: 'Bazbar' }

    before { get :sorting_rules_name, q: 'foo' }

    it { should respond_with :success }

    it 'returns values that match the query' do
      expect(JSON.parse(response.body)).to eq([{'value' => 'Foo'}, {'value' => 'Foobar'}])
    end
  end
end
