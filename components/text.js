var PBJS_Text = $.extend({}, PBJS_BaseComponent, {

  componentType: 'text',

  componentLabel: 'Text',

  componentIcon: 'fa fa-file-text-o',

  //apply ckeditor
  exportContent: function () {

    return "<div id='" + this.getNextId() + "' class='pbjs-droped-element pbjs-text-component' contenteditable='true'>" +
      "Put your text here :)" +
      "</div>";
  },

  afterExport: function () {
    CKEDITOR.inline('' + this.getCurrentId());
  }
});

