DotLedger.module('Behaviors', function () {
  this.CategorySelector = (function (superClass) {
    extend(CategorySelector, superClass)

    function CategorySelector () {
      return CategorySelector.__super__.constructor.apply(this, arguments)
    }

    CategorySelector.prototype.initialize = function () {
      // FIXME: This is a hack to make it easier to test.
      if (this.view.options.categories) {
        this.categories = this.view.options.categories
      } else {
        this.categories = new DotLedger.Collections.Categories()
        this.categories.fetch()
      }
    }

    CategorySelector.prototype.defaults = {
      showAnyOption: true,
      showNoneOption: true,
      categorySelect: 'category',
      categoryAttribute: 'category_id'
    }

    CategorySelector.prototype.onRender = function () {
      this.categories.on('sync', (function (_this) {
        return function () {
          return _this.renderCategories()
        }
      })(this))
      this.renderCategories()
    }

    CategorySelector.prototype.renderCategories = function () {
      var $categorySelect
      $categorySelect = this.view.ui[this.options.categorySelect]
      $categorySelect.empty()
      if (this.options.showAnyOption) {
        $categorySelect.append('<option value="">Any</option>')
      }
      if (this.options.showNoneOption) {
        $categorySelect.append('<option value="-1">None</option>')
      }
      _.each(this.categories.groupBy('type'), (function (_this) {
        return function (categories, label) {
          var $optgroup
          $optgroup = $("<optgroup label='" + label + "'></optgroup>")
          _.each(categories, function (category) {
            var $option
            $option = $("<option value='" + (category.get('id')) + "'>" + (category.get('name')) + '</option>')
            return $optgroup.append($option)
          })
          return $categorySelect.append($optgroup)
        }
      })(this))
      return $categorySelect.val(this.view.model.get(this.options.categoryAttribute))
    }

    return CategorySelector
  })(Marionette.Behavior)
})
