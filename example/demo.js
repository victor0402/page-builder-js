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
  overlap: 0.75
});