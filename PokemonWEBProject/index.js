const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d") //2d API c = canvasContext

console.log(collisions);

canvas.width = 1024 //width of the canvas
canvas.height = 576 //height of the canvas

//console.log(c) //! outputs the context

const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48 
        this.height = 48 
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
            x: j * Boundary.width,
            y: i * Boundary.height
                }
            })
        )
    })
})



//c.fillStyle = 'white' //changes fillRect to white canvas on top of the black context
//c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = 'PokeTown.png'; //sets new image on the html canvas page

const playerImage = new Image() //Created new const for playerImage 
playerImage.src = 'playerDown.png' 

class Sprite {
    constructor({
        position, velocity, image}) { 
            // whenever you create a new isntance of a sprite we automatically call the code in the function
        this.position = position 
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y) //used to offset our image, in simpler terms, to get the character start at a specific grid point

    }

}

const background = new Sprite({position: {
    x: -784, 
    y: -790
    },
    image: image //being passed through the constructer and then going to this.image
}) //new sprite created within the background constant
//Create a new sprite, whenever a new sprite is created is going to pass one single object

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate) // this will call animate function, infinite loop
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
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

    if (keys.w.pressed && lastKey === 'w') background.position.y = background.position.y + 3 //allows to move upwards
    else if (keys.a.pressed && lastKey === 'a') background.position.x = background.position.x + 3
    else if (keys.d.pressed && lastKey === 'd') background.position.x = background.position.x - 3
    else if (keys.s.pressed && lastKey === 's') background.position.y = background.position.y - 3
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => { //btw e stands for event
    //outputs the event on the console subtab in inspect element
    //e.key will log out the exact key that the user is pressing down on
//need to have events for specific keys 
switch (e.key) {
    case 'w':
        keys.w.pressed = true  
        lastKey = 'w' //track whatever the last key pressed down was same with lines 93 98 and 103
        break 

    case 'a':
        keys.a.pressed = true 
        lastKey = 'a'
        break 

    case 's':
        keys.s.pressed = true 
        lastKey = 's'
        break 

    case 'd':
        keys.d.pressed = true 
        lastKey = 'd'
        break 
       
}
})

window.addEventListener('keyup', (e) => { //keyup function

switch (e.key) {
    case 'w':
        keys.w.pressed = false 
        break 

    case 'a':
        keys.a.pressed = false
        break 

    case 's':
        keys.s.pressed = false
        break 

    case 'd':
        keys.d.pressed = false
        break 
       
}
})


