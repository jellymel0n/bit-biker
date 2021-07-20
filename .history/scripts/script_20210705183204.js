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
    loopDuration: [1000 / 60],
    lastKeyFrame: null,

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
    },

    addBGLayer: (oBGLayer) => {
        const [left, top] = oBGLayer.position;
        const [width, height] = oBGLayer.dimensions;
        game.bgLayers.push(oBGLayer);
        const objectStyles = 
            `<div id="bgLayer-${Date.now()}"
            class="${oBGLayer.classes}"
            style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oBGLayer.backgroundImage}');
            z-index: -1;
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
            class="${oBGProp.classes}"
            style="width:${width}px;
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

    addObstacle: (oObstacle) => {
        const [left, top] = oObstacle.position;
        const [width, height] = oObstacle.dimensions;
        game.obstacles.push(oObstacle);
        const objectStyles = 
            `<div id="obstacle-${Date.now()}"
            class="${oObstacle.classes}"
            style="width:${width}px;
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
            class="${oPlayer.classes}"               style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oPlayer.backgroundImage}');
            z-index: -1;
            background-position-x:0px;
            background-position-y:0px;
            background-repeat: no-repeat;"
            </div>`;
        oPlayer.$dom = $(objectStyles);
        $("#game-board").append(oPlayer.$dom);
    },

    animationFrameLoop: (ts) => {
        if (game.isRunning === false) {
            return;
        }
        if(game.lastKeyFrame === null) {
            game.lastKeyFrame = ts;
        } 
    } 

}



// Object classes

class Obstacle {
    constructor ( 
        position = [0, 0],
        dimensions = [50, 50],
        velocity = [0, 0],
        classes = 'obstacle',
        backgroundImage = ""
     ) {
        this.position = position;
        this.dimensions = dimensions;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
    }
}

class BGLayer {
    constructor (
        position = [0, 0],
        dimensions = [100, 100],
        velocity = [0, 0],
        classes = 'bg-layer',
        backgroundImage = ""
    ) {
        this.dimensions = dimensions;
        this.position = position;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
    }
}

class BGProp {
    constructor (
        position = [0, 0],
        dimensions = [100, 100],
        velocity = [0, 0],
        classes = 'bg-prop',
        backgroundImage = ""
    ) {
        this.dimensions = dimensions;
        this.position = position;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
    }
}

class Player {
    constructor (
        position = [0, 0],
        dimensions = [100, 100],
        velocity = [0, 0],
        classes = 'player',
        backgroundImage = "",
        jumpMax = 100
    ) {
        this.dimensions = dimensions;
        this.position = position;
        this.velocity = velocity;
        this.classes = classes;
        this.backgroundImage = backgroundImage;
        this.currentJump = 0;
        this.jumpMax = jumpMax;
        this.isJumping = false;
    }
}

// End of object classes

// Object instantiation 
const farBG = new BGLayer(
    [-5, 0], //position
    [1280, 390], //dimensions
    [-25, 0], //velocity
    undefined, // classes
    "assets/graphics/backgrounds/mountain-sky.png"
);
game.addBGLayer(farBG);

const mediumBG = new BGLayer(
    [-5, 390],
    [1280, 206],
    [-40, 0],
    undefined,
    "assets/graphics/backgrounds/bg-background-floor.png"
);
game.addBGLayer(mediumBG);

const ground = new BGLayer(
    [-5, 596],
    [1280, 124],
    [-100, 0],
    "bg-layer bg-ground",
    "assets/graphics/backgrounds/bg-ground.png"
);
game.addBGLayer(ground);

const rock = new BGProp(
    [1100, 400],
    [100, 100],
    [-100, 0],
    undefined,
    "assets/graphics/backgrounds/rock.png"
);
game.addBGProp(rock);

const bird = new Obstacle(
    [1000, 200],
    [100, 100],
    [-40, 0],
    undefined,
    "assets/graphics/obstacles/bird.png"
);
game.addObstacle(bird);

const smallBlock = new Obstacle(
    [1000, 500],
    [180, 200],
    [-100, 0],
    undefined,
    "assets/graphics/obstacles/spiked-square.png"
);
game.addObstacle(smallBlock);

const largeBlock = new Obstacle(
    [1280, 500],
    [330, 300],
    [-100, 0],
    undefined,
    "assets/graphics/obstacles/spiked-rectangle.png"
);
game.addObstacle(largeBlock);

const player = new Player(
    [70, 450],
    [260, 450],
    [0, 0],
    undefined,
    "assets/graphics/player/biker.png"
);
game.addPlayer(player);


// Event Handlers
$('#savePlayer').on('click', () => {
    game.getPlayerName();
    $('#splash-screen').toggle();
    game.isRunning = true;
    game.playAudio();
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
        game.isRunning = false;
    }
})

$('#pause-close').on('click', () => {
    $('#pause-screen').toggle();
    game.isRunning = true;
    game.playAudio();
})

$('#help-btn').on('click', () => {
    $('#pause-screen').toggle();
    $('#help-screen').toggle();
})

$('#quit-btn').on('click', () => {
    game.resetAudio();
    $('#pause-screen').toggle();
    $('#splash-screen').toggle();
})

$('#resume-btn').on('click', () => {
    $('#help-screen').toggle();
    game.isRunning = true;
    game.playAudio();
})

$('#help-quit-btn').on('click', () => {
    $('#help-screen').toggle();
    $('#splash-screen').toggle();
    game.resetAudio();
})


game.setup();