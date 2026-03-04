/* ===== MATRIX INTRO ===== */

const matrix=document.getElementById("matrix");
const ctx=matrix.getContext("2d");

matrix.width=window.innerWidth;
matrix.height=window.innerHeight;

const letters="01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const size=16;
const columns=matrix.width/size;
const drops=Array(Math.floor(columns)).fill(1);

function drawMatrix(){
ctx.fillStyle="rgba(0,0,0,0.05)";
ctx.fillRect(0,0,matrix.width,matrix.height);

ctx.fillStyle="#00ff00";
ctx.font=size+"px monospace";

drops.forEach((y,i)=>{
const text=letters[Math.floor(Math.random()*letters.length)];
ctx.fillText(text,i*size,y*size);

if(y*size>matrix.height&&Math.random()>0.975)
drops[i]=0;

drops[i]++;
});
}

setInterval(drawMatrix,50);

/* INTRO END */

setTimeout(()=>{
document.getElementById("intro").style.display="none";
document.getElementById("main").style.display="block";
startParticles();
},6000);

/* ===== PARTICLES ===== */

function startParticles(){
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<90;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.8,
vy:(Math.random()-0.5)*0.8,
size:2+Math.random()*2
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="#5be7ff";
ctx.shadowBlur=15;
ctx.shadowColor="#5be7ff";
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();
}

/* ===== GALLERY ===== */

const gallery=document.getElementById("gallery");
const totalSpan=document.getElementById("total-promotions");

async function loadPhotos(){

gallery.classList.remove("hidden");

const res=await fetch("/photos");
const data=await res.json();

gallery.innerHTML="";

data.forEach(photo=>{
const img=document.createElement("img");
img.src="/uploads/"+photo;
gallery.appendChild(img);
});

totalSpan.innerHTML=`TOTAL PROMOTIONS &#9760;= ${data.length}`;
}

/* SHOW ONLY AFTER CLICK */
document.getElementById("view-promotions").onclick=loadPhotos;
document.getElementById("promotions-btn").onclick=loadPhotos;

document.getElementById("home").onclick=()=>{
gallery.classList.add("hidden");
location.reload();
};