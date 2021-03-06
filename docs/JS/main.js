$(() => {
    //Game Sequence Logic Section
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
        //difficulty value
        difficulty: "easy",
        //tracks medium mode
        medium: false,
        //tracks hard mode
        hard: false,
        //speed of light up for SetTimeout in lightUP default is 300
        lightSpeed: 50,
        //speed of sequence firing for runSequence default is 1000
        seqSpeed: 100,
    }

    //Game Content Update Section
    //Reset Message
    const resetGame = {
        title: "Wrong one!",
        description: "Looks you made it to Round: ",
        description2: "<br>Try again to beat your score or try a harder setting.",
    };

    //array of lights classes for css
    const Lights = ["greenLight button", "redLight button", "yellowLight button", "blueLight button"];

    //array of nonlight classes for css
    const nonLights = ["green button", "red button", "yellow button", "blue button"];

    //array of sounds
    const sounds = ['./audio/tone-1.wav', './audio/tone-2.wav', './audio/tone-3.wav', './audio/tone-4.wav', './audio/wrong.wav'];
    const audio = $('#sound');

    //function to reload game
    function loadText(text) {
        $('#title').text(text.title);
        $('#description').html(text.description + gameSequence.round + text.description2);
    };

    //creates sound
    function makeSound(i) {
        //audio wasn't playing every sound with play, added a pause, load and built an array to insert each sound when needed
        $('#sound').attr('src', sounds[i - 1]);
        audio[0].pause();
        audio[0].load();
        audio[0].play();
    }

    //controls the color change for the light and sound
    function lightUp(i) {
        //trying to get audio to work here
        makeSound(i);
        //changes class to create light effect
        $(`[data-id="${i}"]`).attr('class', Lights[i - 1]);
        //used timeout here to allow the light to stay on for a little while
        setTimeout(function() {
            $(`[data-id="${i}"]`).attr('class', nonLights[i - 1]);
        }, gameSequence.lightSpeed);
    }

    //logic for hard mode functionality
    function hardMode() {
        let panels = [
            { id: 1, class: "green", },
            { id: 2, class: "red", },
            { id: 3, class: "yellow", },
            { id: 4, class: "blue" }
        ];
        //takes above array and randomizes it then puts back into array
        for (let i = panels.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = panels[i];
            panels[i] = panels[j];
            panels[j] = temp;
            //console.log(i, j);
        }
        //take shiffled array and updates class and data-id to change panel
        $("#a").attr({ 'class': panels[0].class, "data-id": panels[0].id });
        $("#b").attr({ 'class': panels[1].class, "data-id": panels[1].id });
        $("#c").attr({ 'class': panels[2].class, "data-id": panels[2].id });
        $("#d").attr({ 'class': panels[3].class, "data-id": panels[3].id });
    }

    //logic for highscore count
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
                setTimeout(function() {
                    if (gameSequence.hard === true) {
                        hardMode();
                    }
                    clickListener();
                }, 500);
            }
        }, gameSequence.seqSpeed);
    };

    //starts next round by adding to sequence and starting runSequence function
    function nextRound() {
        gameSequence.round++;
        //logic for medium difficulty to cause sequence to get faster
        if (gameSequence.medium === true) {
            if (gameSequence.round < 10) {
                gameSequence.lightSpeed -= 30;
                gameSequence.seqSpeed -= 100;
            } else if (gameSequence.round >= 10) {
                gameSequence.lightSpeed = 50;
                gameSequence.seqSpeed = 100;
            }
        }
        setTimeout(function() {
            $('#round').text(gameSequence.round);
            gameSequence.sequence.push(gameSequence.rundomNumber());
            runSequence();
        }, 1000);
    };

    //function for listening for correct sequence of clicks
    function clickListener() {
        $('#a, #b, #c, #d').on('click', function($event) {
            //animates light up on click

            //if correct click
            if (parseInt(event.target.dataset.id) === gameSequence.sequence[gameSequence.clicked]) {
                //if this click is the last click
                if (gameSequence.clicked === gameSequence.sequence.length - 1) {
                    lightUp(event.target.dataset.id);
                    $event.stopPropagation();
                    gameSequence.clicked = 0;
                    //turns event listener off after click to prevent the click looping through the function
                    $('#a, #b, #c, #d').off('click');
                    nextRound();
                    //if this click is not the last
                } else {
                    lightUp(event.target.dataset.id);
                    $event.stopPropagation();
                    gameSequence.clicked++;
                    //turns event listener off after click to prevent the click looping through the function
                    $('#a, #b, #c, #d').off('click');
                    clickListener();
                }
                //if this is the wrong click for the sequence
            } else {
                $event.stopPropagation();
                //turns event listener off after click to prevent the click looping through the function

                $('#a, #b, #c, #d').off('click');
                setTimeout(function() {
                    makeSound(5);
                }, 500);
                loadText(resetGame);
                $('#circle').hide();
                $('#gameManual').show();
                gameSequence.sequence = [];
                gameSequence.clicked = 0;
                gameSequence.medium = false;
                gameSequence.hard = false;
            }
        });
    };

    //App Operation Section
    //function to start game hide manual section change game to visible and shows it.
    function start() {
        $('#gameManual').hide();
        $("#circle").attr("class", "");
        $('#circle').show();
        gameSequence.lightSpeed = 300;
        gameSequence.seqSpeed = 1000;
        gameSequence.round = 1;
        $('#round').text(gameSequence.round);
        $('#difficulty').text(gameSequence.difficulty);
        gameSequence.sequence.push(gameSequence.rundomNumber());
    };
    //hides game at start
    $('#circle').hide();
    //waits for user to click start to iniate game
    $('#easy').on('click', function() {
        start();
        runSequence();
    });
    $('#medium').on('click', function() {
        gameSequence.medium = true;
        gameSequence.difficulty = "Medium",
            start();
        runSequence();
    });
    $('#hard').on('click', function() {
        gameSequence.hard = true;
        gameSequence.difficulty = "Hard";
        start();
        runSequence();
    });
    $('#impossible').on('click', function() {
        gameSequence.medium = true;
        gameSequence.hard = true;
        gameSequence.difficulty = "Evil";
        start();
        runSequence();
    });
});