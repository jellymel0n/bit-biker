'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var game = {
  title: 'Bit Biker',
  isRunning: false,
  playerName: '',
  obstacles: [],
  pressedKeys: [],
  bgLayers: [],
  bgProps: [],
  players: [],
  loopDuration: [1000 / 60],
  speedDuration: 1000,
  speedFrame: null,
  lastKeyFrame: null,
  gravity: 90,
  gameLevel: 0,
  song: $('#song-playback')[0],
  songTimeCheck: function songTimeCheck() {
    var songTime = game.song.currentTime;

    if (songTime >= 1 && songTime < 48) {
      game.gameLevel = 0;
    } else if (songTime >= 48 && songTime < 91) {
      game.gameLevel = 1;
    } else if (songTime >= 91 && songTime < 129) {
      game.gameLevel = 2;
    } else if (songTime >= 129 && songTime < 164) {
      game.gameLevel = 3;
    } else if (songTime >= 164 && songTime < 168) {
      game.gameLevel = 4;
    } else if (songTime >= 168 && songTime < 175) {
      game.gameLevel = 5;
    } else if (songTime >= 175 && songTime < 180) {
      game.gameLevel = 6;
    } else if (songTime >= 180 && songTime < 185) {
      game.gameLevel = 7;
    }

    ; // console.log('song time checked!', songTime);
  },
  getPlayerName: function getPlayerName() {
    game.playerName = $('#player-name').val();
  },
  pauseAudio: function pauseAudio() {
    var song = $('#song-playback');
    song.trigger("pause");
  },
  resetAudio: function resetAudio() {
    var song = $('#song-playback');
    song[0].currentTime = 0;
    song.trigger("pause");
  },
  playAudio: function playAudio() {
    var song = $('#song-playback');
    song.trigger("play");
  },
  setup: function setup() {
    $(document).on('keydown', function (event) {
      if (event.which === 32) {
        event.preventDefault();

        if (game.pressedKeys.indexOf(32) < 0) {
          game.pressedKeys.push(32);
          console.log('spacebar down');
          game.players[0].position[1] -= 10;
        }
      } else if (event.which === 38) {
        event.preventDefault();

        if (game.pressedKeys.indexOf(38) < 0) {
          game.pressedKeys.push(38);
          console.log('up-arrow down');
        }
      }
    });
    $(document).on('keyup', function (event) {
      if (event.which === 32 && game.pressedKeys.indexOf(32) >= 0) {
        game.pressedKeys.splice(game.pressedKeys.indexOf(32), 1);
        game.pressedKeys = [];
        console.log('spacebar up');
      } else if (event.which === 38 && game.pressedKeys.indexOf(38) >= 0) {
        game.pressedKeys.splice(game.pressedKeys.indexOf(38), 1);
        game.pressedKeys = [];
        console.log('up-arrow up');
      }
    });
  },
  startGame: function startGame(duration) {
    if (duration > 0) {
      game.loopDuration = duration;
    }

    game.isRunning = true;

    if (game.isRunning === true) {
      window.setInterval(game.generateBGProp, 3000);
      window.setInterval(function () {
        if (game.song.currentTime <= 48) {
          game.generateObstacle(-600);
        } else if (game.song.currentTime > 48 && game.song.currentTime <= 91) {
          game.generateObstacle(-750);
        } else if (game.song.currentTime > 91 && game.song.currentTime <= 129) {
          game.generateObstacle(-900);
        } else if (game.song.currentTime > 129 && game.song.currentTime <= 164) {
          game.generateObstacle(-1000);
        } else if (game.song.currentTime > 164 && game.song.currentTime <= 168) {
          game.generateObstacle(-900);
        } else if (game.song.currentTime > 168 && game.song.currentTime <= 175) {
          game.generateObstacle(-750);
        } else if (game.song.currentTime > 175 && game.song.currentTime <= 180) {
          game.generateObstacle(-700);
        } else if (game.song.currentTime > 180 && game.song.currentTime < 185) {
          game.generateObstacle(-600);
        }
      }, 2000);
      window.setInterval(game.songTimeCheck, 500);
      window.requestAnimationFrame(game.animationFrameLoop);
    }
  },
  stopGame: function stopGame() {
    game.isRunning = false;
    game.lastKeyFrame = null;
    window.clearInterval(game.generateObstacle);
  },
  addBGLayer: function addBGLayer(oBGLayer) {
    var _oBGLayer$position = _slicedToArray(oBGLayer.position, 2),
        left = _oBGLayer$position[0],
        top = _oBGLayer$position[1];

    var _oBGLayer$dimensions = _slicedToArray(oBGLayer.dimensions, 2),
        width = _oBGLayer$dimensions[0],
        height = _oBGLayer$dimensions[1];

    game.bgLayers.push(oBGLayer);
    var objectStyles = "<div id=\"bgLayer-".concat(Date.now(), "\"\n            class=\"").concat(oBGLayer.classes, "\n            \"style=\"width:").concat(width, "px;\n            height:").concat(height, "px;\n            left:").concat(left, "px;\n            top:").concat(top, "px;\n            background-image:url('").concat(oBGLayer.backgroundImage, "');\n            z-index: -5;\n            background-position-x:0px;\n            background-position-y:0px;\n            background-repeat: repeat-x;\"\n            </div>");
    oBGLayer.$dom = $(objectStyles);
    $("#game-board").append(oBGLayer.$dom);
  },
  addBGProp: function addBGProp(oBGProp) {
    var _oBGProp$position = _slicedToArray(oBGProp.position, 2),
        left = _oBGProp$position[0],
        top = _oBGProp$position[1];

    var _oBGProp$dimensions = _slicedToArray(oBGProp.dimensions, 2),
        width = _oBGProp$dimensions[0],
        height = _oBGProp$dimensions[1];

    game.bgProps.push(oBGProp);
    var objectStyles = "<div id=\"bgLayer-".concat(Date.now(), "\"\n            class=\"").concat(oBGProp.classes, "\n            \"style=\"width:").concat(width, "px;\n            height:").concat(height, "px;\n            left:").concat(left, "px;\n            top:").concat(top, "px;\n            background-image:url('").concat(oBGProp.backgroundImage, "');\n            z-index: -1;\n            background-position-x:0px;\n            background-position-y:0px;\n            background-repeat: no-repeat;\"\n            </div>");
    oBGProp.$dom = $(objectStyles);
    $("#game-board").append(oBGProp.$dom);
    oBGProp.$dom.css('transition', "all ".concat(game.loopDuration / 1000, "s"));
  },
  removeBGProp: function removeBGProp(oBGProp) {
    game.bgProps.splice(game.bgProps.indexOf(oBGProp), 1);
  },
  addObstacle: function addObstacle(oObstacle) {
    var _oObstacle$position = _slicedToArray(oObstacle.position, 2),
        left = _oObstacle$position[0],
        top = _oObstacle$position[1];

    var _oObstacle$dimensions = _slicedToArray(oObstacle.dimensions, 2),
        width = _oObstacle$dimensions[0],
        height = _oObstacle$dimensions[1];

    game.obstacles.push(oObstacle);
    var objectStyles = "<div id=\"obstacle-".concat(Date.now(), "\"\n            class=\"").concat(oObstacle.classes, "\n            \"style=\"width:").concat(width, "px;\n            height:").concat(height, "px;\n            left:").concat(left, "px;\n            top:").concat(top, "px;\n            background-image:url('").concat(oObstacle.backgroundImage, "');\n            z-index: -1;\n            background-position-x:0px;\n            background-position-y:0px;\n            background-repeat: no-repeat;\"\n            </div>");
    oObstacle.$dom = $(objectStyles);
    $("#game-board").append(oObstacle.$dom);
    console.log("Obstacle ".concat(oObstacle, " added"));
  },
  addPlayer: function addPlayer(oPlayer) {
    var _oPlayer$position = _slicedToArray(oPlayer.position, 2),
        left = _oPlayer$position[0],
        top = _oPlayer$position[1];

    var _oPlayer$dimensions = _slicedToArray(oPlayer.dimensions, 2),
        width = _oPlayer$dimensions[0],
        height = _oPlayer$dimensions[1];

    game.players.push(oPlayer);
    var objectStyles = "<div id=\"player-".concat(Date.now(), "\"\n            class=\"").concat(oPlayer.classes, "\n            \"style=\"width:").concat(width, "px;\n            height:").concat(height, "px;\n            left:").concat(left, "px;\n            top:").concat(top, "px;\n            background-image:url('").concat(oPlayer.backgroundImage, "');\n            z-index: 1;\n            background-position-x:0px;\n            background-position-y:0px;\n            background-repeat: no-repeat;\"\n            </div>");
    oPlayer.$dom = $(objectStyles);
    $("#game-board").append(oPlayer.$dom);
  },
  generateBGProp: function generateBGProp() {
    if (game.bgProps.length < 4 && Math.random() > 0.7) {
      var yPosition = Math.floor(Math.random() * 30);
      var rock = new BGProp([1280, 400 - yPosition], [100 - yPosition, 100 - yPosition], -80 + yPosition, undefined, "assets/graphics/backgrounds/rock.png");
      game.addBGProp(rock);
    }
  },
  generateObstacle: function generateObstacle(oVelocity) {
    var randInt = Math.random();
    var smallBlock = new Obstacle([1280, 540], // position
    [140, 200], // dimensions
    oVelocity, // velocity -600
    undefined, "assets/graphics/obstacles/spiked-square.png");
    var largeBlock = new Obstacle([1280, 570], [200, 300], oVelocity, undefined, "assets/graphics/obstacles/spiked-rectangle.png");
    var bird = new Obstacle([1280, 80], [90, 100], oVelocity + 400, undefined, "assets/graphics/obstacles/bird.png");

    if (randInt <= 0.5) {
      game.addObstacle(smallBlock);
    } else if (randInt > 0.5 && randInt < 0.8) {
      game.addObstacle(largeBlock);
    } else {
      game.addObstacle(bird);
    }
  },
  animationFrameLoop: function animationFrameLoop(ts) {
    if (game.isRunning === false) {
      return;
    }

    if (game.lastKeyFrame === null) {
      game.lastKeyFrame = ts;
    }

    if (game.speedFrame === null) {
      game.speedFrame = ts;
    }

    if (ts - game.speedDuration > game.speedFrame) {
      game.speedFrame = ts; // if (song [0].currentTime > 0 && song [0].currentTime >= 48)
      // if (game.song.currentTime >= 5 && game.gameLevel === 0) {
      //     game.gameLevel++
      //     game.bgLayers[0].velocity -= 2;
      // }
      // if (game.song.currentTime >= 6 && game.gameLevel === 1) {
      //     game.gameLevel++
      //     game.bgLayers[0].velocity -= 2;
      // }
    }

    if (ts - game.loopDuration > game.lastKeyFrame) {
      var elapsedMSeconds = ts - game.lastKeyFrame;
      game.lastKeyFrame = ts; // Add updateposition to the obstacles, bglayers, bgprops, and player
      // console.log(`last key frame: ${game.lastKeyFrame}`);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = game.players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _player = _step.value;

          _player.updatePosition(elapsedMSeconds);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = game.bgLayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var bg = _step2.value;
          bg.updatePosition(elapsedMSeconds);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = game.bgProps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prop = _step3.value;
          prop.updatePosition(elapsedMSeconds);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = game.obstacles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var obstacle = _step4.value;
          obstacle.updatePosition(elapsedMSeconds);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    } //set game stages (levels) for timing functions


    window.requestAnimationFrame(game.animationFrameLoop);
  }
}; // Object classes

var Obstacle =
/*#__PURE__*/
function () {
  function Obstacle() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [50, 50];
    var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'obstacle';
    var backgroundImage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

    _classCallCheck(this, Obstacle);

    this.position = position;
    this.dimensions = dimensions;
    this.velocity = velocity;
    this.classes = classes;
    this.backgroundImage = backgroundImage;
  }

  _createClass(Obstacle, [{
    key: "updatePosition",
    value: function updatePosition() {
      var elapsedTimeMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var leftPosition = this.$dom.css("left");
      var newLeft = parseFloat(leftPosition.substr(0, leftPosition.length - 2)) + this.velocity / 1000 * elapsedTimeMS;
      this.$dom.css("left", "".concat(newLeft, "px"));
    }
  }]);

  return Obstacle;
}();

var BGLayer =
/*#__PURE__*/
function () {
  function BGLayer() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [100, 100];
    var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bg-layer';
    var backgroundImage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

    _classCallCheck(this, BGLayer);

    this.dimensions = dimensions;
    this.position = position;
    this.velocity = velocity;
    this.classes = classes;
    this.backgroundImage = backgroundImage;
  }

  _createClass(BGLayer, [{
    key: "updatePosition",
    value: function updatePosition() {
      var elapsedTimeMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      if (game.gameLevel === 1) {
        this.velocity = -50;
      } else if (game.gameLevel === 2) {
        this.velocity = -100;
      } else if (game.gameLevel === 3) {
        this.velocity = -150;
      } else if (game.gameLevel === 4) {
        this.velocity = -200;
      } else if (game.gameLevel === 5) {
        this.velocity = -150;
      } else if (game.gameLevel === 6) {
        this.velocity = -100;
      } else if (game.gameLevel === 7) {
        this.velocity = -50;
      }

      var leftPosition = this.$dom.css("background-position-x");
      var newLeft = parseFloat(leftPosition.substr(0, leftPosition.length - 2)) + this.velocity / 1000 * elapsedTimeMS;
      this.$dom.css("background-position-x", "".concat(newLeft, "px"));
    }
  }]);

  return BGLayer;
}();

var BGProp =
/*#__PURE__*/
function () {
  function BGProp() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [100, 100];
    var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bg-prop';
    var backgroundImage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

    _classCallCheck(this, BGProp);

    this.dimensions = dimensions;
    this.position = position;
    this.velocity = velocity;
    this.classes = classes;
    this.backgroundImage = backgroundImage;
  }

  _createClass(BGProp, [{
    key: "updatePosition",
    value: function updatePosition() {
      var elapsedTimeMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      if (game.gameLevel === 1) {
        this.velocity = -125;
      } else if (game.gameLevel === 2) {
        this.velocity = -150;
      } else if (game.gameLevel === 3) {
        this.velocity = -175;
      } else if (game.gameLevel === 4) {
        this.velocity = -200;
      } else if (game.gameLevel === 5) {
        this.velocity = -175;
      } else if (game.gameLevel === 6) {
        this.velocity = -150;
      } else if (game.gameLevel === 7) {
        this.velocity = -100;
      }

      var leftPosition = this.$dom.css("left");
      var newLeft = parseFloat(leftPosition.substr(0, leftPosition.length - 2)) + this.velocity / 1000 * elapsedTimeMS;
      this.$dom.css("left", "".concat(newLeft, "px"));

      if (newLeft < -this.dimensions[0] && this.velocity < 0 || newLeft === -96 && this.velocity > 0) {
        game.removeBGProp(this);
      }
    }
  }]);

  return BGProp;
}();

var Player =
/*#__PURE__*/
function () {
  function Player() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [100, 100];
    var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'player';
    var backgroundImage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var jumpMax = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 190;

    _classCallCheck(this, Player);

    this.dimensions = dimensions;
    this.position = position;
    this.velocity = velocity;
    this.classes = classes;
    this.backgroundImage = backgroundImage;
    this.currentJump = 0;
    this.jumpMax = jumpMax;
    this.isJumping = false;
  }

  _createClass(Player, [{
    key: "updatePosition",
    value: function updatePosition() {
      var elapsedTimeMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

      // jump method
      if (game.pressedKeys[0] === 32 && this.isJumping === false) {
        if (this.currentJump < this.jumpMax) {
          this.currentJump += 10;
          this.position[1] -= 25;
          this.$dom.css('transform', 'rotate(-45deg)');
          this.isJumping = true;
        }
      } else if (this.currentJump > 0) {
        this.isJumping = true;
        this.position[1] = this.currentJump * 0.9;
        this.currentJump = 0;
        this.jumpMax = 190;
        this.$dom.css('transform', 'rotate(0deg)');
        this.position[1] = 490;
      }

      if (this.currentJump >= this.jumpMax) {
        this.$dom.css('transform', 'rotate(0deg)');
        this.position[1] = 490;
      }

      var currentPosition = this.$dom.position();
      this.velocity += game.gravity;
      var newTop = currentPosition.top + this.velocity / 1000 * elapsedTimeMS;

      if (newTop > this.position[1]) {
        this.isJumping = false;
        this.velocity = 0;
        newTop = game.players[0].position[1];
      }

      this.$dom.css("top", "".concat(newTop, "px"));
    }
  }]);

  return Player;
}(); // End of object classes
// Object instantiation 


var farBG = new BGLayer([-5, 0], //position
[1280, 390], //dimensions
-25, //velocity
undefined, // classes
"assets/graphics/backgrounds/mountain-sky.png" //bg-image
);
game.addBGLayer(farBG);
var mediumBG = new BGLayer([-5, 390], [1280, 206], -40, undefined, "assets/graphics/backgrounds/bg-background-floor.png");
game.addBGLayer(mediumBG);
var ground = new BGLayer([-5, 596], [1280, 124], -100, "bg-layer bg-ground", "assets/graphics/backgrounds/bg-ground.png");
game.addBGLayer(ground); // const bird = new Obstacle(
//     [1000, 80],
//     [90, 100],
//     -100,
//     undefined,
//     "assets/graphics/obstacles/bird.png"
// );
// game.addObstacle(bird);
// const smallBlock = new Obstacle(
//     [1280, 540],
//     [140, 200],
//     -600,
//     undefined,
//     "assets/graphics/obstacles/spiked-square.png"
// );
// game.addObstacle(smallBlock);
// const largeBlock = new Obstacle(
//     [1850, 570],
//     [200, 300],
//     -600,
//     undefined,
//     "assets/graphics/obstacles/spiked-rectangle.png"
// );
// game.addObstacle(largeBlock);

var player = new Player([70, 490], [200, 450], 0, undefined, "assets/graphics/player/biker.png");
game.addPlayer(player); // Event Handlers

$('#savePlayer').on('click', function () {
  game.getPlayerName();
  $('#splash-screen').toggle();
  game.startGame();
  game.playAudio();
});
$('#btn-volume').on('click', function () {
  $('#btn-volume').toggle();
  $('#btn-mute').toggle();
  $('#song-playback').prop('muted', true);
});
$('#btn-mute').on('click', function () {
  $('#btn-volume').toggle();
  $('#btn-mute').toggle();
  $('#song-playback').prop('muted', false);
});
$('#btn-pause').on('click', function () {
  if (game.isRunning === true) {
    game.pauseAudio();
    $('#pause-screen').toggle();
    game.stopGame();
  }
});
$('#pause-close').on('click', function () {
  $('#pause-screen').toggle();
  game.startGame();
  game.playAudio();
});
$('#help-btn').on('click', function () {
  $('#pause-screen').toggle();
  $('#help-screen').toggle();
});
$('#quit-btn').on('click', function () {
  game.resetAudio();
  $('#pause-screen').toggle();
  $('#splash-screen').toggle();
});
$('#resume-btn').on('click', function () {
  $('#help-screen').toggle();
  game.isRunning = true;
  game.playAudio();
});
$('#help-quit-btn').on('click', function () {
  $('#help-screen').toggle();
  $('#splash-screen').toggle();
  game.resetAudio();
});
game.setup();