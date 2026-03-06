/* INTRO TIMER */

setTimeout(()=>{

document.getElementById("intro").style.display="none"

},3000)



/* MATRIX EFFECT */

const canvas=document.getElementById("matrix")

const ctx=canvas.getContext("2d")

canvas.height=window.innerHeight
canvas.width=window.innerWidth

let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*"

letters=letters.split("")

let fontSize=14

let columns=canvas.width/fontSize

let drops=[]

for(let x=0;x<columns;x++)
drops[x]=1


function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#0F0"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

let text=letters[Math.floor(Math.random()*letters.length)]

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
drops[i]=0

drops[i]++

}

}

setInterval(draw,33)



/* NAVIGATION */

function home(){

location.reload()

}

function contact(){

window.open("https://t.me/Vortex_prime_contactbot")

}

function admin(){

window.open("admin.html")

}


/* PROMOTIONS */

let images=[]


function showPromotions(){

const gallery=document.getElementById("gallery")

gallery.innerHTML=""

images.forEach(img=>{

let i=document.createElement("img")

i.src=img

gallery.appendChild(i)

})

document.getElementById("count").innerText=images.length

}