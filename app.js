const PASSWORD = "2509";
const START_DATE = new Date("2025-09-26");

const intro = document.getElementById("intro");
const passwordScreen = document.getElementById("passwordScreen");
const home = document.getElementById("home");

const continueBtn = document.getElementById("continueBtn");
const unlockBtn = document.getElementById("unlockBtn");

const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");

const cardsContainer = document.getElementById("cardsContainer");
const dayCounter = document.getElementById("dayCounter");

const modal = document.getElementById("letterModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

continueBtn.addEventListener("click", () => {

    intro.classList.remove("active");
    passwordScreen.classList.add("active");

});

unlockBtn.addEventListener("click", unlock);

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        unlock();

    }

});

function unlock(){

    if(passwordInput.value!==PASSWORD){

        passwordMessage.innerHTML=
`Hmm...<br>
That's not our key. ♡`;

        passwordInput.value="";

        return;

    }

    passwordMessage.textContent="Unlocking...";

    setTimeout(()=>{

        passwordScreen.classList.remove("active");
        home.classList.remove("hidden");

    },700);

}

function updateCounter(){

    const today=new Date();

    const diff=today-START_DATE;

    const days=Math.floor(diff/(1000*60*60*24));

    dayCounter.textContent=`${days} days with you ♡`;

}

updateCounter();

async function loadCards() {

    try {

        const response = await fetch("content/cards.json");

        if (!response.ok) {
            throw new Error("Unable to load cards.");
        }

        const cards = await response.json();

        cardsContainer.innerHTML = "";

        cards.forEach(card => {

            const div = document.createElement("div");

            div.className = "card";

            div.innerHTML = `
                <h3>${card.title}</h3>
                <p>${card.subtitle}</p>
            `;

            div.addEventListener("click", () => {
                openLetter(card);
            });

            cardsContainer.appendChild(div);

        });

    } catch (error) {

        console.error(error);

        cardsContainer.innerHTML = `
            <p style="text-align:center;">
                Unable to load cards.
            </p>
        `;

    }

}

loadCards();async function openLetter(card) {

    modal.classList.remove("hidden");

    modalBody.innerHTML = `
        <div style="text-align:center;padding:60px;">
            Loading...
        </div>
    `;

    try {

        const response = await fetch(card.letter);

        if (!response.ok) {
            throw new Error("Letter not found");
        }

        const html = await response.text();

        modalBody.innerHTML = html;

    } catch (error) {

        console.error(error);

        modalBody.innerHTML = `
            <h2>Oops! 💌</h2>

            <p style="margin-top:20px;">
                I couldn't load this letter.
            </p>

            <p style="font-size:14px;color:#999;">
                ${card.letter}
            </p>
        `;

    }

}

closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});

modal.querySelector(".overlay").addEventListener("click", () => {

    modal.classList.add("hidden");

});

function toggleSection(id, button) {

    const section = document.getElementById(id);

    if (!section) return;

    const isOpen = section.style.display === "block";

    if (isOpen) {

        section.style.display = "none";

        if (button) {
            button.textContent = button.dataset.open;
        }

    } else {

        section.style.display = "block";

        if (button) {
            button.textContent = button.dataset.close;
        }

    }

}


}

let currentQuestions = [];
let currentIndex = 0;

function startGame(questions, prefix) {

    currentQuestions = questions;
    currentIndex = 0;

    document.getElementById(prefix + "Question").style.display = "block";
    document.getElementById(prefix + "Finish").style.display = "none";

    document.querySelector("#" + prefix + "Game .choice-area").style.display = "flex";

    showQuestion(prefix);

}

function showQuestion(prefix) {

    const q = currentQuestions[currentIndex];

    document.getElementById(prefix + "Question").textContent = q.question;

    document.getElementById(prefix + "Choice1").textContent = q.a;

    document.getElementById(prefix + "Choice2").textContent = q.b;

}

function chooseAnswer(prefix) {

    currentIndex++;

    if (currentIndex >= currentQuestions.length) {

        document.querySelector("#" + prefix + "Game .choice-area").style.display = "none";

        document.getElementById(prefix + "Question").style.display = "none";

        document.getElementById(prefix + "Finish").style.display = "block";

        return;

    }

    showQuestion(prefix);

}

const missQuestions = [

{
question:"If you could choose one...",
a:"🤗 One huge hug from me right now",
b:"📸 100 selfies from me"
},

{
question:"Which sounds better?",
a:"🤝 Hold my hand for a whole day",
b:"🫂 Cuddle with me all night"
},

{
question:"One last question...",
a:"📅 Spend one week together now",
b:"💍 Wait one year but never be apart again"
}

];
const badDayQuestions = [

{
question:"What would make you feel better right now?",
a:"🤗 A long hug from me",
b:"🍜 Your favorite meal together"
},

{
question:"After a hard day...",
a:"🎬 Watch a movie together",
b:"🚶 Take a quiet walk together"
},

{
question:"What do you need most?",
a:"👂 Someone to listen",
b:"❤️ Someone to hold you"
}

];
const sleepQuestions = [

{
question:"How would you rather fall asleep?",
a:"🫂 In my arms",
b:"📞 On a video call with me"
},

{
question:"If I were there tonight...",
a:"🤍 I'd play with your hair",
b:"💆 I'd give you a relaxing massage"
},

{
question:"Which sounds like the sweetest dream?",
a:"🌙 Dream about our future together",
b:"☀️ Wake up and find me beside you"
}

];
const koreaQuestions = [

{
question:"When we go back to Korea, what should we do first?",
a:"🌸 See the cherry blossoms again",
b:"❄️ Watch another first snowfall together"
},

{
question:"Which date sounds better?",
a:"☕ Café hopping all day",
b:"🏛️ Visit another museum together"
},

{
question:"What made Korea so special?",
a:"🍜 The amazing food",
b:"❤️ Being there with you"
}

];