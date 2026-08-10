/* =========================================================
   SUNSHINE — CHAT + QUIZ ENGINE
   ========================================================= */


/* =========================================================
   CHAT ELEMENTS
   ========================================================= */

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");


/* =========================================================
   ADD CHAT MESSAGE
   ========================================================= */

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className =
        sender === "user"
            ? "message user-message"
            : "message bot-message";


    const content = document.createElement("div");

    content.className = "message-content";


    const safeText = String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");


    content.innerHTML = safeText;


    message.appendChild(content);

    chatMessages.appendChild(message);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* =========================================================
   TYPING INDICATOR
   ========================================================= */

function addTypingMessage() {

    const message = document.createElement("div");

    message.className =
        "message bot-message";

    message.id =
        "typingMessage";


    const content = document.createElement("div");

    content.className =
        "message-content";

    content.innerHTML =
        "Sunshine is thinking... ☀️";


    message.appendChild(content);

    chatMessages.appendChild(message);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* =========================================================
   REMOVE TYPING INDICATOR
   ========================================================= */

function removeTypingMessage() {

    const typing =
        document.getElementById(
            "typingMessage"
        );


    if (typing) {
        typing.remove();
    }
}


/* =========================================================
   ASK SUNSHINE AI
   ========================================================= */

async function askSunshine(message) {

    const question =
        String(message).trim();


    if (!question) {
        return;
    }


    addMessage(
        question,
        "user"
    );


    userInput.value = "";


    addTypingMessage();


    sendBtn.disabled = true;

    sendBtn.textContent =
        "Thinking...";


    try {

        const response =
            await fetch(
                "/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: question
                    })
                }
            );


        const data =
            await response.json();


        removeTypingMessage();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Sunshine could not answer."
            );

        }


        addMessage(
            data.reply ||
            "I'm sorry, I couldn't find an answer.",
            "bot"
        );


    } catch (error) {

        removeTypingMessage();


        addMessage(
            "Oops! ☀️ I couldn't connect to Sunshine right now. Please try again.",
            "bot"
        );


        console.error(
            "Sunshine error:",
            error
        );

    }


    sendBtn.disabled = false;

    sendBtn.textContent =
        "Send ☀️";


    userInput.focus();
}


/* =========================================================
   SEND BUTTON
   ========================================================= */

sendBtn.addEventListener(
    "click",
    function () {

        askSunshine(
            userInput.value
        );

    }
);


/* =========================================================
   ENTER KEY
   ========================================================= */

userInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            askSunshine(
                userInput.value
            );

        }

    }
);


/* =========================================================
   TOPIC CARDS
   ========================================================= */

const topicCards =
    document.querySelectorAll(
        ".topic-card"
    );


topicCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const question =
                    card.dataset.question;


                if (!question) {
                    return;
                }


                document
                    .getElementById("ask")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                setTimeout(
                    function () {

                        askSunshine(
                            question
                        );

                    },
                    500
                );

            }
        );

    }
);


/* =========================================================
   WORLD BUTTONS
   ========================================================= */

const worldButtons =
    document.querySelectorAll(
        ".world-button"
    );


worldButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.dataset.question;


                if (!question) {
                    return;
                }


                document
                    .getElementById("ask")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                setTimeout(
                    function () {

                        askSunshine(
                            question
                        );

                    },
                    500
                );

            }
        );

    }
);


/* =========================================================
   CHAT SUGGESTION BUTTONS
   ========================================================= */

const suggestions =
    document.querySelectorAll(
        ".suggestion"
    );


suggestions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.dataset.question;


                if (!question) {
                    return;
                }


                askSunshine(
                    question
                );

            }
        );

    }
);


/* =========================================================
   QUIZ DATA
   ========================================================= */


/*
   Each question contains:

   question
   answers
   correct

   "correct" is the number of the correct answer.

   0 = first answer
   1 = second answer
   2 = third answer
   3 = fourth answer
*/


const quizData = {


    /* ================= RAJPUTANA ================= */

    rajputana: [

        {
            question:
                "Which city is historically associated with the kingdom of Mewar?",

            answers: [
                "Udaipur",
                "Jaisalmer",
                "Bikaner",
                "Ajmer"
            ],

            correct: 0
        },


        {
            question:
                "Which famous Rajput ruler is associated with the Battle of Haldighati?",

            answers: [
                "Maharana Pratap",
                "Rana Sanga",
                "Prithviraj Chauhan",
                "Rao Jodha"
            ],

            correct: 0
        },


        {
            question:
                "Which famous fort is located in Chittorgarh?",

            answers: [
                "Chittorgarh Fort",
                "Mehrangarh Fort",
                "Junagarh Fort",
                "Amber Fort"
            ],

            correct: 0
        },


        {
            question:
                "Which dynasty ruled Mewar for centuries and is associated with Maharana Pratap?",

            answers: [
                "Sisodia",
                "Rathore",
                "Kachwaha",
                "Chauhan"
            ],

            correct: 0
        },


        {
            question:
                "Mehrangarh Fort is located in which city?",

            answers: [
                "Jodhpur",
                "Udaipur",
                "Jaipur",
                "Kota"
            ],

            correct: 0
        },


        {
            question:
                "Which city is famously known as the Pink City?",

            answers: [
                "Jaipur",
                "Jodhpur",
                "Udaipur",
                "Bundi"
            ],

            correct: 0
        },


        {
            question:
                "Kumbhalgarh Fort is especially famous for its massive defensive wall. It is traditionally associated with which ruler?",

            answers: [
                "Rana Kumbha",
                "Maharana Pratap",
                "Rao Jodha",
                "Man Singh I"
            ],

            correct: 0
        },


        {
            question:
                "Jaisalmer is particularly famous for which architectural landmark?",

            answers: [
                "Jaisalmer Fort",
                "Kumbhalgarh Fort",
                "Gagron Fort",
                "Lohagarh Fort"
            ],

            correct: 0
        },


        {
            question:
                "The Rathores are strongly associated with which major Rajput state?",

            answers: [
                "Marwar",
                "Mewar",
                "Amber",
                "Matsya"
            ],

            correct: 0
        },


        {
            question:
                "What is the traditional name commonly used for the historic region corresponding broadly to present-day Rajasthan?",

            answers: [
                "Rajputana",
                "Magadha",
                "Avanti",
                "Kalinga"
            ],

            correct: 0
        }

    ],



    /* ================= INVESTING ================= */

    investing: [

        {
            question:
                "What does a share of stock represent?",

            answers: [
                "A small ownership interest in a company",
                "A guaranteed bank deposit",
                "A government tax",
                "A personal loan"
            ],

            correct: 0
        },


        {
            question:
                "What is compounding?",

            answers: [
                "Earning returns on previous returns",
                "Paying a fixed tax",
                "Buying only government bonds",
                "Selling an investment every day"
            ],

            correct: 0
        },


        {
            question:
                "What does diversification generally mean?",

            answers: [
                "Spreading investments across different assets",
                "Putting all money into one company",
                "Avoiding all investments",
                "Buying only one stock repeatedly"
            ],

            correct: 0
        },


        {
            question:
                "What is a mutual fund?",

            answers: [
                "A pooled investment vehicle",
                "A type of savings account only",
                "A personal loan",
                "A tax penalty"
            ],

            correct: 0
        },


        {
            question:
                "What does the P/E ratio compare?",

            answers: [
                "Price to earnings",
                "Profit to electricity",
                "Price to expenses",
                "Production to employees"
            ],

            correct: 0
        },


        {
            question:
                "What is generally true about higher potential investment returns?",

            answers: [
                "They often come with higher risk",
                "They are always guaranteed",
                "They have no uncertainty",
                "They cannot lose money"
            ],

            correct: 0
        },


        {
            question:
                "What is an index fund designed to do?",

            answers: [
                "Track a market index",
                "Guarantee a profit",
                "Avoid all market movements",
                "Lend money to one company"
            ],

            correct: 0
        },


        {
            question:
                "What is a dividend?",

            answers: [
                "A distribution that a company may make to shareholders",
                "A compulsory government fee",
                "A type of bank loan",
                "A stock exchange"
            ],

            correct: 0
        },


        {
            question:
                "Why is inflation important to investors?",

            answers: [
                "It can reduce the purchasing power of money over time",
                "It guarantees stock-market gains",
                "It eliminates investment risk",
                "It makes every investment safer"
            ],

            correct: 0
        },


        {
            question:
                "What is the main idea behind long-term investing?",

            answers: [
                "Allowing investments time to potentially grow",
                "Buying and selling every minute",
                "Avoiding diversification",
                "Guaranteeing a fixed return"
            ],

            correct: 0
        }

    ],



    /* ================= INDIA ================= */

    india: [

        {
            question:
                "What is the capital of India?",

            answers: [
                "New Delhi",
                "Mumbai",
                "Kolkata",
                "Jaipur"
            ],

            correct: 0
        },


        {
            question:
                "Which river is one of the most important rivers of northern India?",

            answers: [
                "Ganga",
                "Narmada",
                "Godavari",
                "Kaveri"
            ],

            correct: 0
        },


        {
            question:
                "Which monument is located in Agra?",

            answers: [
                "Taj Mahal",
                "Gateway of India",
                "Victoria Memorial",
                "Charminar"
            ],

            correct: 0
        },


        {
            question:
                "Which Indian state is famous for the Thar Desert?",

            answers: [
                "Rajasthan",
                "Kerala",
                "Assam",
                "Goa"
            ],

            correct: 0
        },


        {
            question:
                "Which city is known as the City of Joy?",

            answers: [
                "Kolkata",
                "Delhi",
                "Pune",
                "Surat"
            ],

            correct: 0
        },


        {
            question:
                "Which mountain range forms a major natural boundary along northern India?",

            answers: [
                "Himalayas",
                "Aravallis",
                "Western Ghats",
                "Vindhyas"
            ],

            correct: 0
        },


        {
            question:
                "Which festival is widely known as the Festival of Lights?",

            answers: [
                "Diwali",
                "Holi",
                "Onam",
                "Baisakhi"
            ],

            correct: 0
        },


        {
            question:
                "Which Indian city is famous for the Gateway of India?",

            answers: [
                "Mumbai",
                "Chennai",
                "Ahmedabad",
                "Lucknow"
            ],

            correct: 0
        },


        {
            question:
                "Which classical dance form originated in Tamil Nadu?",

            answers: [
                "Bharatanatyam",
                "Kathak",
                "Kathakali",
                "Manipuri"
            ],

            correct: 0
        },


        {
            question:
                "Which ocean lies to the south of India?",

            answers: [
                "Indian Ocean",
                "Atlantic Ocean",
                "Pacific Ocean",
                "Arctic Ocean"
            ],

            correct: 0
        }

    ]

};


/* =========================================================
   QUIZ VARIABLES
   ========================================================= */

let currentQuizTopic = null;

let currentQuestionIndex = 0;

let currentScore = 0;

let currentQuestions = [];


/* =========================================================
   QUIZ ELEMENTS
   ========================================================= */

const quizTopicSelection =
    document.getElementById(
        "quizTopicSelection"
    );


const quizContainer =
    document.getElementById(
        "quizContainer"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


const questionNumber =
    document.getElementById(
        "questionNumber"
    );


const questionText =
    document.getElementById(
        "questionText"
    );


const answerGrid =
    document.getElementById(
        "answerGrid"
    );


const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );


const nextQuestionBtn =
    document.getElementById(
        "nextQuestionBtn"
    );


const scoreDisplay =
    document.getElementById(
        "score"
    );


const finalScore =
    document.getElementById(
        "finalScore"
    );


const resultMessage =
    document.getElementById(
        "resultMessage"
    );


const playAgainBtn =
    document.getElementById(
        "playAgainBtn"
    );


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuiz(topic) {

    currentQuizTopic =
        topic;


    currentQuestions =
        quizData[topic];


    currentQuestionIndex =
        0;


    currentScore =
        0;


    scoreDisplay.textContent =
        "0";


    quizResult.style.display =
        "none";


    quizTopicSelection.style.display =
        "none";


    quizContainer.style.display =
        "block";


    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });


    showQuestion();
}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showQuestion() {

    const question =
        currentQuestions[
            currentQuestionIndex
        ];


    questionNumber.textContent =
        `${currentQuestionIndex + 1} / ${currentQuestions.length}`;


    questionText.textContent =
        question.question;


    answerGrid.innerHTML =
        "";


    quizFeedback.textContent =
        "";


    quizFeedback.className =
        "quiz-feedback";


    nextQuestionBtn.style.display =
        "none";


    question.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            answerGrid.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT ANSWER
   ========================================================= */

function selectAnswer(
    selectedIndex,
    selectedButton
) {

    const question =
        currentQuestions[
            currentQuestionIndex
        ];


    const buttons =
        answerGrid.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    if (
        selectedIndex ===
        question.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );


        currentScore += 10;


        scoreDisplay.textContent =
            currentScore;


        quizFeedback.textContent =
            "✓ Correct! Excellent work! +10 points";


        quizFeedback.className =
            "quiz-feedback correct-feedback";


    } else {

        selectedButton.classList.add(
            "wrong"
        );


        buttons[
            question.correct
        ].classList.add(
            "correct"
        );


        quizFeedback.textContent =
            "✗ Not quite! The correct answer is: " +
            question.answers[
                question.correct
            ];


        quizFeedback.className =
            "quiz-feedback wrong-feedback";

    }


    nextQuestionBtn.style.display =
        "block";

}


/* =========================================================
   NEXT QUESTION
   ========================================================= */

nextQuestionBtn.addEventListener(
    "click",
    function () {

        currentQuestionIndex++;


        if (
            currentQuestionIndex >=
            currentQuestions.length
        ) {

            finishQuiz();

        } else {

            showQuestion();

        }

    }
);


/* =========================================================
   FINISH QUIZ
   ========================================================= */

function finishQuiz() {

    quizContainer.style.display =
        "none";


    quizResult.style.display =
        "block";


    finalScore.textContent =
        `${currentScore} / 100`;


    if (currentScore === 100) {

        resultMessage.textContent =
            "Perfect score! 🏆 You really know your stuff!";

    } else if (currentScore >= 80) {

        resultMessage.textContent =
            "Excellent! 🌟 You have a strong knowledge base.";

    } else if (currentScore >= 60) {

        resultMessage.textContent =
            "Great job! ☀️ Keep exploring and you'll get even better.";

    } else if (currentScore >= 40) {

        resultMessage.textContent =
            "Good attempt! 📚 A little more learning and you'll be flying.";

    } else {

        resultMessage.textContent =
            "Every wrong answer is something new learned. Keep going! ☀️";

    }


    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   QUIZ TOPIC BUTTONS
   ========================================================= */

const quizTopicButtons =
    document.querySelectorAll(
        ".quiz-topic-button"
    );


quizTopicButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const topic =
                    button.dataset.quizTopic;


                startQuiz(topic);

            }
        );

    }
);


/* =========================================================
   PLAY AGAIN
   ========================================================= */

playAgainBtn.addEventListener(
    "click",
    function () {

        quizResult.style.display =
            "none";


        quizTopicSelection.style.display =
            "grid";


        quizContainer.style.display =
            "none";


        document
            .getElementById("quiz")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);
