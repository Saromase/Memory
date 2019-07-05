document.getElementById('configurationMenu').addEventListener('click', displayConfiguration);

document.getElementById('numberCards').addEventListener('keyup', checkCardsNumber);

document.getElementById('resetConfig').addEventListener('click', resetConfigurationInput);

document.getElementById('saveConfig').addEventListener('click', saveConfigurationInput);

var Config = {
    numberCard : 20
}


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
}

function saveConfigurationInput () {
    let number = document.getElementById('numberCards');
    Config.numberCard = number.value;
    document.getElementById('configNumberCards').innerHTML = number.value;



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

function prepareGame() {
    console.log(Config);
    localStorage.setItem('config', JSON.stringify(Config));
}

