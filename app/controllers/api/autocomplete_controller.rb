module Api
  class AutocompleteController < BaseController
    def transactions_search
      respond_with Transaction.autocomplete_search(params[:q].to_s)
    end

    def sorting_rules_name
      respond_with SortingRule.autocomplete_name(params[:q].to_s)
    end
  end
end
