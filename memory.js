var CardDeck = [];

var CardVisible = 0;

var ScoreCount = 0;

var PairCount = 5;

var PairFound = 0;

var Timer = 0;

var ClockTimer;

var Images = ['001-palm.svg','018-beach.svg','035-leaf.svg',
'002-iced tea.svg','019-cherries.svg','036-toucan.svg',
'003-sunglasses.svg','020-sunset.svg','037-flower.svg',
'004-starfish.svg','021-yatch.svg','038-popsicle.svg',
'005-banana.svg','022-Pamela.svg','039-flower.svg',
'006-beach ball.svg','023-flower.svg','040-mango.svg',
'007-ice cream.svg','024-hammock.svg','041-cocktail.svg',
'008-tiki.svg','025-slippers.svg','042-Surfboard.svg',
'009-dolphin.svg','026-palm tree.svg','043-shell.svg',
'010-lemon.svg','027-coconut.svg','044-jellyfish.svg',
'011-flamingo.svg','028-sun.svg','045-wave.svg',
'012-shack.svg','029-macaw.svg','046-crab.svg',
'013-sun cream.svg','030-necklace.svg','047-clown fish.svg',
'014-flower.svg','031-pineapple.svg','048-lifesaver.svg',
'015-cactus.svg','032-shell.svg','049-shirt.svg',
'016-volcano.svg','033-watermelon.svg','050-compass.svg',
'017-bucket.svg','034-ice cream.svg'];

window.addEventListener('load', function() {
    for (let index = 0; index < PairCount; index++) {
        createCardDeck();
    }
    let tmpCardDeck = CardDeck.slice(0);
    CardDeck = shuffle(CardDeck.concat(tmpCardDeck));


    for (let index = 0; index < CardDeck.length; index++) {
        createCard(index);
    }

    document.getElementById('pairCount').innerHTML = PairFound + '/' + PairCount;
})

function createCardDeck ()
{
    let imageSelected = getRandomInt(1, Images.length);
    let image = Images[imageSelected];

    let Card = {
        image       : './assets/tropico/' + image,
        description : image.split('-')[1].split('.')[0]
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
        document.getElementById('scoreCount').innerHTML = ScoreCount;
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
        document.getElementById('pairCount').innerHTML = PairFound + '/' + PairCount 
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
    tick.src = './assets/checked.svg';
    tick.alt = 'Checked';
    topModal.appendChild(tick);
    modal.appendChild(topModal);

    
    let botModal = document.createElement('div');
    botModal.classList = 'win-bot';

    let clock = document.createElement('div');
    clock.classList = 'win-items';
    let clockIcon = document.createElement('img');
    clockIcon.src = './assets/clock-circular-outline.svg';
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
    pairIcon.src = './assets/cards.svg';
    pairIcon.alt = 'Pair';
    let pairDescribe = document.createElement('div');
    pairDescribe.classList = 'describe';
    pairDescribe.innerHTML = PairCount;
    pair.appendChild(pairIcon);
    pair.appendChild(pairDescribe);
    botModal.appendChild(pair);

    let click = document.createElement('div');
    click.classList = 'win-items';
    let clickIcon = document.createElement('img');
    clickIcon.src = './assets/click.svg';
    clickIcon.alt = 'click';
    let clickDescribe = document.createElement('div');
    clickDescribe.classList = 'describe';
    clickDescribe.innerHTML = ScoreCount;
    click.appendChild(clickIcon);
    click.appendChild(clickDescribe);
    botModal.appendChild(click);


    modal.appendChild(botModal);

    document.body.appendChild(modal);
}

function createStarDecoration (card)
{
    let star = document.createElement('span');
    star.classList = 'corner';
    star.innerHTML = '&starf;';
    card.appendChild(star);

    let starRight = document.createElement('span');
    starRight.classList = 'corner';
    starRight.innerHTML = '&starf;';
    card.appendChild(starRight);

    let starBottomRight = document.createElement('span');
    starBottomRight.classList = 'corner';
    starBottomRight.innerHTML = '&starf;';
    card.appendChild(starBottomRight);

    let starBottomLeft = document.createElement('span');
    starBottomLeft.classList = 'corner';
    starBottomLeft.innerHTML = '&starf;';
    card.appendChild(starBottomLeft);

    // let diams = document.createElement('span');
    // diams.classList = 'diams diams-middle';
    // diams.innerHTML = '&diams;';
    // card.appendChild(diams);
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