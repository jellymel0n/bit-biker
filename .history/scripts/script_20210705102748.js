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

}


// Event Handlers
$('#savePlayer').on('click', function() {
    game.getPlayerName();
    $('#splash-screen').toggle();
    game.isRunning = true;
});

$('#btn-volume').on('click', function() {
    $('#btn-volume').toggle();
    $('#btn-mute').toggle();
})

$('#btn-mute').on('click', function() {
    $('#btn-volume').toggle();
    $('#btn-mute').toggle();
})

$('#btn-pause').on('click', function() {
    if (game.isRunning === true){
        $('#pause-screen').toggle();
    }
})