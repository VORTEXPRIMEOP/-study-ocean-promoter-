// intro animation
setTimeout(()=>{
  document.getElementById("intro").style.display="none";
  document.getElementById("main").style.display="block";
},3000);

// load posts
async function loadPosts(){
  const res = await fetch("data.json");
  const posts = await res.json();

  const container=document.getElementById("posts");
  container.innerHTML="";

  posts.reverse().forEach(p=>{
    container.innerHTML+=`
      <div class="card">
        <h3>${p.title}</h3>
        <img src="${p.image}">
      </div>
    `;
  });
}

loadPosts();