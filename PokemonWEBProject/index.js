const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d") //2d API c = canvasContext

canvas.width = 1024 //width of the canvas
canvas.height = 576 //height of the canvas

console.log(c) //! outputs the context

c.fillStyle = 'white' //changes fillRect to white canvas on top of the black context
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = 'PokeTown.png'; //sets new image on the html canvas page

const playerImage = new Image() //Created new const for playerImage 
playerImage.src = 'playerDown.png' 

image.onload = () => { 

    c.drawImage(image, -784, -790) //used to offset our image, in simpler terms, to get the character start at a specific grid point
    c.drawImage(playerImage,
        0, //first argument (x-cordinate)
        0, // Y-axis crop
        playerImage.width / 4, //crop width needs to be playerImage.width / 4 to get 1/4 of the image
        playerImage.height, //dont need to divide anything
        canvas.width / 2 - (playerImage.width / 4) / 2,
         canvas.height / 2 - playerImage.height / 2, // use to input image onto the canvas web, also change X and Y to determine where the player should be drawn
        //line 25 and 26 are arguements that declare placement
        playerImage.width / 4,
        playerImage.height
        // lines 22-25 are for cropping arguments 
        //rest of the lines from 26 are actual lines to have the image rendered out to the canvas page
    )
}

window.addEventListener('keydown', (e) => { //btw e stands for event
    console.log(e.key) //outputs the event on the console subtab in inspect element
    //e.key will log out the exact key that the user is pressing down on
})
//need to have events for specific keys 
switch (e.key) {
    case 'w':
        console.log('pressed w key')
        break 
        // Whenever e.key is equal to W, we want to call whatever code that should be in between of case and break
        //so to make that make sense, this case will only be activated when the user hits the w key
}
//things to add on the notion journal entry -> how does a switch statement work in vanilla js 
//also what is vanilla js and what is the framework for it
//think about more questions like these
 
//1.45.27 time 
