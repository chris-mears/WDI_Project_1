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

    //function to starts game hide manual section change game to visible and shows it.
    function start() {
        $('#gameManual').hide();
        $('#game').attr('class', 'visible');
        $('#game').show();
        runSequence();
    }
    //adds one randome number to sequence then lights up areas of game by changing class
    function runSequence() {
        gameSequence.sequence.push(gameSequence.rundomNumber());
        gameSequence.sequence.forEach(function(index) {
            $('#' + index).attr('class', Lights[index - 1]);
        });
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