document.getElementById('configurationMenu').addEventListener('click', displayConfiguration);

document.getElementById('numberCards').addEventListener('keyup', checkCardsNumber);

document.getElementById('resetConfig').addEventListener('click', resetConfigurationInput);

document.getElementById('saveConfig').addEventListener('click', saveConfigurationInput);

document.getElementById('backcard').addEventListener('click', selectedBackCard);

var DefaultConfig = {
    numberCard : 20,
    corner     : '&starf;'
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
    
    document.getElementsByClassName('selected')[0].classList.remove('selected');
    document.querySelector('[data-back-card="starf"]').classList.add('selected');



}

function saveConfigurationInput () {
    // Nombre de carte
    let number = document.getElementById('numberCards');
    Config.numberCard = number.value;
    document.getElementById('configNumberCards').innerHTML = displayNumber(number.value);

    // Arriere des cartes
    let corner = document.getElementsByClassName('selected')[0];
    Config.corner = '&' + corner.dataset.backCard + ';';


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

    let previousSelected = document.getElementsByClassName('selected')[0];
    previousSelected.classList.remove('selected');

    card.classList.add('selected');
}

function prepareGame() {
    console.log(Config, DefaultConfig);
    let config = Config || DefaultConfig;
    localStorage.setItem('config', JSON.stringify(config));
}




// Utilities
function displayNumber (n) {
    return (n < 10 ? '0' : '') + n;
}
