$(() => {
    //Game Logic Section
    const gameSequence = {
        sequence: [],
        rundomNumber: function() {
            return Math.ceil((Math.random() * 4));
        }
    }

    //Game Content Update Section

    //array of lights classes for css
    const Lights = ["greenLight button", "redLight button", "yellowLight button", "blueLight button"];

    //array of nonlight classes for css
    const nonLights = ["green button", "red button", "yellow button", "blue button"];

    function lightUp(i) {
        setTimeout(function() {
            let index = gameSequence.sequence[i];
            $('#' + index).attr('class', Lights[index - 1]);
            setTimeout(function() {
                $('#' + index).attr('class', nonLights[index - 1]);
            }, 1000 * i);
        }, 1000 * i);
    }

    //function to starts game hide manual section change game to visible and shows it.
    function start() {
        $('#gameManual').hide();
        $('#game').attr('class', 'visible');
        $('#game').show();
        runSequence();
    }
    //adds one random number to sequence then lights up areas of game by changing class
    function runSequence() {
        gameSequence.sequence.push(gameSequence.rundomNumber());
        for (let i = 0; i < gameSequence.sequence.length; i++) {
            lightUp(i);
        };
        console.log(gameSequence.sequence);
    }
    //App Operation Section
    $('#game').hide();
    $('#start').on('click', function() {
        start();
        $('#test').on('click', function() {
            runSequence();
        })
    });



});