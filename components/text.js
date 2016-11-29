var PBJS_Text = $.extend({}, PBJS_BaseComponent, {

  componentType: 'text',

  componentLabel: 'Text',

  componentIcon: 'fa fa-file-text-o fa-2x',

  options: [
    {label: 'Texto', value: 'texto'},
    {label: 'Jumbotron', value: 'jumbotron'}
  ],

  exportContent: function (param) {

    var textElement = "<div id='" + this.getNextId() + "' class='pbjs-droped-element pbjs-text-component' contenteditable='true'>" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
      "</div>";

    if (param == 'jumbotron') {
      textElement = '<div class="jumbotron" style="padding: 10px">' + textElement + '</div>';
    }

    return textElement;
  },

  //apply ckeditor
  afterExport: function () {
    CKEDITOR.inline('' + this.getCurrentId());
  }
});

