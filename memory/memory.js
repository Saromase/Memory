var CardDeck = [];

var CardVisible = 0;

var ScoreCount = 0;

var PairCount;

var PairFound = 0;

var Timer = 0;

var ClockTimer;

var LoadImages = [];

var RootAssets = '../assets/';

var DefaultConfig = {
    numberCard : 20,
    corner     : '&starf;'
}

var Images = {
    images : ['palm.svg','beach.svg','leaf.svg','iced tea.svg','cherries.svg','toucan.svg','sunglasses.svg','sunset.svg','flower.svg','starfish.svg','yatch.svg','popsicle.svg','banana.svg','Pamela.svg','flower.svg','beach ball.svg','flower.svg','mango.svg','ice cream.svg','hammock.svg','cocktail.svg','tiki.svg','slippers.svg','Surfboard.svg','dolphin.svg','palm tree.svg','shell.svg','lemon.svg','coconut.svg','jellyfish.svg','flamingo.svg','sun.svg','wave.svg','shack.svg','macaw.svg','crab.svg','sun cream.svg','necklace.svg','clown fish.svg','flower.svg','pineapple.svg','lifesaver.svg','cactus.svg','shell.svg','shirt.svg','volcano.svg','watermelon.svg','compass.svg','bucket.svg','ice cream.svg'],
    path : 'tropico'
}

var FileImage = {
    images : ['after-effects.svg','avi.svg','csv.svg','dreamweaver.svg','file.svg','fla.svg','indesign.svg','jpg.svg','mp4.svg','png.svg','premiere.svg','search.svg','xls.svg','zip.svg','ai.svg','bridge.svg','dbf.svg','dwg.svg','fireworks.svg','html.svg','iso.svg','json-file.svg','pdf.svg','ppt.svg','psd.svg','svg.svg','xml.svg','audition.svg','css.svg','doc.svg','exe.svg','flash.svg','illustrator.svg','javascript.svg','mp3.svg','photoshop.svg','prelude.svg','rtf.svg','txt.svg','zip-1.svg'],
    path : 'fileExt'
}

window.addEventListener('load', function() {
    getConfig();
    for (let index = 0; index < PairCount; index++) {
        createCardDeck(Images.images, Images.path);
    }
    let tmpCardDeck = CardDeck.slice(0);
    CardDeck = shuffle(CardDeck.concat(tmpCardDeck));


    for (let index = 0; index < CardDeck.length; index++) {
        createCard(index);
    }

    document.getElementById('pairCount').innerHTML = displayNumber(PairFound) + ' / ' + displayNumber(PairCount);
});

function getConfig () {
    Config = JSON.parse(localStorage.getItem('config'))
    PairCount = Config.numberCard / 2 || DefaultConfig.numberCard;

    CornerSelected = Config.corner || DefaultConfig.corner;

}

function createCardDeck (images, path)
{
    let imageSelected = getRandomInt(1, images.length);
    let image = images[imageSelected];
    let imageSrc = RootAssets + '/' + path + '/' + image;
    if (!LoadImages[imageSelected]) {
        LoadImages[imageSelected] = new Image();
        LoadImages[imageSelected].src = imageSrc;
    }

    let Card = {
        image       : imageSrc,
        description : image.split('.')[0]
    }

    CardDeck.push(Card);
}

function createCard (increment)
{
    let cardHTML = document.createElement('div');
    cardHTML.classList = 'card';
    cardHTML.dataset.deckPosition = increment
    cardHTML.dataset.cardVisible = false;
    cardHTML.addEventListener('click', function () {flipCard(increment)});
    createStarDecoration(cardHTML);

    document.getElementById('memory-container').appendChild(cardHTML);
}

function flipCard (cardId)
{
    if (ScoreCount === 0 && CardVisible === 0) {
        ClockTimer = setInterval(startTimer, 1000);
    }
    let card = document.querySelector('[data-deck-position="' + cardId + '"]');
    if (card.dataset.cardVisible === 'true') {
        return false;
    } else if (CardVisible === 0) {
        let cardPosition = parseInt(card.dataset.deckPosition, 10);
    
        let imageHTML = document.createElement('img');
        imageHTML.src = CardDeck[cardPosition].image;
        imageHTML.alt = CardDeck[cardPosition].description;
        imageHTML.classList = 'card-img';
        card.appendChild(imageHTML);
    
        let cardFooter = document.createElement('div');
        cardFooter.classList = 'card-footer';
        let cardFooterText = document.createTextNode(ucFirst(CardDeck[cardPosition].description));
        cardFooter.appendChild(cardFooterText);
        card.appendChild(cardFooter);
    
        card.dataset.cardVisible = true;
        card.classList = 'card-visible';

        CardVisible++;
    } else {
        let firstCard = document.querySelector('[data-card-visible="true"]');
        let card = document.querySelector('[data-deck-position="' + cardId + '"]');

        let cardPosition = parseInt(card.dataset.deckPosition, 10);
    
        let imageHTML = document.createElement('img');
        imageHTML.src = CardDeck[cardPosition].image;
        imageHTML.alt = CardDeck[cardPosition].description;
        imageHTML.classList = 'card-img';
        card.appendChild(imageHTML);
    
        let cardFooter = document.createElement('div');
        cardFooter.classList = 'card-footer';
        let cardFooterText = document.createTextNode(ucFirst(CardDeck[cardPosition].description));
        cardFooter.appendChild(cardFooterText);
        card.appendChild(cardFooter);
    
        card.dataset.cardVisible = true;
        card.classList = 'card-visible';

        setTimeout(function(){ checkCards(firstCard, card) }, 500);
        CardVisible = 0;

        ScoreCount++;
        document.getElementById('scoreCount').innerHTML = displayNumber(ScoreCount);
    }

}

function checkCards (firstCard, card)
{
    if (firstCard.querySelector('img').alt === card.querySelector('img').alt) {
        firstCard.dataset.cardVisible = false;
        firstCard.style.visibility = 'hidden';

        card.dataset.cardVisible = false;
        card.style.visibility = 'hidden';

        PairFound++;
        document.getElementById('pairCount').innerHTML = displayNumber(PairFound) + ' / ' + displayNumber(PairCount) 
        if (PairFound === PairCount) {
            clearInterval(ClockTimer);
            displayWonModal();
        }
    } else {
        firstCard.dataset.cardVisible = false;
        firstCard.innerHTML = '';
        firstCard.classList = 'card';
        createStarDecoration(firstCard);

        card.dataset.cardVisible = false;
        card.innerHTML = '';
        card.classList = 'card';
        createStarDecoration(card);
    }
}

function displayWonModal ()
{
    let modal = document.createElement('div');
    modal.classList = 'win-modal';

    let topModal = document.createElement('div');
    topModal.classList = 'win-top';

    let tick = document.createElement('img');
    tick.classList = 'tick';
    tick.src = RootAssets + 'checked.svg';
    tick.alt = 'Checked';
    topModal.appendChild(tick);
    modal.appendChild(topModal);

    
    let botModal = document.createElement('div');
    botModal.classList = 'win-bot';

    let clock = document.createElement('div');
    clock.classList = 'win-items';
    let clockIcon = document.createElement('img');
    clockIcon.src = RootAssets + 'clock-circular-outline.svg';
    clockIcon.alt = 'Clock';
    let clockDescribe = document.createElement('div');
    clockDescribe.classList = 'describe';
    clockDescribe.innerHTML = parseSecond(Timer);
    clock.appendChild(clockIcon);
    clock.appendChild(clockDescribe);
    botModal.appendChild(clock);

    let pair = document.createElement('div');
    pair.classList = 'win-items';
    let pairIcon = document.createElement('img');
    pairIcon.src = RootAssets + 'cards.svg';
    pairIcon.alt = 'Pair';
    let pairDescribe = document.createElement('div');
    pairDescribe.classList = 'describe';
    pairDescribe.innerHTML = displayNumber(PairCount);
    pair.appendChild(pairIcon);
    pair.appendChild(pairDescribe);
    botModal.appendChild(pair);

    let click = document.createElement('div');
    click.classList = 'win-items';
    let clickIcon = document.createElement('img');
    clickIcon.src = RootAssets + 'click.svg';
    clickIcon.alt = 'click';
    let clickDescribe = document.createElement('div');
    clickDescribe.classList = 'describe';
    clickDescribe.innerHTML = displayNumber(ScoreCount);
    click.appendChild(clickIcon);
    click.appendChild(clickDescribe);
    botModal.appendChild(click);

    modal.appendChild(botModal);

    document.body.appendChild(modal);
}

function createStarDecoration (card)
{
    let corner = document.createElement('span');
    corner.classList = 'corner';
    corner.innerHTML = CornerSelected;
    card.appendChild(corner);

    let cornerRight = document.createElement('span');
    cornerRight.classList = 'corner';
    cornerRight.innerHTML = CornerSelected;
    card.appendChild(cornerRight);

    let cornerBottomRight = document.createElement('span');
    cornerBottomRight.classList = 'corner';
    cornerBottomRight.innerHTML = CornerSelected;
    card.appendChild(cornerBottomRight);

    let cornerBottomLeft = document.createElement('span');
    cornerBottomLeft.classList = 'corner';
    cornerBottomLeft.innerHTML = CornerSelected;
    card.appendChild(cornerBottomLeft);
}

function startTimer ()
{
    Timer++;
    document.getElementById('timer').innerHTML = parseSecond(Timer);
}




/* Utilities */
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

function ucFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function parseSecond (second) {
    return new Date(second * 1000).toISOString().substr(11, 8)
}

function displayNumber (n) {
    return (n < 10 ? '0' : '') + n;
}