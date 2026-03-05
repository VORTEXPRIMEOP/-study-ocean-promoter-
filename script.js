const intro = document.getElementById("intro");

const text = "ACCESSING STUDYOCEAN...";
let i = 0;

function typeEffect(){
  if(i < text.length){
    intro.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect,50);
  }else{
    setTimeout(()=>{
      intro.style.display="none";
    },1000);
  }
}

typeEffect();

// LOAD IMAGE
fetch("/image")
.then(res=>res.json())
.then(data=>{
  if(data.image){
    document.getElementById("mainImage").src = data.image;
  }
});

// LOAD ANNOUNCEMENT
fetch("/announcement")
.then(res=>res.json())
.then(data=>{
  document.getElementById("announcementBox").innerText = data.text;
});