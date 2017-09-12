$(() => {
    //Game Logic Section
    const gameSequence = {
        sequence: [],
        rundomNumber: function() {
            return Math.ceil((Math.random() * 4));
        },
        clicked: 0,
        lighted: 0,
    }

    //Game Content Update Section

    //array of lights classes for css
    const Lights = ["greenLight button", "redLight button", "yellowLight button", "blueLight button"];

    //array of nonlight classes for css
    const nonLights = ["green button", "red button", "yellow button", "blue button"];

    //controls the color change for the light
    function lightUp(i) {
        $('#' + i).attr('class', Lights[i - 1]);
        setTimeout(function() {
            $('#' + i).attr('class', nonLights[i - 1]);
        }, 200);
    }

    //adds one random number to sequence then lights up areas of game by changing class
    function runSequence() {
        setTimeout(function() {
            lightUp(gameSequence.sequence[gameSequence.lighted]);
            gameSequence.lighted++;
            if (gameSequence.lighted < gameSequence.sequence.length) {
                runSequence();
            } else {
                gameSequence.lighted = 0;
            }
        }, 1000);
    };

    //function for listening for correct sequence of clicks
    function clickListener() {

    };

    //function to starts game hide manual section change game to visible and shows it.
    function start() {
        $('#gameManual').hide();
        $('#game').attr('class', 'visible');
        $('#game').show();
        gameSequence.sequence.push(gameSequence.rundomNumber());
    };
    //App Operation Section
    $('#game').hide();
    $('#start').on('click', function() {
        start();
        runSequence();
        $('#test').on('click', function() {
            gameSequence.sequence.push(gameSequence.rundomNumber());
            runSequence();
        })
    });



});