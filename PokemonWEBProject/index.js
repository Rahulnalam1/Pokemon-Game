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
const offset = {
    x: -1290,
    y: -620
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
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
    constructor({position, velocity, image, frames = {max: 1} }) { 
            // whenever you create a new isntance of a sprite we automatically call the code in the function
        this.position = position 
        this.image = image
        this.frames = frames

        this.image.onload = () => { 
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }   
    }

    draw() {
           // c.drawImage(this.image, this.position.x, this.position.y) //used to offset our image, in simpler terms, to get the character start at a specific grid point 
            c.drawImage(
                this.image,
                0, //first argument (x-cordinate)
                0, // Y-axis crop
                this.image.width / this.frames.max,
                this.image.height, //dont need to divide anything
                this.position.x, 
                this.position.y, 
                this.image.width / this.frames.max,
                this.image.height
            )
    }

}
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4,
        y: canvas.height / 2 - 68 / 2
    }, 
    image: playerImage, 
    frames: {
        max: 4
    }
})

const background = new Sprite({position: {
    x: offset.x, 
    y: offset.y
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

const testBoundary = new Boundary({
    position: {
        x: 400, 
        y: 400
    }
})
const movables = [background, testBoundary]

function rectangularCollision({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.position.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}
function animate() {
    window.requestAnimationFrame(animate) // this will call animate function, infinite loop
    background.draw()
    // boundaries.forEach(boundary => {
    //     boundary.draw()
    // })
    testBoundary.draw()
    player.draw()
 

    if(rectangularCollision ({
        rectangle1: player, 
        rectangle2: testBoundary
    })) { 
        console.log('colliding')
    }

    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach(movable => {movable.position.y += 3
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach(movable => {movable.position.x += 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach(movable => {movable.position.x  -= 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        movables.forEach(movable => {movable.position.y -= 3
        })
    }
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
