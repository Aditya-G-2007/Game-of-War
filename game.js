// select all the required dom elements 
const newDeck = document.getElementById("NewDeck")
const remainingCards = document.getElementById("remaining")
const computerScore = document.getElementById("comp")
const placeholder1 = document.getElementById("one")
const placeholder2 =  document.getElementById("two")
const userScore = document.getElementById("user")
const draw = document.getElementById("drawbutton")
const topPart = document.getElementById("top")

let deckID ; // aka current dexk id 
//const allCards = []; // array of all cards
let remaining;
let scoreofUser=0;
let scoreofComputer=0;

const details = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "JACK":11,
    "QUEEN":12,
    "KING":13,
    "ACE":14
}

function generateNewDeck(event){
    // check for previous dom nodes 
    draw.disabled = false;
    draw.style.opacity=1;
    scoreofUser=0;
    scoreofComputer=0;
    // need to update the computers and users score dom nodes
    computerScore.innerText=`Computer Score : 0`
    userScore.innerText=`My Score : 0`
    const toRemoveElement = document.getElementById("winnerName");
    const Image_1 = document.getElementById("imageOne")
    const Image_2 = document.getElementById("imageTwo")

    if(Image_1!=null && Image_2!=null){
        Image_1.remove();
        Image_2.remove();
    }

    if(toRemoveElement!=null){
        toRemoveElement.remove();
    }

    async function getnewdeck() {
        try{

            const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
            const data = await response.json() // getting only the body part of the request!
            // data --> object
            deckID=data["deck_id"];
        }

        catch(error){
            alert(`unexpected error : ${error}`)
        }
    }
    getnewdeck(); // calling the function
 }

 function checkDeckFinished(){
    if (remaining ===0){
            draw.disabled = true;
            draw.style.opacity = 0.5; 

            if(scoreofComputer>scoreofUser){
                const winner = document.createElement("h3")
                winner.innerText=`Computer won! 🤖`
                winner.style.marginLeft="27%"
                winner.id="winnerName"
                winner.style.fontFamily="Rye"
                winner.style.fontWeight="bold"
                winner.style.color="yellow"
                topPart.append(winner)
            }

            if(scoreofUser>scoreofComputer){
                const winner = document.createElement("h3")
                winner.innerText=`You won! 🥳`
                winner.style.marginLeft="27%"
                winner.id="winnerName"
                winner.style.fontFamily="Rye"
                winner.style.fontWeight="bold"
                winner.style.fontSize="25px"
                 winner.style.color="yellow"
                topPart.append(winner)
            }

            if(scoreofComputer === scoreofUser){
                const winner = document.createElement("h3")
                winner.innerText=`It's a TIE 🤝`
                winner.style.marginLeft="27%"
                winner.id="winnerName"
                winner.style.fontFamily="Rye"
                winner.style.fontWeight="bold"
                winner.style.color="yellow"
                topPart.append(winner)
            }
        }
    }


function checkPrevElementExistsStatus(){
    // returning a bool
    const e1 = document.getElementById("imageOne")
    const e2 =  document.getElementById("imageTwo")
    if(e1 != null && e2 !=null){
        e1.remove();
        e2.remove();
    }
    return;
}

function drawCards(){
    // need to check if the previos images exists !
     checkPrevElementExistsStatus()

    async function fetchcards(){
        const cardsResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`) // response object contains only 2 cards
        const cardsData = await cardsResponse.json()

        remaining=cardsData["remaining"];
        let allCards=cardsData["cards"]
        remainingCards.innerText = `Remaining Cards : ${remaining}`
    
        const img1 = document.createElement("img")
        const img2 = document.createElement("img")
        img1.id = "imageOne";
        img2.id= "imageTwo";
        img1.src=allCards[0]["images"]["png"];
        img2.src=allCards[1]["images"]["png"];
        img1.style.height="200px"
        img1.style.width ="150px"
        img2.style.height="200px"
        img2.style.width ="150px"
        placeholder1.append(img1);
        placeholder2.append(img2);

        let value1 = details[allCards[0]["value"]]
        let value2 = details[allCards[1]["value"]]

     if (value1 > value2) {
          scoreofComputer += 1;
          computerScore.innerText = `Computer Score : ${scoreofComputer}`;

    } else if (value2 > value1) {
          scoreofUser += 1;
          userScore.innerText = `My Score : ${scoreofUser}`;
    } else {
         // It's a tie! No one gets a point, or you can add a "War!" message.
         console.log("It's a tie!");
    }

    checkDeckFinished()
    }
    fetchcards();
}

 newDeck.addEventListener("click",(event)=>{
    generateNewDeck(event)
})

draw.addEventListener("click",(event)=>{
    drawCards(event)
})


// need to add check winner in my draw button !
// need to remove my cards once that get cliked if that exists !
// font faamily need to select  // font weight !

