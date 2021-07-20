'use strict';

const game = {
    title: 'Bit Biker',
    isRunning: false,
    playerName: '',
    obstacles: [],
    pressedKeys: [],
    bgLayers: [],
    bgProps: [],
    players:[],
    distance: 0,
    highScore: 0,
    loopDuration: [1000 / 60],
    lastKeyFrame: null,
    gravity: 40,
    gameLevel: 0,
    gameIntervals: [],
    song: $('#song-playback')[0],

    //Methods of game object
    songTimeCheck: () => {
        const songTime = game.song.currentTime;
        if (songTime >= 1 && songTime < 48){
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
        };
    },

    getPlayerName: () => {
        game.playerName = $('#player-name').val();
    },

    pauseAudio: () => {
        let song = $('#song-playback');
        song.trigger("pause");   
    },

    resetAudio: () => {
        let song = $('#song-playback');
        song [0].currentTime = 0;
        song.trigger("pause");
        
    },

    playAudio: () => {
        let song = $('#song-playback');
        song.trigger("play");
    },

    setup: () => {
        $(document).on('keydown',event => {
            if (event.which === 32) {
                event.preventDefault();
                if (game.pressedKeys.indexOf(32) < 0) {
                    game.pressedKeys.push(32);
                    console.log('spacebar down');
                    game.players[0].position[1] -= 10;
                }
            }
            else if (event.which === 38) {
                event.preventDefault();
                if (game.pressedKeys.indexOf(38) < 0) {
                    game.pressedKeys.push(38);
                    console.log('up-arrow down');
                }
            }
          });
        $(document).on('keyup', event => {
            if(event.which === 32 && game.pressedKeys.indexOf(32) >= 0) {  
                game.pressedKeys.splice(game.pressedKeys.indexOf(32),1);
                game.pressedKeys= [];
                console.log('spacebar up');
            }
            else if (event.which === 38 && game.pressedKeys.indexOf(38) >= 0) {
                game.pressedKeys.splice(game.pressedKeys.indexOf(38),1);
                game.pressedKeys = [];
                console.log('up-arrow up');
            }
        });
        const player = new Player(
            [70, 520],
            [170, 140],
            0,
            undefined,
            "assets/graphics/player/biker.png"
        );
        game.addPlayer(player);  
        
        const farBG = new BGLayer(
            [-5, 0], //position
            [1280, 390], //dimensions
            -25, //velocity
            undefined, // classes
            "assets/graphics/backgrounds/mountain-sky.png" //bg-image
        );
        game.addBGLayer(farBG);
        
        const mediumBG = new BGLayer(
            [-5, 390],
            [1280, 206],
            -40,
            undefined,
            "assets/graphics/backgrounds/bg-background-floor.png"
        );
        game.addBGLayer(mediumBG);
        
        const ground = new BGLayer(
            [-5, 596],
            [1280, 124],
            -100,
            "bg-layer bg-ground",
            "assets/graphics/backgrounds/bg-ground.png"
        );
        game.addBGLayer(ground);

        game.getHighScore();
    },

    startGame: (duration) => {
        if (duration > 0) {
            game.loopDuration = duration;
        }
        game.isRunning = true;
        if (game.isRunning === true) {
            game.gameIntervals[0] = window.setInterval(game.generateBGProp, 3000);
            game.gameIntervals[1] = window.setInterval( () => {
                
                if (game.gameLevel === 0){
                    game.generateObstacle(-600);
                } else if (game.gameLevel === 1) {
                    game.generateObstacle(-750);
                } else if (game.gameLevel === 2) {
                    game.generateObstacle(-900);
                } else if (game.gameLevel === 3) {
                    game.generateObstacle(-1000);
                } else if (game.gameLevel === 4) {
                    game.generateObstacle(-900);
                } else if (game.gameLevel === 5) {
                    game.generateObstacle(-750);
                } else if (game.gameLevel === 6) {
                    game.generateObstacle(-700);
                } else if (game.gameLevel === 7) {
                    game.generateObstacle(-600);
                }
            }, 2000);
            window.setInterval(game.songTimeCheck, 500);
            window.requestAnimationFrame(game.animationFrameLoop);
            game.distanceCalc();
        } 
    },

    highScoreCheck: () => {
        if (game.distance >= game.highScore) {
            game.highScore = game.distance;
            localStorage.setItem('highScoreText', `${game.playerName} - ${game.distance} m`);
            localStorage.setItem('highScoreNum', game.distance);

        }
    },

    getHighScore: () => {
        let HSText = localStorage.getItem('highScoreText');
        let HSNum = localStorage.getItem('highScoreNum');
        game.highScore = HSNum;
        $("#highScore-get").text(HSText);
    },

    stopGame: () => {
        game.isRunning = false;
        game.lastKeyFrame = null;
        clearInterval(game.gameIntervals[0]);
        clearInterval(game.gameIntervals[1]);
        clearInterval(game.gameIntervals[2]);
    },

    gameReset: () => {
        $('.obstacle, .bg-layer, .bg-prop, .player').remove();
        game.bgProps = [];
        game.bgLayers = [];
        game.obstacles = [];
        game.players = [];
        game.distance = 0;
        $('#distance-num').text(0);
        game.setup();
    },

    gameOver: () => {
        game.stopGame();
        game.pauseAudio();
        $('#gOver-screen').toggle();
        if (game.distance > game.highScore) {
            game.highScoreCheck();
            game.getHighScore();
            $('#highscoreCheck').text(`New Highscore! ${game.playerName}: ${game.highScore} m`);
        } else {
            $("#gOver-distance").text(`Distance: ${game.distance} m`);
        }

    },

    gameComplete: () => {
        game.stopGame();
        game.pauseAudio();
        $("#complete-screen").toggle();
        if (game.distance >= game.highScore) {
            game.highScoreCheck();
            game.getHighScore();
            $('#completeHSCheck').text(`New Highscore! ${game.playerName}: ${game.highScore} m`);
        } else {
            $("#complete-distance").text(`Distance: ${game.distance} m`);
        }
    },

    distanceCalc: () => {
        // const distanceDOM = $('#distance-num').text();
        let sum = game.distance;
        game.gameIntervals[2] = window.setInterval( () => {
            if (game.gameLevel === 0){
                let disNum = (sum += 2);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 1) {
                let disNum = (sum += 5);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 2) {
                let disNum = (sum += 10);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 3) {
                let disNum = (sum += 20);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 4) {
                let disNum = (sum += 15);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 5) {
                let disNum = (sum += 10);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 6) {
                let disNum = (sum += 5);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            } else if (game.gameLevel === 7) {
                let disNum = (sum += 2);
                $('#distance-num').text(disNum + " m");
                game.distance = disNum;
            }
        }, 1000)
    },

    addBGLayer: (oBGLayer) => {
        const [left, top] = oBGLayer.position;
        const [width, height] = oBGLayer.dimensions;
        game.bgLayers.push(oBGLayer);
        const objectStyles = 
            `<div id="bgLayer-${Date.now()}"
            class="${oBGLayer.classes}
            "style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oBGLayer.backgroundImage}');
            z-index: -5;
            background-position-x:0px;
            background-position-y:0px;
            background-repeat: repeat-x;"
            </div>`;
        oBGLayer.$dom = $(objectStyles);
        $("#game-board").append(oBGLayer.$dom);
    },

    addBGProp: (oBGProp) => {
        const [left, top] = oBGProp.position;
        const [width, height] = oBGProp.dimensions;
        game.bgProps.push(oBGProp);
        const objectStyles = 
            `<div id="bgLayer-${Date.now()}"
            class="${oBGProp.classes}
            "style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oBGProp.backgroundImage}');
            z-index: -1;
            background-position-x:0px;
            background-position-y:0px;
            background-repeat: no-repeat;"
            </div>`;
        oBGProp.$dom = $(objectStyles);
        $("#game-board").append(oBGProp.$dom);
        oBGProp.$dom.css('transition',`all ${game.loopDuration / 1000}s`);
    },

    removeBGProp: (oBGProp) => {
        game.bgProps.splice(game.bgProps.indexOf(oBGProp),1);
    },

    addObstacle: (oObstacle) => {
        const [left, top] = oObstacle.position;
        const [width, height] = oObstacle.dimensions;
        game.obstacles.push(oObstacle);
        const objectStyles = 
            `<div id="obstacle-${Date.now()}"
            class="${oObstacle.classes}
            "style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oObstacle.backgroundImage}');
            z-index: -1;
            background-position-x:0px;
            background-position-y:0px;
            background-repeat: no-repeat;"
            </div>`;
        oObstacle.$dom = $(objectStyles);
        $("#game-board").append(oObstacle.$dom);
        console.log(`Obstacle ${oObstacle} added`);
    },

    addPlayer: (oPlayer) => {
        const [left, top] = oPlayer.position;
        const [width, height] = oPlayer.dimensions;
        game.players.push(oPlayer);
        const objectStyles = 
            `<div id="player-${Date.now()}"
            class="${oPlayer.classes}
            "style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oPlayer.backgroundImage}');
            z-index: 1;
            background-position-x:0px;
            background-position-y:0px;
            background-repeat: no-repeat;"
            </div>`;
        oPlayer.$dom = $(objectStyles);
        $("#game-board").append(oPlayer.$dom);
    },

    generateBGProp: () => {
        if (game.bgProps.length < 4 && Math.random() > 0.7) {
            const yPosition = Math.floor(Math.random() * 30);
            const rock = new BGProp(
                [1280, 400 - yPosition],
                [100 - yPosition, 100 - yPosition],
                -80 + yPosition,
                
                undefined,
                "assets/graphics/backgrounds/rock.png"
            );
            game.addBGProp(rock)
        } 
    },

    generateObstacle: (oVelocity) => {
        let randInt = Math.random();
        const smallBlock = new Obstacle(
            [1280, 540], // position
            [140, 200], // dimensions
            oVelocity, // velocity -600
            undefined,
            "assets/graphics/obstacles/spiked-square.png"
        );
        const largeBlock = new Obstacle(
            [1280, 570],
            [200, 300],
            oVelocity,
            undefined,
            "assets/graphics/obstacles/spiked-rectangle.png"
        );
        const bird = new Obstacle(
            [1280, 80],
            [90, 100],
            oVelocity + 400,
            undefined,
            "assets/graphics/obstacles/bird.png"
        );
        if (randInt <= 0.5) {
            game.addObstacle(smallBlock);
        } else if (randInt > 0.5 && randInt < 0.8){
            game.addObstacle(largeBlock);
        } else {
            game.addObstacle(bird);
        }
    },

    animationFrameLoop: (ts) => {
        if (game.isRunning === false) {
            return;
        }
        if(game.lastKeyFrame === null) {
            game.lastKeyFrame = ts;
        }
        if (ts - game.loopDuration > game.lastKeyFrame) {
            const elapsedMSeconds = ts - game.lastKeyFrame;
            game.lastKeyFrame = ts;
            
            for (const player of game.players) {
                player.updatePosition(elapsedMSeconds);
            }
            for (const bg of game.bgLayers) {
                bg.updatePosition(elapsedMSeconds);
            }
            for (const prop of game.bgProps) {
                prop.updatePosition(elapsedMSeconds);
            }
            for (const obstacle of game.obstacles) {
                obstacle.updatePosition(elapsedMSeconds);
            }
        }
        window.requestAnimationFrame(game.animationFrameLoop);
    } 

}
// End of game object

// Object classes

class Obstacle {
    constructor ( 
        position = [0, 0],
        dimensions = [50, 50],
        velocity = 0,
        classes = 'obstacle',
        backgroundImage = ""
     ) {
        this.position = position;
        this.currentPosition = position;
        this.dimensions = dimensions;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
    }
    updatePosition(elapsedTimeMS = 1000) {
        const leftPosition = this.$dom.css("left");
        const newLeft =
          parseFloat(leftPosition.substr(0, leftPosition.length - 2)) +
          (this.velocity / 1000) * elapsedTimeMS;
        this.$dom.css("left", `${newLeft}px`);
        this.currentPosition[0] = newLeft;
        this.checkCollision();
    }
    checkCollision() {
        var gamePlayer = game.players[0];

        let obst = {x: this.currentPosition[0], y: this.currentPosition[1], width: this.dimensions[0], height: this.dimensions[1]};

        let playPos = {x: gamePlayer.currentPosition[0], y: gamePlayer.currentPosition[1], width: gamePlayer.dimensions[0], height: gamePlayer.dimensions[1]};

        if (obst.x < playPos.x + playPos.width && obst.x + obst.width > playPos.x && obst.y < playPos.y + playPos.height && obst.y + obst.height > playPos.y) {
            // game.gameOver();
            console.log('game-over');
        }
    }
}

class BGLayer {
    constructor (
        position = [0, 0],
        dimensions = [100, 100],
        velocity = 0,
        classes = 'bg-layer',
        backgroundImage = ""
    ) {
        this.dimensions = dimensions;
        this.position = position;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
    }
    updatePosition(elapsedTimeMS = 1000) {
        if (game.gameLevel === 1) {
            this.velocity = -50;
        } else if (game.gameLevel === 2) {
            this.velocity = -100;
        } else if (game.gameLevel === 3){
            this.velocity = -150;
        } else if (game.gameLevel === 4){
            this.velocity = -200;
        } else if (game.gameLevel === 5){
            this.velocity = -150;
        } else if (game.gameLevel === 6){
            this.velocity = -100;
        } else if (game.gameLevel === 7){
            this.velocity = -50;
        }

        const leftPosition = this.$dom.css("background-position-x");
        const newLeft =
          parseFloat(leftPosition.substr(0, leftPosition.length - 2)) +
          (this.velocity / 1000) * elapsedTimeMS;
        this.$dom.css("background-position-x", `${newLeft}px`);
    }
}

class BGProp {
    constructor (
        position = [0, 0],
        dimensions = [100, 100],
        velocity = 0,
        classes = 'bg-prop',
        backgroundImage = ""
    ) {
        this.dimensions = dimensions;
        this.position = position;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
    }
    updatePosition(elapsedTimeMS = 1000) {
        if (game.gameLevel === 1) {
            this.velocity = -125;
        } else if (game.gameLevel === 2) {
            this.velocity = -150;
        } else if (game.gameLevel === 3){
            this.velocity = -175;
        } else if (game.gameLevel === 4){
            this.velocity = -200;
        } else if (game.gameLevel === 5){
            this.velocity = -175;
        } else if (game.gameLevel === 6){
            this.velocity = -150;
        } else if (game.gameLevel === 7){
            this.velocity = -100;
        }
        const leftPosition = this.$dom.css("left");
        const newLeft =
          parseFloat(leftPosition.substr(0, leftPosition.length - 2)) +
          (this.velocity / 1000) * elapsedTimeMS;
        this.$dom.css("left", `${newLeft}px`);
        if ( (newLeft < -this.dimensions[0] && this.velocity < 0) || 
        (newLeft === -96 && this.velocity > 0 )) {
        game.removeBGProp(this);
        }   
    }
}

class Player {
    constructor (
        position = [0, 0],
        dimensions = [100, 100],
        velocity = 0,
        classes = 'player',
        backgroundImage = "",
        jumpMax = 190,
        currentPosition = [0, 0]
    ) {
        this.dimensions = dimensions;
        this.position = position;
        this.currentPosition = currentPosition;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
        this.currentJump = 0;
        this.jumpMax = jumpMax;
        this.isJumping = false;
    }
    updatePosition(elapsedTimeMS = 500) { // jump method
        if(game.pressedKeys[0] === 32) {
            if(this.currentJump < this.jumpMax) {
                this.currentJump += 10;
                this.position[1] -= 15;
                this.$dom.css('transform', 'rotate(-45deg)');
                this.$dom.css('border', '2px solid red');
                this.isJumping = true;
            }
        } else if (this.currentJump > 0) {
            this.isJumping = true;
            this.position[1] = this.currentJump * 0.3;
            this.currentJump = 0;
            this.jumpMax = 190;
            this.$dom.css('transform', 'rotate(0deg)');
            this.position[1] = 520;
            // if (this.position[1] < 520) {
            //     for (let i = this.position[1]; i < 520; i+=0.01) {
            //         this.position[1] = i;
            //     }
            // }
        }
        if (this.currentJump >= this.jumpMax){
            this.$dom.css('transform', 'rotate(0deg)');
            this.position[1] = 520;

            // if (this.position[1] < 520) {
            //     for (let i = this.position[1]; i < 520; i+= 0.01) {
            //         this.position[1] = i;
            //     }
            // }
        }
        const currentPosition = this.$dom.position();
        this.velocity += game.gravity;
        let newTop = currentPosition.top + (this.velocity / 1000) * elapsedTimeMS;
        if (newTop > this.position[1]) {
            this.isJumping = false;
            this.velocity = 0;
            newTop = game.players[0].position[1];
        }
        this.currentPosition[0] = this.position[0];
        this.currentPosition[1] = newTop; 
        this.$dom.css("top", `${newTop}px`);
    }
}

// End of object classes




// Event Handlers
$('#savePlayer').on('click', () => {
    if($('#player-name').val() === "") {
        $('#player-name').placeholder = "Name must be 1 or more characters";
    }
    if($('#player-name').val() !== ""){
        game.getPlayerName();
        $('#splash-screen').toggle();
        game.startGame();
        game.playAudio();
    }
});

$('#btn-volume').on('click', () => {
    $('#btn-volume').toggle();
    $('#btn-mute').toggle();
    $('#song-playback').prop('muted', true);
})

$('#btn-mute').on('click', () => {
    $('#btn-volume').toggle();
    $('#btn-mute').toggle();
    $('#song-playback').prop('muted', false);
})

$('#btn-pause').on('click', () => {
    if (game.isRunning === true){
        game.pauseAudio();
        $('#pause-screen').toggle();
        game.stopGame();
    }
})

$('#pause-close').on('click', () => {
    $('#pause-screen').toggle();
    game.startGame();
    game.playAudio();

})

$('#help-btn').on('click', () => {
    $('#pause-screen').toggle();
    $('#help-screen').toggle();
})

$('#quit-btn').on('click', () => {
    game.resetAudio();
    game.gameReset();
    $('#pause-screen').toggle();
    $('#splash-screen').toggle();
})

$('#resume-btn').on('click', () => {
    $('#help-screen').toggle();
    game.startGame();
    game.playAudio();
})

$('#help-quit-btn').on('click', () => {
    $('#help-screen').toggle();
    $('#splash-screen').toggle();
    game.resetAudio();
    game.gameReset();
})

$('#play-again-btn').on('click', () => {
    $('#gOver-screen').toggle();
    game.resetAudio();
    game.gameReset();
    game.startGame();
    game.playAudio();
    $('#highscoreCheck').text('');
    $("#gOver-distance").text('');
})

$("#gOver-quit-btn").on('click', () => {
    $('#gOver-screen').toggle();
    $('#splash-screen').toggle();
    game.resetAudio();
    game.gameReset();
    $('#highscoreCheck').text('');
    $("#gOver-distance").text('');
})

$("#complete-play-again-btn").on('click', () => {
    $("#complete-screen").toggle();
    game.resetAudio();
    game.gameReset();
    game.startGame();
    game.playAudio();  
    $('#completeHSCheck').text('');
    $("#complete-distance").text('');
    
})

$("#complete-quit-btn").on('click', () => {
    $("#complete-screen").toggle();
    $('#splash-screen').toggle();
    game.resetAudio();
    game.gameReset();
    $('#completeHSCheck').text('');
    $("#complete-distance").text('');
})

$('#song-playback').on('ended', () => {
    game.gameComplete();
})


// Call setup method
game.setup();