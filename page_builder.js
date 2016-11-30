var PageBuilderJS = {};

(function (pb) {

  var defaultSettings = {
    targetContainer: '#pbjs-target-container',
    dropZone: '.pbjs-dropzone',
    components: ['text', 'grid']
  };

  var COMPONENTS = {
    text: PBJS_Text,
    grid: PBJS_Grid
  };


  var startJqueryDraggableComponents = function () {
    $(".pbjs-dropzone").sortable({
      revert: true,
      placeholder: "pbjs-sortable-placeholder",
      stop: function (event, ui) {
        console.log(ui.item);
        ui.item.replaceWith('<div class="pbjs-draggable-droped"></div>');
      }
    });

    $(".pbjs-component").draggable({
      connectToSortable: ".pbjs-dropzone",
      revert: "invalid",
      cursor: "move",
      cursorAt: {top: 30, left: 50},
      helper: function (event, el) {
        console.log('event', event);
        console.log('el', el);

        var $draggable = $(event.currentTarget);
        var component = COMPONENTS[$draggable.data('type')];
        var width = $('#pbjs-target-container').width();
        return $('<div class="pbjs-draggable-onmove" style="width: ' + width + 'px"></div>');
      }
    });
  };

  var createSidebarComponents = function (components) {
    var sideMenu = '<div class="nav-side-menu">' +
      '<div class="menu-list">' +
      '<ul id="menu-content" class="menu-content">';

    $.each(components, function (idx, component) {
      var currentComponent = COMPONENTS[component];

      if (currentComponent.options) {
        sideMenu += '<li class="pbjs-collapsible">' +
          '<a href="#">' +
          '<i class="' + currentComponent.componentIcon + '"></i>' + '<span class="pbjs-menu-text">' + currentComponent.componentLabel + '</span>' +
          '</a>' +
          '</li>';

        sideMenu += '<ul class="sub-menu">';

        $.each(currentComponent.options, function (optIndex, optComponent) {
          sideMenu += '<li class="pbjs-component" data-type="' + currentComponent.componentType + '" data-componentvalue="' + optComponent.value + '">' +
            '<a href="#">' + optComponent.label + '</a>' +
            '</li>';
        });

        sideMenu += '</ul>';

      } else {
        sideMenu += '<li class="pbjs-component" data-type="' + currentComponent.componentType + '">' +
          '<a href="#">' +
          '<i class="' + currentComponent.componentIcon + '"></i>' + '<span class="pbjs-menu-text">' + currentComponent.componentLabel + '</span>' +
          '</a>' +
          '</li>';
      }

    });
    sideMenu += '</ul></div></div>';

    $('body').append(sideMenu);
  };


  pb.initialize = function (settings) {
    var options = $.extend({}, defaultSettings, (settings || {}));
    createSidebarComponents(options.components);
    // startInteractJs();
    startJqueryDraggableComponents();
  }

}(PageBuilderJS));