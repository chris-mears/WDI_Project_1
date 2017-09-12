$(() => {
    //Game Logic Section
    const gameSequence = {
        //keeps track of sequence
        sequence: [],
        //function to create a number between 1 and 4 for the sequence
        rundomNumber: function() {
            return Math.ceil((Math.random() * 4));
        },
        //keeps track of number of clicks
        clicked: 0,
        //used to help with the lightUp Sequence
        lighted: 0,
        //used to keep track of rounds
        round: 0,
        //used to keep track of highscore
        highScore: 0,
    }

    //Game Content Update Section
    //Reset Message
    const resetGame = {
        title: "Wrong one!",
        description: "Looks you made it to Round: ",
        description2: "<p>If you would like to see if you can beat your score please click Try Again.</p>",
        button: "Try Again"
    };

    //function to reload game
    function loadText(text) {
        $('#title').text(text.title);
        $('#description').html(text.description + gameSequence.round + text.description2);
        $('#start').text(text.button);
    };

    //array of lights classes for css
    const Lights = ["greenLight button", "redLight button", "yellowLight button", "blueLight button"];

    //array of nonlight classes for css
    const nonLights = ["green button", "red button", "yellow button", "blue button"];

    //controls the color change for the light
    function lightUp(i) {
        $('#' + i).attr('class', Lights[i - 1]);
        //used timeout here to allow the light to stay on for a little while
        setTimeout(function() {
            $('#' + i).attr('class', nonLights[i - 1]);
        }, 300);
    }

    function highestScore() {
        if (gameSequence.round > gameSequence.highScore) {
            gameSequence.highScore = gameSequence.round;
            $('#highScore').text(gameSequence.highScore);
        }
    }

    //runs the sequence for light up
    function runSequence() {
        highestScore();
        //timeout set up so that each ligth will go in sequence rather than lighting up together
        setTimeout(function() {
            lightUp(gameSequence.sequence[gameSequence.lighted]);
            gameSequence.lighted++;
            //keep track of how many have been lighted in sequence if less than total it runs function again
            if (gameSequence.lighted < gameSequence.sequence.length) {
                runSequence();
                //if the sequence has finished this starts the listening function
            } else {
                gameSequence.lighted = 0;
                clickListener();
            }
        }, 1000);
    };

    //starts next round by adding to sequence and starting runSequence function
    function nextRound() {
        gameSequence.round++;
        $('#round').text(gameSequence.round);
        gameSequence.sequence.push(gameSequence.rundomNumber());
        runSequence();
    };

    //function for listening for correct sequence of clicks
    function clickListener() {
        $('#1, #2, #3, #4').on('click', function() {
            //animates light up on click
            lightUp(this.id);
            //if correct click
            if (parseInt(this.id) === gameSequence.sequence[gameSequence.clicked]) {
                //if this click is the last click
                if (gameSequence.clicked === gameSequence.sequence.length - 1) {
                    console.log('right');
                    gameSequence.clicked = 0;
                    //turns event listener off after click to prevent the click looping through the function
                    $('#1, #2, #3, #4').off('click');
                    nextRound();
                    //if this click is not the last
                } else {
                    console.log('right');
                    gameSequence.clicked++;
                    //turns event listener off after click to prevent the click looping through the function
                    $('#1, #2, #3, #4').off('click');
                    clickListener();
                }
                //if this is the wrong click for the sequence
            } else {
                console.log('Wrong');
                //turns event listener off after click to prevent the click looping through the function
                $('#1, #2, #3, #4').off('click');
                loadText(resetGame);
                $('#game').hide();
                $('#gameManual').show();
                gameSequence.sequence = [];
                gameSequence.clicked = 0;
            }
        })
    };

    //App Operation Section
    //function to start game hide manual section change game to visible and shows it.
    function start() {
        $('#gameManual').hide();
        $('#game').attr('class', 'visible');
        $('#game').show();
        $('#score').attr('class', 'visible');
        $('#score').show();
        gameSequence.round = 1;
        $('#round').text(gameSequence.round);
        gameSequence.sequence.push(gameSequence.rundomNumber());
    };
    //hides game at start
    $('#game').hide();
    $('#score').hide();
    //waits for user to click start to iniate game
    $('#start').on('click', function() {
        start();
        runSequence();
    });
});