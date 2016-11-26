(function (global) {

function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByClassName(chkboxName);
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

document.getElementById('select-images').onclick = function(){
  var checkedBoxes = getCheckedBoxes("art-image");

  var imageId, imageElement;
  var selectImageArray = [];

  for (var i=0; i<checkedBoxes.length; i++) {
    imageId = "image-" + checkedBoxes[i].id;
    imageElement = document.getElementById(imageId).innerHTML;
    selectImageArray.push(imageElement);
  }

  startSecondStep(selectImageArray);

};

function startSecondStep(selectedArray) {
  //hide all the artworks
  var artworksWrapper = document.getElementById("artworks-wrapper");
  artworksWrapper.className += " " + "element-invisible";

  var buttonSelectImageWrapper = document.getElementById("select-images-wrapper");
  buttonSelectImageWrapper.className += " " + "element-invisible";

  //add selected images html to the drag drop div
  document.getElementById('drag-drop-images').innerHTML = selectedArray;
  //remove the hide class from drag drop section
  document.getElementById("drag-drop").className = "drag-drop" + " " + "pt3";

  var tabString = "dtc-ns tc pv4 "
  document.getElementById("tab1").className = tabString + "bg-black-10";
  document.getElementById("tab2").className = tabString + "bg-light-pink";


  buildDragDrop();
}

function buildDragDrop() {
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
    // call this function on every dragmove event
    onmove: dragMoveListener,
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}

})(window);
