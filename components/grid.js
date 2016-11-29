var PBJS_Grid = $.extend({}, PBJS_BaseComponent, {

  componentType: 'grid',

  componentLabel: 'Grid',

  componentIcon: 'fa fa-columns',

  //apply ckeditor
  exportContent: function (params) {
    var bootstraoGridClass = 'col-sm-12';

    // if (size) {
    //   // bootstraoGridClass = (size == 6) ? 'col-sm-12 col-md-6'
    // }

    return "<div class='pbjs-droped-element pbjs-dropzone " + bootstraoGridClass + " pbjs-text-element'></div>";
  }
});