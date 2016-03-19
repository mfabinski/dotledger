DotLedger.module('Regions', function () {
  this.Modal = (function (superClass) {
    extend(Modal, superClass)

    function Modal () {
      return Modal.__super__.constructor.apply(this, arguments)
    }

    Modal.prototype.onShow = function (view) {
      view.$el.modal('show')
      this.listenTo(view, 'before:destroy', this.closeModal, this)
    }

    Modal.prototype.closeModal = function () {
      if (this.currentView) {
        this.stopListening()
        this.currentView.$el.modal('hide')
      }
    }

    return Modal
  })(Backbone.Marionette.Region)
})
