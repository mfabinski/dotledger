DotLedger.module('Helpers', function () {
  this.FormErrors = function (model, $el) {
    this.model = model
    this.$el = $el
    _.bindAll(this, 'processInvalid')
    this.listenTo(this.model, 'invalid', this.processInvalid)
  }
  return _.extend(this.FormErrors.prototype, Backbone.Events, {
    processInvalid: function (model, errors, options) {
      this.showErrors(errors)
    },
    showErrors: function (errors) {
      this.removeErrors()
      return _.each(errors, (function (error_messages, field) {
        this.showError(field, error_messages)
      }), this)
    },
    showError: function (attribute, errors) {
      var $error_messages, $errors_container, $form_group
      $error_messages = $('<span class="server-side-error help-block" />').html(s.toSentence(errors))
      $form_group = this.$el.find("[name='" + attribute + "']").parents('.form-group')
      $form_group.addClass('has-error')
      $errors_container = $form_group.find('.errors')
      return $errors_container.append($error_messages)
    },
    removeErrors: function () {
      this.$el.find('.has-error').removeClass('has-error')
      this.$el.find('.server-side-error').remove()
    }
  })
})
