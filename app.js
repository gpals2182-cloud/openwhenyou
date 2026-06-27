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

passwordInput.addEventListener("keydown", e => {
    if (e.key === "Enter") unlock();
});

function unlock(){

    if(passwordInput.value !== PASSWORD){

        passwordMessage.innerHTML =
`Hmm...<br>
That's not our key. ♡`;

        passwordInput.value="";

        return;
    }

    passwordMessage.textContent="Unlocking...";

    setTimeout(()=>{

        passwordScreen.classList.remove("active");
        home.classList.remove("hidden");

    },800);

}

function updateCounter(){

    const today=new Date();

    const diff=today-START_DATE;

    const days=Math.floor(diff/(1000*60*60*24));

    dayCounter.textContent=`${days} days with you ♡`;

}

updateCounter();

const cards=[

{
title:"♡ I Miss You",
subtitle:"When you miss me."
},

{
title:"☁ I Had a Bad Day",
subtitle:"When today feels a little too heavy."
},

{
title:"🌙 I Can't Sleep",
subtitle:"For sleepless nights."
},

{
title:"🇰🇷 I Miss Korea",
subtitle:"Whenever you're homesick."
},

{
title:"📷 Remember Us",
subtitle:"Our memories together."
},

{
title:"✈ Until We Meet Again",
subtitle:"Until I can hold you again."
}

];

cards.forEach(card=>{

const div=document.createElement("div");

div.className="card";

div.innerHTML=`
<h3>${card.title}</h3>
<p>${card.subtitle}</p>
`;

div.onclick=()=>openLetter(card);

cardsContainer.appendChild(div);

});

function openLetter(card){

modal.classList.remove("hidden");

modalBody.innerHTML=`

<h2>${card.title}</h2>

<p style="margin-top:25px;line-height:2">

This letter will automatically load
from JSON in the next version.

</p>

`;

}

closeModal.onclick=()=>{

modal.classList.add("hidden");

};

modal.querySelector(".overlay").onclick=()=>{

modal.classList.add("hidden");

};