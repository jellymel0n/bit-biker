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
        this.player = $('#player-name').val();
    },

}


$('#savePlayer').on('click', function() {
    game.getPlayerName();
    $('#splash-screen').toggle();
    game.isRunning = true;
});