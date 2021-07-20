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
        if (song.paused === false) {
            song.pause();
        } 
    },
    resetAudio: () => {
        let song = $('#song-playback');
        song.pause();
        song.currentTime = 0;
    },
    playAudio: () => {
        let song = $(audio'#song-playback');
        song.play();
    },

}



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
})

$('#btn-mute').on('click', () => {
    $('#btn-volume').toggle();
    $('#btn-mute').toggle();
})

$('#btn-pause').on('click', () => {
    if (game.isRunning === true){
        $('#pause-screen').toggle();
        game.isRunning = false;
    }
})

$('#pause-close').on('click', () => {
    $('#pause-screen').toggle();
    game.isRunning = true;
})

$('#help-btn').on('click', () => {
    $('#pause-screen').toggle();
    $('#help-screen').toggle();
})

$('#quit-btn').on('click', () => {
    $('#pause-screen').toggle();
    $('#splash-screen').toggle();
})

$('#resume-btn').on('click', () => {
    $('#help-screen').toggle();
    game.isRunning = true;
})

$('#help-quit-btn').on('click', () => {
    $('#help-screen').toggle();
    $('#splash-screen').toggle();
})

