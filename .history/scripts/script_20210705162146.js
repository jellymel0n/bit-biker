'use strict';

const game = {
    title: 'Bit Biker',
    isRunning: false,
    player: '',
    obstacles: [],
    keysPressed: [],
    bgLayers: [],
    bgProps: [],
    loopDuration: [1000 / 60],
    lastKeyFrame: null,

    getPlayerName: () => {
        game.player = $('#player-name').val();
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
        
    },
    addBGLayer: (oBGLayer) => {
        const [left, top] = oBGLayer.position;
        const [width, height] = oBGLayer.dimensions;
        game.bgLayers.push(oBGLayer);
        const domString = 
            `<div id="bgLayer-${Date.now()}"
            class="${oBGLayer.classes}"
            style="width:${width}px;
            height:${height}px;
            left:${left}px;
            top:${top}px;
            background-image:url('${oBGLayer.backgroundImage}');
            background-position-x:0px;
            background-position-y:0px;
            background-repeat: repeat-x;"
            ></div>`;
    oBGLayer.$dom = $(domString);
    $("#game-screen").append(oBGLayer.$dom);
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
    [0, 0], //position
    [1280, 390], //dimensions
    [-25, 0], //velocity
    undefined, // classes
    "assets/graphics/backgrounds/mountain-sky.png"
)
// addBG layer

const mediumBG = new BGLayer(
    [0, 390],
    [1280, 206],
    [-40, 0],
    undefined,
    "assets/graphics/backgrounds/bg-background-floor.png"
)
// add bg layer

const ground = new BGLayer(
    [0, 596],
    [1280, 124],
    [-100, 0],
    "bg-layer bg-ground",
    "assets/graphics/backgrounds/bg-ground.png"
)
// add bg layer

const rock = new BGProp(
    [1280, 420],
    [100, 100],
    [-100, 0],
    undefined,
    "assets/graphics/backgrounds/rock.png"
)
// add bgprop

const bird = new Obstacle(
    [1280, 600],
    [100, 100],
    [-40, 0],
    undefined,
    "assets/graphics/obstacles/bird.png"
)
// add obstacle

const smallBlock = new Obstacle(
    [1280, 596],
    [200, 210],
    [-100, 0],
    undefined,
    "assets/graphics/obstacles/spiked-square.png"
)
// add obstacle

const largeBlock = new Obstacle(
    [1280, 596],
    [200, 303],
    [-100, 0],
    undefined,
    "assets/graphics/obstacles/spiked-rectangle.png"
)
// add obstacle

const player = new Player(
    [70, 596],
    [100, 180],
    [0, 0],
    undefined,
    "assets/graphics/player/biker.png"
)
// add player


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

