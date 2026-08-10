const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");


/* ================= ADD MESSAGE ================= */

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className =
        sender === "user"
            ? "message user-message"
            : "message bot-message";


    const content = document.createElement("div");

    content.className = "message-content";


    /*
       Convert simple line breaks into HTML
       so Sunshine's answers remain readable.
    */

    const formattedText = String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");


    content.innerHTML = formattedText;


    message.appendChild(content);

    chatMessages.appendChild(message);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* ================= TYPING MESSAGE ================= */

function addTypingMessage() {

    const message = document.createElement("div");

    message.className =
        "message bot-message";

    message.id = "typingMessage";


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


/* ================= REMOVE TYPING ================= */

function removeTypingMessage() {

    const typing =
        document.getElementById("typingMessage");

    if (typing) {
        typing.remove();
    }
}


/* ================= ASK SUNSHINE ================= */

async function askSunshine(message) {

    const question =
        String(message).trim();


    if (!question) {
        return;
    }


    /*
       Show user's message
    */

    addMessage(
        question,
        "user"
    );


    /*
       Clear input
    */

    userInput.value = "";


    /*
       Show thinking indicator
    */

    addTypingMessage();


    /*
       Disable button temporarily
    */

    sendBtn.disabled = true;

    sendBtn.textContent =
        "Thinking...";


    try {

        const response =
            await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    message: question
                })

            });


        const data =
            await response.json();


        removeTypingMessage();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Sunshine could not answer."
            );

        }


        /*
           Display Sunshine's answer
        */

        addMessage(
            data.reply ||
            "I'm sorry, I couldn't find an answer.",
            "bot"
        );


    } catch (error) {

        removeTypingMessage();


        addMessage(
            "Oops! ☀️ Something went wrong while connecting to Sunshine. Please try again.",
            "bot"
        );


        console.error(
            "Sunshine error:",
            error
        );

    }


    /*
       Enable button again
    */

    sendBtn.disabled = false;

    sendBtn.textContent =
        "Send ☀️";


    userInput.focus();
}


/* ================= SEND BUTTON ================= */

sendBtn.addEventListener(
    "click",
    function () {

        askSunshine(
            userInput.value
        );

    }
);


/* ================= ENTER KEY ================= */

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


/* ================= TOPIC CARDS ================= */

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


                /*
                   Move user to chat
                */

                document
                    .getElementById("ask")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                /*
                   Give the browser a moment
                   to scroll before asking.
                */

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


/* ================= WORLD BUTTONS ================= */

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


/* ================= CHAT SUGGESTIONS ================= */

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
