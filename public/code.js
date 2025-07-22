let jsonData;
let albumIndex= 0;
let postIndex=0;

fetch('images.json')
   .then(res => res.json())
   .then(data => {
      jsonData = data;
      populate_albums();
   })

function populate_albums() {
   jsonData.albums.forEach(path => {
    
   
   const photo_box = document.createElement('div');
   
   const img = document.createElement('img');
   
   const description_wrapper= document.createElement('div')
   const description = document.createElement('p');

   photo_box.dataset.index=albumIndex;
   photo_box.className="photo_box";

   img.src=path.images.slice().reverse()[1];
   img.className="img";

   description.innerHTML=path.name;
   description.className="description";

   description_wrapper.className='description_wrapper'
   description_wrapper.dataset.index=albumIndex
   photo_box.onclick= goTo;
   photo_box.appendChild(img);
   description_wrapper.appendChild(description);
   photo_box.appendChild(description_wrapper);
    
   photo_grid_top= document.getElementById('photo_grid_top');
   photo_grid_bottom= document.getElementById('photo_grid_bottom');
   
   if (albumIndex%2==0){
      photo_grid_top.appendChild(photo_box);
   }
   else photo_grid_bottom.appendChild(photo_box);

   

   albumIndex=albumIndex+1;
   });
}

function goTo() {


   const photo_grid_top = document.createElement('div');
   const photo_grid_bottom= document.createElement('div');
   const photo_grid_wrapper = document.createElement('div');

   index=event.target.parentElement.dataset.index;

   document.getElementById("album_grid_wrapper").remove();

   photo_grid_top.className="photo_grid";
   photo_grid_bottom.className="photo_grid";
   photo_grid_top.id="photo_grid_top";
   photo_grid_bottom.id="photo_grid_bottom";
   photo_grid_wrapper.className="photo_grid_wrapper";

   photo_grid_wrapper.appendChild(photo_grid_top);
   photo_grid_wrapper.appendChild(photo_grid_bottom);
   
   document.getElementById('body').appendChild(photo_grid_wrapper);
   
   jsonData.albums[index].images.slice().reverse().forEach(path => {
   
   
   document.getElementsByClassName("header_text")[0].innerHTML=jsonData.albums[index].name;
   document.getElementById("top_head").style.backgroundImage="linear-gradient(90deg,rgba(206, 255, 8, 1) 9%, rgba(77, 255, 219, 1) 48%, rgba(255, 0, 85, 1) 85%)";


   const description_wrapper= document.createElement('a');
   const photo_box = document.createElement('div');
   const img = document.createElement('img');
   const description = document.createElement('p');


   img.src = path;

   img.onclick = () => image_maximize();
   photo_box.dataset.index=postIndex;
   photo_box.className='photo_box';
   photo_box.onmouseover = image_hover;
   
   description.innerHTML = "Download";
   description.className="description";
   description_wrapper.className="description_wrapper"
   description_wrapper.href=path;
   description_wrapper.download=true;
      
   photo_box.appendChild(img);
   description_wrapper.appendChild(description);
   photo_box.appendChild(description_wrapper);

   if (postIndex%2==0){
      photo_grid_top.appendChild(photo_box);
   }
      else photo_grid_bottom.appendChild(photo_box);
   
      postIndex++;
   });
   
}

function image_maximize() {
   
   const imageClicked = event.target.parentElement.children[0];
   const screenwrapper = document.createElement('div');
   const imagewrapper = document.createElement('div');
   const highlighted_image_description_wrapper = document.createElement('a')
   const description = document.createElement('a');
   const img = document.createElement('img');

   img.src = imageClicked.src;
   img.id = "highlighted_image";
   highlighted_image_description_wrapper.href = imageClicked.src;
   highlighted_image_description_wrapper.download=true;
   highlighted_image_description_wrapper.className="highlighted_image_description_wrapper";
   

   imagewrapper.id='imagewrapper';

   description.innerHTML="Download This Image";

   screenwrapper.id = "highlighted_image_wrapper";
   screenwrapper.onclick = () => close_maximized_image();
   highlighted_image_description_wrapper.appendChild(description)
   imagewrapper.appendChild(img);
   imagewrapper.appendChild(highlighted_image_description_wrapper);
   screenwrapper.appendChild(imagewrapper);
   body.appendChild(screenwrapper);


}

function close_maximized_image() {
   document.getElementById("highlighted_image_wrapper").remove();
}


function image_hover(){
   event.target.src.border="2px solid black"
}