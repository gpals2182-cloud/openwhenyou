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

updateCounter();async function loadCards() {

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