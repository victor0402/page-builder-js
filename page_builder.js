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


  var startInteractJs = function () {
    interact('.pbjs-component').draggable({
      restrict: {
        restriction: $('#pbjs-target-container')[0],
        elementRect: {top: 0, left: 0, bottom: 1, right: 1},
        endOnly: true
      },

      onmove: function (event) {
        var target = event.target;
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform =
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
      onend: function (event) {
        console.log(event);
      }
    }).on('move', function (event) {
      var interaction = event.interaction;

      if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
        var original = event.currentTarget;
        var clone = event.currentTarget.cloneNode(true);
        var x = clone.offsetLeft;
        var y = clone.offsetTop;
        clone.setAttribute('clonable', 'false');
        clone.style.position = "absolute";
        clone.style.left = original.offsetLeft + "px";
        clone.style.top = original.offsetTop + "px";
        original.parentElement.appendChild(clone);
        interaction.start({name: 'drag'}, event.interactable, clone);
      }
    });

    interact('#pbjs-target-container').dropzone({
      // only accept elements matching this CSS selector
      accept: '.pbjs-component',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.1,

      ondropactivate: function (event) {

        // add active dropzone feedback
        $('.pbjs-dropzone').addClass('pbjs-drop-active');
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;

        // feedback the possibility of a drop
        $('.pbjs-dropzone').addClass('pbjs-drop-target');
        // dropzoneElement.classList.add('pbjs-drop-target');
        draggableElement.textContent = 'Dragged in';
      },
      ondragleave: function (event) {
        // remove the drop feedback style

        $('.pbjs-dropzone').removeClass('pbjs-drop-target');

        event.relatedTarget.textContent = 'Dragged out';
      },
      ondrop: function (event) {

        event.relatedTarget.htmlContent = 'Dropped';

      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        $('.pbjs-dropzone')
          .removeClass('pbjs-drop-active')
          .removeClass('pbjs-drop-target');

        var type = $(event.relatedTarget).data('type');
        var component = COMPONENTS[type];

        $(event.target).append(component.exportContent());

        $(event.relatedTarget).fadeOut('fast', function () {
          $(this).remove()
        })
      }
    });
  };

  var createSidebarComponents = function (components) {
    var sideMenu = '<div class="pbjs-components">';
    $.each(components, function (idx, component) {
      var currentComponent = COMPONENTS[component];
      sideMenu += '<div class="pbjs-component" data-type="' + currentComponent.componentType + '">' +
        currentComponent.componentLabel + '<i class="' + currentComponent.componentIcon + '"></i>' +
        '</div>';
    });
    sideMenu += '</div>';

    $('body').append(sideMenu);
  };


  pb.initialize = function (settings) {
    var options = $.extend({}, defaultSettings, (settings || {}));
    createSidebarComponents(options.components);
    startInteractJs();

  }

}(PageBuilderJS));