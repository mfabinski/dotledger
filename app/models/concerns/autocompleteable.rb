module Autocompleteable
  def autocomplete(*fields)
    fields.each do |field|
      self.define_singleton_method(:"autocomplete_#{field}") do |query, limit = 20|
        where(["#{field} ilike ?", "%#{query}%"])
        .order(field)
        .uniq(field)
        .limit(limit)
        .pluck(field)
        .map do |t|
          {value: t }
        end
      end
    end
  end
end
