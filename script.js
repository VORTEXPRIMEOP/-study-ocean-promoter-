async function loadImages(){

  const res = await fetch("/images");
  const images = await res.json();

  const gallery = document.getElementById("gallery");
  if(!gallery) return;

  gallery.innerHTML="";

  images.forEach(img=>{
    const image=document.createElement("img");
    image.src="/uploads/"+img;
    gallery.appendChild(image);
  });

  const total=document.getElementById("total");
  if(total){
    total.innerHTML="TOTAL PROMOTIONS ☠️ = "+images.length;
  }
}

loadImages();