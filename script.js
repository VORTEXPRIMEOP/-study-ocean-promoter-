/* INTRO */

setTimeout(()=>{

document.getElementById("intro").style.display="none"

},3000)



/* MATRIX */

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



function home(){

location.reload()

}

function contact(){

window.open("https://t.me/Vortex_prime_contactbot")

}

function admin(){

window.open("admin.html")

}



/* CLOUDINARY FETCH */

async function showPromotions(){

const gallery=document.getElementById("gallery")

gallery.innerHTML="Loading..."

let res=await fetch(

"https://res.cloudinary.com/dzlu3k6f9/image/list/promotions.json"

)

let data=await res.json()

gallery.innerHTML=""

data.resources.forEach(img=>{

let image=document.createElement("img")

image.src=

"https://res.cloudinary.com/dzlu3k6f9/image/upload/"+img.public_id+".jpg"

gallery.appendChild(image)

})

document.getElementById("count").innerText=data.resources.length

}