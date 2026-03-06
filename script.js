const cloudName = "dzenvybf4";
const preset = "vortex_upload"; // upload preset name

// Intro 3 sec
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("main").style.display = "block";
}, 3000);


// Upload image
function uploadImage(){

let file = document.getElementById("fileInput").files[0];

if(!file){
alert("Select image first");
return;
}

let formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", preset);

fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
method:"POST",
body:formData
})
.then(res => res.json())
.then(data => {

if(data.secure_url){

let img = document.createElement("img");
img.src = data.secure_url;

document.getElementById("gallery").prepend(img);

alert("Upload Success");

}else{
alert("Upload Failed");
}

})
.catch(err=>{
console.log(err);
alert("Error uploading image");
});

}