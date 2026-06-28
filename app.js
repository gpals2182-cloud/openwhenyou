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

let currentQuestion = 0;

function loadQuestion(){

    const q = missQuestions[currentQuestion];

    document.getElementById("question").textContent=q.question;

    document.getElementById("choice1").textContent=q.a;

    document.getElementById("choice2").textContent=q.b;

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion>=missQuestions.length){

        document.querySelector(".choice-area").style.display="none";

        document.getElementById("question").style.display="none";

        document.getElementById("finishMessage").style.display="block";

        return;

    }

    loadQuestion();

}

document.addEventListener("click",(e)=>{

if(e.target.id==="choice1"||e.target.id==="choice2"){

nextQuestion();

}

});

loadQuestion();
const badDayQuestions = [

{
question:"Which would make you feel better?",
a:"🤗 A long hug from me",
b:"🍜 Your favorite meal together"
},

{
question:"After a hard day...",
a:"🎬 Watch a movie with me",
b:"🚶 Take a quiet walk together"
},

{
question:"What do you need most?",
a:"👂 Someone to listen",
b:"❤️ Someone to hold you"
}

];

let badDayIndex = 0;

function loadBadDayQuestion(){

    badDayIndex = 0;

    document.querySelector("#game .choice-area").style.display="flex";
    document.getElementById("baddayQuestion").style.display="block";
    document.getElementById("baddayFinish").style.display="none";

    showBadDayQuestion();

}

function showBadDayQuestion(){

    const q = badDayQuestions[badDayIndex];

    document.getElementById("baddayQuestion").textContent=q.question;

    document.getElementById("baddayChoice1").textContent=q.a;

    document.getElementById("baddayChoice2").textContent=q.b;

}

document.getElementById("baddayChoice1").onclick=nextBadDay;
document.getElementById("baddayChoice2").onclick=nextBadDay;

function nextBadDay(){

    badDayIndex++;

    if(badDayIndex>=badDayQuestions.length){

        document.querySelector("#game .choice-area").style.display="none";

        document.getElementById("baddayQuestion").style.display="none";

        document.getElementById("baddayFinish").style.display="block";

        return;

    }

    showBadDayQuestion();

}
const sleepQuestions = [

{
question:"Tonight...",
a:"🫂 Fall asleep in my arms",
b:"📞 Fall asleep on a video call"
},

{
question:"If I were with you...",
a:"🤍 Play with your hair until you fall asleep",
b:"💆 Give you a long back massage"
},

{
question:"Sweet dreams would be...",
a:"🌙 Dream about our future together",
b:"✈️ Wake up and find me beside you"
}

];

let sleepIndex = 0;

function loadSleepQuestion(){

    sleepIndex = 0;

    document.querySelector("#game .choice-area").style.display="flex";
    document.getElementById("sleepQuestion").style.display="block";
    document.getElementById("sleepFinish").style.display="none";

    showSleepQuestion();

}

function showSleepQuestion(){

    const q = sleepQuestions[sleepIndex];

    document.getElementById("sleepQuestion").textContent=q.question;

    document.getElementById("sleepChoice1").textContent=q.a;

    document.getElementById("sleepChoice2").textContent=q.b;

}

document.getElementById("sleepChoice1").onclick=nextSleep;
document.getElementById("sleepChoice2").onclick=nextSleep;

function nextSleep(){

    sleepIndex++;

    if(sleepIndex>=sleepQuestions.length){

        document.querySelector("#game .choice-area").style.display="none";

        document.getElementById("sleepQuestion").style.display="none";

        document.getElementById("sleepFinish").style.display="block";

        return;

    }

    showSleepQuestion();

}
const koreaQuestions = [

{
question:"Where should we go first when we visit Korea again?",
a:"🌸 Cherry blossoms",
b:"❄️ First snowfall"
},

{
question:"Which date would you choose?",
a:"☕ Café hopping all day",
b:"🏛️ Visit another museum together"
},

{
question:"What's the best part of Korea?",
a:"🍜 The food",
b:"❤️ Being there together"
}

];

let koreaIndex = 0;

function loadKoreaQuestion(){

    koreaIndex=0;

    document.querySelector("#game .choice-area").style.display="flex";
    document.getElementById("koreaQuestion").style.display="block";
    document.getElementById("koreaFinish").style.display="none";

    showKoreaQuestion();

}

function showKoreaQuestion(){

    const q=koreaQuestions[koreaIndex];

    document.getElementById("koreaQuestion").textContent=q.question;

    document.getElementById("koreaChoice1").textContent=q.a;

    document.getElementById("koreaChoice2").textContent=q.b;

}

document.getElementById("koreaChoice1").onclick=nextKorea;
document.getElementById("koreaChoice2").onclick=nextKorea;

function nextKorea(){

    koreaIndex++;

    if(koreaIndex>=koreaQuestions.length){

        document.querySelector("#game .choice-area").style.display="none";

        document.getElementById("koreaQuestion").style.display="none";

        document.getElementById("koreaFinish").style.display="block";

        return;

    }

    showKoreaQuestion();

}