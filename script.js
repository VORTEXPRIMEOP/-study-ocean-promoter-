const CLOUD_NAME = "your_cloud_name"
const UPLOAD_PRESET = "website_upload"

const gallery = document.getElementById("gallery")

function uploadImage(){

const file = document.getElementById("fileInput").files[0]

const formData = new FormData()
formData.append("file",file)
formData.append("upload_preset",UPLOAD_PRESET)

fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{
addImage(data.secure_url)
})
}

function addImage(url){

const img=document.createElement("img")
img.src=url
gallery.appendChild(img)

saveImage(url)

}

function saveImage(url){

let images=JSON.parse(localStorage.getItem("images")) || []
images.push(url)
localStorage.setItem("images",JSON.stringify(images))

}

function loadImages(){

let images=JSON.parse(localStorage.getItem("images")) || []

images.forEach(url=>{
addImage(url)
})

}

loadImages()