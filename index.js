var tiles = document.querySelectorAll('#turnabout span');
var clicksValElem = document.getElementById("info-val-clicks");

var gamePatterns = [
    [1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
    [1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1]
]
var gamesPlayed = [];

var shakingElements = [];

var numClicks = 0;
var currGame = 0;
var selGamePattern = [];

var menuTileRestart = document.getElementById("menu-tile-restart");
menuTileRestart.addEventListener("click", onClickRestart, false);

var menuTileNewGame = document.getElementById("menu-tile-newgame");
menuTileNewGame.addEventListener("click", onClickNewGame, false);

function init(n) {
    for(var x = 0; x < gamePatterns.length; x++) {
        gamesPlayed.push(0);
    }

    for(var i = 0; i < tiles.length; i++) {
        tiles[i].onclick = function(e) {
            var tileID = this.id;
            var ndx = tileID.indexOf("-");
            var id = tileID.substr(ndx+1);

            flipTile(id);

            turnOtherTiles(parseInt(id));

            checkBoard();
        }
    }

    currGame = n;

    setGamePattern(currGame);
}

function onClickRestart() {
    clicksValElem.innerHTML = 0;

    setGamePattern(currGame);
}

function onClickNewGame() {
    var result = null;

    for(var x = 0; x < gamesPlayed.length; x++) {
        if(gamesPlayed[x] == 0) {
            currGame = x;

            setGamePattern(currGame);

            break; 
        }
    }
}

function findNextGame(arr, test, ctx) {
    var result = null;

    gamesPlayed.some(function(el, i) {
        return test.call(ctx, el, i, arr) ? ((result = el), true) : false;
    });
    return result;
}

function turnOtherTiles(id) {
    //Top
    if((id - 5) > 0) {
        flipTile(id - 5);
    }

    // Right
    if((id + 1) < 26 && (id % 5) != 0) {
        flipTile(id + 1);
    }

    // Bottom
    if((id + 5) < 26) {
        flipTile(id + 5);
    }

    // Left
    if((id - 1) > 0 && ((id - 1) % 5) != 0) {
        flipTile(id - 1);
    }
}

function flipTile(id) {
    var elem = document.getElementById('tile-' + id);

    shake(elem);

    if(elem.className == 'on') {
        elem.className = 'off'
    } else {
        elem.className = 'on'
    }
}

function checkBoard() {
    var numOn = 0;
    var numOff = 0;

    for(var i = 0; i < selGamePattern.length; i++) {
        if(document.getElementById('tile-' + (i + 1)).className == 'on') {
            numOn++;
        }
        if(document.getElementById('tile-' + (i + 1)).className == 'off') {
            numOff++;
        }
    }

    if(numOn == 25 || numOff == 25) {
        alert('WINNER!! WINNER!! CHICKEN DINNER!!');
    } else {
        numClicks++;

        clicksValElem.innerHTML = numClicks;
    }
}

function setGamePattern(ndx) {
    var garr = gamePatterns[ndx];

    selGamePattern = garr;

    for(var i = 0; i < garr.length; i++) {
        if(garr[i] == 1) {
            document.getElementById('tile-' + (i + 1)).className = 'on';
        } else {
            document.getElementById('tile-' + (i + 1)).className = 'off';
        }
    }

    gamesPlayed[ndx] = 1;
}

var shake = function (element, magnitude = 40, angular = false) {
  //First set the initial tilt angle to the right (+1) 
  var tiltAngle = 1;

  //A counter to count the number of shakes
  var counter = 1;

  //The total number of shakes (there will be 1 shake per frame)
  var numberOfShakes = 20;

  //Capture the element's position and angle so you can
  //restore them after the shaking has finished
  var startX = 0,
      startY = 0,
      startAngle = 0;

  // Divide the magnitude into 10 units so that you can 
  // reduce the amount of shake by 10 percent each frame
  var magnitudeUnit = magnitude / numberOfShakes;

  //The `randomInt` helper function
  var randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Add the element to the `shakingElements` array if it
  //isn't already there
  if(shakingElements.indexOf(element) === -1) {
    console.log("added: ", element)
    shakingElements.push(element);

    //Add an `updateShake` method to the element.
    //The `updateShake` method will be called each frame
    //in the game loop. The shake effect type can be either
    //up and down (x/y shaking) or angular (rotational shaking).
    upAndDownShake();
  }

  //The `upAndDownShake` function
  function upAndDownShake() {

    //Shake the element while the `counter` is less than 
    //the `numberOfShakes`
    if (counter < numberOfShakes) {

      //Reset the element's position at the start of each shake
      element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Randomly change the element's position
      var randomX = randomInt(-magnitude, magnitude);
      var randomY = randomInt(-magnitude, magnitude);

      element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

      //Add 1 to the counter
      counter += 1;

      requestAnimationFrame(upAndDownShake);
    }

    //When the shaking is finished, restore the element to its original 
    //position and remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = 'translate(' + startX + ', ' + startY + ')';
      shakingElements.splice(shakingElements.indexOf(element), 1);
    }
  }

};

init(currGame);


// Better way???
//var tilesParent = document.querySelector("#turnabout");
//tilesParent.addEventListener("click", doSomething, false);
