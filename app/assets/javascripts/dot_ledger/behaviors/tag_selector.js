DotLedger.module('Behaviors', function () {
  this.TagSelector = (function (superClass) {
    extend(TagSelector, superClass)

    function TagSelector () {
      return TagSelector.__super__.constructor.apply(this, arguments)
    }

    TagSelector.prototype.initialize = function () {
      // FIXME: This is a hack to make it easier to test.
      if (this.view.options.tags) {
        this.tags = this.view.options.tags
      } else {
        this.tags = new DotLedger.Collections.Tags()
        this.tags.fetch()
      }
    }

    TagSelector.prototype.defaults = {
      showAnyOption: true,
      tagSelect: 'tags',
      tagAttribute: 'tag_ids'
    }

    TagSelector.prototype.onRender = function () {
      this.tags.on('sync', (function (_this) {
        return function () {
          return _this.renderTags()
        }
      })(this))
      this.renderTags()
    }

    TagSelector.prototype.renderTags = function () {
      var $tagSelect
      $tagSelect = this.view.ui[this.options.tagSelect]
      $tagSelect.empty()
      if (this.options.showAnyOption) {
        $tagSelect.append('<option value="">Any</option>')
      }
      this.tags.each((function (_this) {
        return function (tag) {
          var $option
          $option = $("<option value='" + (tag.get('id')) + "'>" + (tag.get('name')) + '</option>')
          return $tagSelect.append($option)
        }
      })(this))
      return $tagSelect.val(this.view.model.get(this.options.tagAttribute))
    }

    return TagSelector
  })(Marionette.Behavior)
})
