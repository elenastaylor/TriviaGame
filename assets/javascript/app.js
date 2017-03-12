/**
 * Created by elenastaylor on 3/9/17.
 */

// gif images: courtesy of giphy.com
// pm3 ringtones; courtesy of mobiles24.co

// Variables:


triviaObj = {


    masterQuestions: [{
        question: "What band are keen poker players and once fleeced Robert Smith of The Cure for a hefty wad of cash?",
        answers: ["Muse", "Green Day", "Aerosmith", "Radiohead"],
        correctAnswer: "Muse",
        visual: 'assets/images/muse.gif',
        sound: 'assets/audio/musehysteria.mp3'
        //fact: ""

    }, {
        question: "What was Steven Tyler's of Aerosmith original name?",
        answers: ["Steven Tallarico", "Steven Freeman", "Steven Smith", "Steven Brown"],
        correctAnswer: "Steven Tallarico",
        visual: 'assets/images/steventyler.gif',
        sound: 'assets/audio/aerosmith.mp3'
        //fact: ""
    }, {
        question: "Of Pink Floyd's four most popular albums, which one came out first ?",
        answers: ["Animals", "Dark side of the Moon", "The Wall", "Wish You Were Here"],
        correctAnswer: "Dark side of the Moon",
        visual: 'assets/images/pinkfloyd.jpg',
        sound: 'assets/audio/pinkfloyd.mp3'
        //fact: ""

    }, {
        question: "When Jimi Hendrix moved to England, which guitarist took him in and watched as he became famous within a week?",
        answers: ["Eric Clapton", "Paul McCartney", "Jimmi Paige", "Peter Frampton"],
        correctAnswer: "Eric Clapton",
        visual: 'assets/images/clapton.jpg',
        sound: 'assets/audio/clapton.mp3'
        //fact: ""

    }, {
            question: "What does Green Day mean?",
            answers: ["A day wasted smoking pot", "Green Day", "Doing nothing", "Feeling sad"],
            correctAnswer: "A day wasted smoking pot",
            visual: 'assets/images/greenday.gif',
            sound: "assets/audio/greenday.mp3"
            //fact: ""

        }, {
            question: "Which was not a member of the traveling Wilburys?",
            answers: ["Bob Dylan", "Roy Orbison", "Tom Petty", "Eric Clapton"],
            correctAnswer: "Eric Clapton",
            visual: 'assets/images/clapton.jpg',
            sound: "assets/audio/clapton.mp3"
            //fact: ""

        }, {
            question: "Which band has the single most sold album of all?",
            answers: ["The Eagles", "Pink Floyd", "Michael Jackson", "The Beatles"],
            correctAnswer: "The Eagles",
            visual: 'assets/images/eagles.jpg',
            sound: "assets/audio/eagles.mp3"
            //fact: ""

        }, {
            question: "At the end of their song, what singer used his trouser zipper as an instrument?",
            answers: ["Matt Bellamy", "Eric Clapton", "Billy Joe Armstrong", "Carlos Santana"],
            correctAnswer: "Matt Bellamy",
            visual: 'assets/images/bellamy.gif',
            sound: "assets/audio/spacedementia.mp3"
            //fact: ""

        }, {
            question: "Which Beatles song was never a number one?",
            answers: ["Ticket to Ride", "Hello, Goodbye", "I am the Walrus", "Lady Madonna"],
            correctAnswer: "I am the Walrus",
            visual: 'assets/images/beatles.jpg',
            sound: "assets/audio/beatles.mp3"
            //fact: ""

        }, {
            question: "Which person is not a member of Muse?",
            answers: ["Matt Bellamy", "Chris Wolstenholme", "Dominic Howard", "Thom Yorke"],
            correctAnswer: "Thom Yorke",
            visual: 'assets/images/thomyorke.jpg',
            sound: "assets/audio/radiohead.mp3"
            //""

        }
    ],
    // Push the correct guess here and then get the length of the array and display that number at end
    guessesCorrect: 0,

    // Push the incorrect guesses here and then displayed
    guessesIncorrect: 0,

    // If the timer goes off before you guess it falls into this catagory
    unansweredGuesses: 0,
    // unansweredGuesses: triviaObj.masterQuestions.length - (guessesCorrect + guessesIncorrect),

    // This will house the current question selected at random and removed from the master question once the masterQuestions array is empty move onto the final answer page
    currentQuestion: [],

    currentGuess: "",

    userGuess: "",

    timerCount: 14,

    masterIndex: "",

    // This function loads the page and loads the timer
    pageLoad: {
        run: function() {
            counter = setInterval(this.decrement, 1000);
        },
        // The decremeent function.
        decrement: function() {

            // Show the number in the #show-number tag.
            $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + '</h2>');
            // Decrease number by one.
            triviaObj.timerCount--;

            // // Once number hits zero...
            if (triviaObj.timerCount === -1) {
                triviaObj.emptyDivs();
                triviaObj.timesUp();
                triviaObj.unansweredGuesses++;
                console.log("Unanswered Guesses:" + triviaObj.unansweredGuesses);
                triviaObj.spliceArray();
                // is the timeout function to automatically switch the page
                triviaObj.pageTimeout.timeout();
            }

        },
        // This stops the timer
        stop: function() {
            // Clears our "counter" interval.
            // We just pass the name of the interval
            // to the clearInterval function.
            clearInterval(counter);
        }
    },
    // Timeout function
    pageTimeout: {

        timeout: function() {
            setTimeout(this.fiveSeconds, 1000 * 7);
        },
        fiveSeconds: function() {
            triviaObj.emptyDivs();
            triviaObj.currentQuestion = [];
            console.log("This is the current question (should be blank): " + triviaObj.currentQuestion.length);

            // game over
            if (triviaObj.masterQuestions.length == 0) {
                // Game is over and display progress
                // triviaObj.emptyDivs();
                triviaObj.summaryPage();
                triviaObj.pageLoad.stop();

            } else {
                triviaObj.questionLoad();
            }
        }
    },

    timerReset: function() {
        var timerCount = 0;
        return timerCount;
        $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + '</h2>');
    },

    questionLoad: function() {
        this.timerCount = 14;
        // Show the number in the #show-number tag.
        $('#timer').html('<h2>' + 'Time Remaining: ' + 15 + '</h2>');
        this.pageLoad.run();
        // This pushes the random picked question object to the current question array
        this.currentQuestion.push(this.randomPick());

        console.log("Current Question: " + JSON.stringify(this.currentQuestion));
        $('#question').html('<h2>' + triviaObj.currentQuestion[0].question + '<h2>');

        // Setting the variable of current answers equal to the answers section with the current question array
        var currentAnswers = this.currentQuestion[0].answers

        // stores get element in variable parent
        var parent = document.getElementById('answers');

        //  a for each function that runs for every answer in the array
        currentAnswers.forEach(function(answer, index, array) {
            // creates a p element
            var div = document.createElement('div');
            // Add other classes to update the background
            div.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 guess center-block');

            // storing creating a text node of answer in text
            var text = document.createTextNode(answer);
            // appending text to the previously created p tag
            div.appendChild(text);
            // appending the child to the parent in this case the p tag to the parent variable
            parent.appendChild(div);

        });
    },
    // Randomly picks the next question
    randomPick: function() {

        this.masterIndex = Math.floor(Math.random() * this.masterQuestions.length);
        var initialPick = this.masterQuestions[this.masterIndex];

        console.log("Initial Pick: " + JSON.stringify(initialPick));
        return initialPick;


    },

    // splice function to remove the current question object from the array so that it cannot be populated again
    spliceArray: function() {
        triviaObj.masterQuestions.splice(this.masterIndex, 1);
        console.log("The remove index value is: " + JSON.stringify(this.masterIndex));
        console.log("masterQuestions should have been altered! It is now: " + JSON.stringify(triviaObj.masterQuestions));
        console.log("Master Questions length is: " + triviaObj.masterQuestions.length)
        console.log("Current Question Length: " + triviaObj.currentQuestion.length);

    },

    // Function to empty currently populated divs with questions and answers
    emptyDivs: function() {
        $('#question').empty();
        $('#answers').empty();
        //$('#fact').empty();
        $('#picture').empty();
        $('#correctAnswer').empty();
        $('#audioplayer').attr('src', '');
        $('#timer').empty();


    },

    // The time up function
    timesUp: function() {
        $('#timer').attr('style', 'font-size: 40px;').html('Times UP!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        console.log(triviaObj.currentQuestion[0].correctAnswer);

        triviaObj.displayAssets();
        triviaObj.pageLoad.stop();


    },
    // Correct Guess function
    correctGuess: function() {
        $('#question').attr('style', 'font-size: 40px;').html('Correct!');
        triviaObj.displayAssets();

    },

    // Incorrect guess function
    incorrectGuess: function() {
        $('#timer').attr('style', 'font-size: 40px;').html('Wrong!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        triviaObj.displayAssets();

    },

    // Create displayAssets function to display the selected audio and video assets for the questions guesses. This would be added to win, times up and loss display
    displayAssets: function() {
        // Sets the image on the screen
        var img = $('<img>');
        img.attr('src', triviaObj.currentQuestion[0].visual);
        img.attr('class', 'img-rounded m-x-auto d-block pictureframe');
        img.attr('alt', 'Image');
        $('#picture').html(img);

        // Sets the fun fact
        //$('#fact').html('<h3>' + 'Fun Fact: ' + triviaObj.currentQuestion[0].fact + '</h3>');


        // sets the audio on the page

        var audio = triviaObj.currentQuestion[0].sound;
        // audio.autoplay = true;
        audioplayer = $('#audioplayer');
        audioplayer.attr('src', audio);
        audioplayer.attr('autoplay', 'autoplay');

    },

    summaryPage: function() {

        $('#question').html('<h2>' + 'Thank you for playing. Here is your game summary: ' + '</h2>');

        // display correct guesses
        $('#answers').html("<p>" + "Correct Guesses: " + triviaObj.guessesCorrect + "</p>");

        // display incorrect guesses
        $('#answers').append("<p>" + "Incorrect Guesses: " + triviaObj.guessesIncorrect + "</p>");

        // display unanswered guesses
        $('#answers').append("<p>" + "Unanswered Guesses: " + triviaObj.unansweredGuesses + "</p>");

    }

}

// GAME BEGINS with Initial setup of page and start click push

// Throw up a start button and when clicked it displays the first question page
$(document).ready(function() {
    // Intial page load with the button created dynamically
    var b = $('<button>');
    b.addClass('waves-effect waves-light btn-lg text-center startButton');
    b.html('START!');

    $('#start').append(b);


    // STAGE 1: Loads the page after a user click and displays first question and timer
    $('#start').on('click', function(event) {
        $(this).hide();
        triviaObj.questionLoad();

    });

    // STAGE 2: User guesses

    // This initiates the user click/guess after the buttons are created on the screen
    $(document.body).on('click', '.guess', function(event) {
        var click = $(this).text();



        // triviaObj.splice();
        // console.log("you clicked: " + click);
        triviaObj.pageLoad.stop();

        // correct guess
        if (click == triviaObj.currentQuestion[0].correctAnswer) {

            triviaObj.emptyDivs();
            triviaObj.correctGuess();
            triviaObj.guessesCorrect++;
            console.log("This is the user pick: " + click);
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);
            console.log("Guesses Correct: " + triviaObj.guessesCorrect);
            triviaObj.spliceArray();
            // is the timeout function to automatically switch the page
            triviaObj.pageTimeout.timeout();


        }
        // incorrect guess
        else if (click != triviaObj.currentQuestion[0].correctAnswer) {
            triviaObj.emptyDivs();
            triviaObj.incorrectGuess();
            triviaObj.guessesIncorrect++;
            console.log("This is the user pick: " + click);
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);
            console.log("Guesses incorrect: " + triviaObj.guessedIncorrect);
            triviaObj.spliceArray();
            // is the timeout function to automatically switch the page
            triviaObj.pageTimeout.timeout();

        }
    });



});
