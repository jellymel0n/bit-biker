'use strict';

const game = {
    title: '.Run',
    isRunning: false,
    player: '',
    obstacles: [],
    keysPressed: [],
    bgLayers: [],
    bgObjects: [],
    loopDuration: [1000 / 50, 1000 / 60, 1000 / 70, 1000 / 80],
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
    [600, 600], //dimensions
    [-25, 0], //velocity
    undefined, // classes
    "assets/graphics/backgrounds/bg-mountains-sky.png"
)
// addBG layer

const mediumBG = new BGLayer(
    [0, 200],
    [600, 600],
    [-25, 0],
    undefined,
    "assets/graphics/backgrounds/bg-background-floor.png"
)
// add bg layer

const ground = new BGLayer(
    [0, 450],
    [600, 200],
    [-300, 0],
    "bg-layer bg-ground",
    "assets/graphics/backgrounds/bg-ground.png"
)
// add bg layer

const rock = new BGProp(
    [600, 350],
    [100, 100],
    [-80, 0],
    undefined,
    "assets/graphics/backgrounds/rock.png"
)
// add bgprop

const bird = new Obstacle(
    [400, 600],
    [100, 100],
    [-20, 0],
    undefined,
    "assets/graphics/obstacles/bird.png"
)
// add obstacle

const smallBlock = new Obstacle(
    [0, 450],
    [600, 200],
    [-300, 0],
    undefined,
    "assets/graphics/obstacles/spiked-square.png"
)
// add obstacle

const largeBlock = new Obstacle(
    [0, 450],
    [600, 200],
    [-300, 0],
    undefined,
    "assets/graphics/obstacles/spiked-rectangle.png"
)
// add obstacle

const player = new Player(
    [70, 430],
    [100, 100],
    [0, 0],
    undefined,
    "assets/graphics/player/biker.png"
)


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

