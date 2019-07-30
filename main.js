document.getElementById('configurationMenu').addEventListener('click', displayConfiguration);

document.getElementById('numberCards').addEventListener('keyup', checkCardsNumber);

document.getElementById('resetConfig').addEventListener('click', resetConfigurationInput);

document.getElementById('saveConfig').addEventListener('click', saveConfigurationInput);

document.getElementById('backCard').addEventListener('click', selectedBackCard);

document.getElementById('deckCard').addEventListener('click', selectedDeckCard);

createStarDecoration(document.getElementById('configBackCard'), '&starf;');

displayRowsConfig(false);

var DefaultConfig = {
    numberCard : 20,
    corner     : '&starf;',
    deck       : 'tropico',
    deleteRows : false
}

var Config = {};

function displayConfiguration () {
    let configuration = document.getElementById('configuration');

    if (configuration.classList.contains('hidden')) {
        configuration.classList.remove('hidden');
    } else {
        configuration.classList.add('hidden');
        resetConfigurationInput();
    }
}


function resetConfigurationInput () {
    let number = document.getElementById('numberCards');
    number.value = 20;
    
    document.querySelector('.backcard > .selected').classList.remove('selected')
    document.querySelector('[data-back-card="starf"]').classList.add('selected');
    
    document.querySelector('.deck-card > .selected').classList.remove('selected')
    document.querySelector('[data-deck-card="tropico"]').classList.add('selected');

    let deleteRows = document.getElementById('deleteRows');
    deleteRows.checked = false;

}

function saveConfigurationInput () {
    // Nombre de carte
    let number = document.getElementById('numberCards');
    Config.numberCard = number.value;
    document.getElementById('configNumberCards').innerHTML = displayNumber(number.value);

    // Arriere des cartes
    let corner = document.querySelector('.backcard > .selected');
    Config.corner = '&' + corner.dataset.backCard + ';';
    createStarDecoration(document.getElementById('configBackCard'), '&' + corner.dataset.backCard + ';')

    // Theme du jeux de cartes
    let deck = document.querySelector('.deck-card > .selected');
    Config.deck = deck.dataset.deckCard;
    displayDeckSelection(deck);

    let deleteRows = document.getElementById('deleteRows');
    Config.deleteRows = deleteRows.checked;
    displayRowsConfig(deleteRows.checked);


    let configuration = document.getElementById('configuration');
    configuration.classList.add('hidden');
}

function checkCardsNumber () {
    let number = document.getElementById('numberCards');
    if (number.value > 40) {
        number.value = 40;
    }
    if (number.value % 2 === 1 && number.value.length === 2) {
        number.value = number.value - 1;
    }
}

function selectedBackCard () {
    let card = event.target;

    if (!card.dataset.backCard) {
        return false;
    }

    let previousSelected = document.querySelector('.backcard > .selected');
    previousSelected.classList.remove('selected');

    card.classList.add('selected');
}

function selectedDeckCard () {
    let card = event.target;

    if (!card.classList.contains('card')) {
        card = card.parentNode
    }

    if (!card.dataset.deckCard) {
        return false;
    }

    let previousSelected = document.querySelector('.deck-card > .selected');
    previousSelected.classList.remove('selected');

    card.classList.add('selected');
}

function prepareGame() {
    let config = Config || DefaultConfig;
    localStorage.setItem('config', JSON.stringify(config));
}

function createStarDecoration (card, cornerSelected)
{
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }

    let corner = document.createElement('span');
    corner.classList = 'corner';
    corner.innerHTML = cornerSelected;
    card.appendChild(corner);

    let cornerRight = document.createElement('span');
    cornerRight.classList = 'corner';
    cornerRight.innerHTML = cornerSelected;
    card.appendChild(cornerRight);

    let cornerBottomRight = document.createElement('span');
    cornerBottomRight.classList = 'corner';
    cornerBottomRight.innerHTML = cornerSelected;
    card.appendChild(cornerBottomRight);

    let cornerBottomLeft = document.createElement('span');
    cornerBottomLeft.classList = 'corner';
    cornerBottomLeft.innerHTML = cornerSelected;
    card.appendChild(cornerBottomLeft);
}

function displayDeckSelection(deckSelected) {
    let config = document.getElementById('configCardDeck');

    while (config.firstChild) {
        config.removeChild(config.firstChild);
    }

    config.appendChild(deckSelected.querySelector('img').cloneNode(true))
    config.appendChild(deckSelected.querySelector('div').cloneNode(true))
}

function displayRowsConfig (isActive) {
    let configMenu = document.getElementById('configDeleteRows');

    if (isActive) {
        configMenu.innerHTML = 'Suppression automatique des lignes vides';
    } else {
        configMenu.innerHTML = 'Pas de suppression automatique';
    }
}

// Utilities
function displayNumber (n) {
    return (n < 10 ? '0' : '') + n;
}
