var PBJS_Grid = $.extend({}, PBJS_BaseComponent, {

  componentType: 'grid',

  componentLabel: 'Grid',

  componentIcon: 'fa fa-columns fa-2x',

  options: [
    {label: '1 coluna', value: 1},
    {label: '2 colunas', value: 2},
    {label: '3 colunas', value: 3},
    {label: '4 colunas', value: 4}
  ],

  exportContent: function (colNumber) {
    colNumber = colNumber || 1;
    var gridClasses = {
      1: 'col-sm-12',
      2: 'col-md-6 col-sm-12',
      3: 'col-md-4 col-sm-12',
      4: 'col-md-3 col-sm-6 col-xs-12'
    };
    var bootstraoGridClass = gridClasses[colNumber] || 'col-sm-12';
    var gridRow = "<div class='row' style='margin-left: 0; margin-right: 0'>";

    for (var i = 0; i < colNumber; i++) {
      gridRow += "<div class='pbjs-droped-element pbjs-dropzone " + bootstraoGridClass + "'></div>";
    }

    gridRow += "</div>";

    return gridRow;
  }
});