'use strict';

const game = {
    title: '.Run',
    isRunning: false,
    player: [],
    obstacles: [],
    keysPressed: [],
    bgLayers: [],
    bgObjects: [],
    loopDuration: [1000 / 50, 1000 / 60, 1000 / 70, 1000 / 80],
    lastKeyFrame: null,

    getPlayerName = function() {
        const name = $('#player-name').val();
        return name;
    },

}


$('#savePlayer').on('click', function() {
    game.player = game.getPlayerName();
    $('#splash-screen').hide();
    game.isRunning = true;
});