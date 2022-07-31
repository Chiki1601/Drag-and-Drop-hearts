var full = document.querySelector('.full-heart');
var empties = document.querySelector('.empty-heart');
var fullHeartNum = full.id;
var clickedHeartId = 1;

// FULL HEART LOGIC:
// full heart listeners
function addFullEvents(fullHeartNum) {

  document.getElementById(fullHeartNum).addEventListener('dragstart', dragStart);
  document.getElementById(fullHeartNum).addEventListener('dragend', dragEnd);

  function dragStart() {     // this does not work, fix later

    this.classList.add('hold');
    setTimeout(() => (this.className = 'invisible'), 0);

  }

  function dragEnd() {

    document.getElementById(fullHeartNum).className = 'full-heart';
  }
}

// add a new full heart div with a button------------------------------
const buttonFull = document.querySelector('.full-button');

buttonFull.addEventListener('click', newFullCreate);

function newFullCreate() {

  var newFullHeart = document.createElement("div");
  newFullHeart.className = 'full-heart';
  fullHeartNum++;
  newFullHeart.id = fullHeartNum;
  newFullHeart.setAttribute('draggable', true);
  document.querySelector('.empty-heart').appendChild(newFullHeart);
  addEvents();

}

// EMPTY HEART LOGIC:
// Empty heart listeners
function addEvents() {

  for (const empty of document.querySelectorAll('.empty-heart')) {

    empty.addEventListener("dragover", function dragOver(e) {

      e.preventDefault();
    });

    empty.addEventListener("dragenter", function dragEnter(e) {

      e.preventDefault();
      this.classList.add('hovered');

    });

    empty.addEventListener("dragleave", function dragLeave() {

      clickedHeartId = event.target.id === null ? clickedHeartId : event.target.id;   //not sure if this prevents nulls, it sometimes appears
      this.classList.remove('hovered');

    });

    empty.addEventListener("drop", function dragDrop() {

      this.className = 'empty-heart';
      this.append(document.getElementById(clickedHeartId));

    });
  }
}

addEvents();



// add new empty heart div with a button -------------------------
const buttonEmpty = document.querySelector('.empty-button');

buttonEmpty.addEventListener('click', newEmptyCreate);

function newEmptyCreate() {

  var num = document.querySelector('.container').childElementCount;

  if (num < 8) {

    var newEmptyHeart = document.createElement("div");
    document.querySelector('.container').appendChild(newEmptyHeart);
    newEmptyHeart.className = 'empty-heart';
    addEvents();

  } else {
    buttonEmpty.innerHTML = 'No more slots available';
    buttonEmpty.classList.add("no-slots");

  }
}