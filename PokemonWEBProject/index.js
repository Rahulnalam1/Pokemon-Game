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

class Sprite {
    constructor({
        position, velocity}) { 
            // whenever you create a new isntance of a sprite we automatically call the code in the function
        this.position = position 
    }
}

const background = new Sprite({position: {
    x: 0, 
    y: 0
    }
}) //new sprite created within the background constant
//Create a new sprite, whenever a new sprite is created is going to pass one single object

function animate() {
    window.requestAnimationFrame(animate) // this will call animate function, infinite loop
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
animate()

window.addEventListener('keydown', (e) => { //btw e stands for event
    //outputs the event on the console subtab in inspect element
    //e.key will log out the exact key that the user is pressing down on
//need to have events for specific keys 
switch (e.key) {
    case 'w':
        console.log('pressed w key')
        break 

    case 'a':
        console.log('pressed a key')
        break 

    case 's':
        console.log('pressed s key')
        break 

    case 'd':
        console.log('pressed d key')
        break 
       
}
})

//1.45.27 time 
