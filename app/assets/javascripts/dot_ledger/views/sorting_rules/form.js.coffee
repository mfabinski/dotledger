DotLedger.module 'Views.SortingRules', ->
  class @Form extends Backbone.Marionette.ItemView
    template: 'sorting_rules/form'

    behaviors:
      CategorySelector:
        showAnyOption: false
        showNoneOption: false

    ui:
      name: 'input[name=name]'
      contains: 'input[name=contains]'
      category: 'select[name=category]'
      review: 'select[name=review]'
      tags: 'input[name=tags]'

    onRender: ->
      new DotLedger.Helpers.FormErrors(@model, @$el)

      @ui.name.val(@model.get('name'))
      @ui.contains.val(@model.get('contains'))
      @ui.review.val("#{@model.get('review')}").change()
      @ui.tags.val((@model.get('tag_list') || []).join(', '))

      @renderContainsTypeahead()
      @renderNameTypeahead()

    renderContainsTypeahead: ->
      @containsBloodhoundEngine.initialize()
      @ui.contains.typeahead({
        highlight: true
      },
      {
        name: 'transactions',
        source: @containsBloodhoundEngine.ttAdapter()
      })

    renderNameTypeahead: ->
      @nameBloodhoundEngine.initialize()
      @ui.name.typeahead({
        highlight: true
      },
      {
        name: 'names',
        source: @nameBloodhoundEngine.ttAdapter()
      })

    containsBloodhoundEngine:
      new Bloodhound(
        name: 'transactions'
        remote: '/api/autocomplete/transactions_search?q=%QUERY'
        datumTokenizer: (d)->
          return Bloodhound.tokenizers.whitespace(d.val)
        queryTokenizer: Bloodhound.tokenizers.whitespace
      )

    nameBloodhoundEngine:
      new Bloodhound(
        name: 'names'
        remote: '/api/autocomplete/sorting_rules_name?q=%QUERY'
        datumTokenizer: (d)->
          return Bloodhound.tokenizers.whitespace(d.val)
        queryTokenizer: Bloodhound.tokenizers.whitespace
      )

    events:
      'click button.save': 'save'
      'submit form': 'save'

    templateHelpers: ->
      pageHeader: =>
        if @model.has('name')
          @model.get('name')
        else
          'New Sorting Rule'

    update: ->
      data =
        name: @ui.name.val()
        contains: @ui.contains.val()
        category_id: @ui.category.val()
        review: @ui.review.val()
        tags: @ui.tags.val()

      @model.set(data)

    save: ->
      @update()

      @model.save {},
        success: =>
          @trigger 'save', @model

      false
