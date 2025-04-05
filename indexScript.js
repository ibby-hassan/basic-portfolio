const overlay = document.querySelector('.info-overlay');
const overlayTitle = document.getElementById('info-overlay-title');
const overlayText = document.getElementById('info-overlay-text');
const body = document.querySelector('body');
const overlayGoBack = document.getElementById('overlay-go-back');

const scrollIcon = document.getElementById("scroll-icon");
const questionSection = document.querySelector(".question-submission");

scrollIcon.addEventListener("click", function() {
    questionSection.scrollIntoView({ behavior: "smooth" });
});

overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
        hideOverlay();
    }
});

overlayGoBack.addEventListener('click', function() {
    hideOverlay();
});

fetch('./infoCards.json').then(response => {
    if (!response.ok) {
        throw new Error(`HTTP Error! Status:  ${response.status}`);
    }
    return response.json();
}).then( infoCards => {

    // Runs if JSON loaded successfully
    const infoCardContainer = document.querySelector('.q-and-a');
    infoCards.forEach(card => {
        infoCardContainer.appendChild(createCard(card));

    });
}).catch(error => {
    // Runs if there is an error loading the JSON
    console.error(error);
});

function createCard(card) {
    const figure = document.createElement('figure');
    figure.classList.add('info-card');
    figure.id = card.id; 

    if (card.background) {
        figure.style.backgroundImage = `url(assets/${card.background})`;
    }
    if (card.fontColour) {
        figure.style.color = card.fontColour;
    }
    if (card.fontWeight) {
        figure.style.fontWeight = card.fontWeight;
    }

    const h3 = document.createElement('h3');
    h3.innerHTML = card.author ? `${card.author} asks...` : "General Info";

    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = card.question;

    figure.appendChild(h3);
    figure.appendChild(figcaption);
    figure.addEventListener('click', () => showOverlay(card.question, card.answer));

    return figure;
};

function showOverlay(question, answer) {
    overlayTitle.innerHTML = question;
    overlayText.innerHTML = answer;
    overlay.style.display = "flex";

    const scrollbarWidth = getScrollbarWidth();
    body.style.paddingRight = `${scrollbarWidth}px`;
    body.style.overflow = "hidden";
};

function hideOverlay() {
    overlay.style.display = "none";
    body.style.overflow = "";
    body.style.paddingRight = "";
    overlayTitle.innerHTML = "";
    overlayText.innerHTML = "";
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }