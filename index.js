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
 
//1.45.27 time 
