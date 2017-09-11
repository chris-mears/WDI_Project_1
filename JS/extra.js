    //reset info for when failed
    const Reset = {
        title: "Reset",
        description: "Looks you made it to Sqeuence: #. If you would like to see if you can beat your score please click Try Again.",
        button: "Try Again"
    };

    function loadText(text) {
        $('#title').text(text.title);
        $('#description').text(text.description);
        $('#start').text(text.button);
    };