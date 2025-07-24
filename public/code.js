let jsonData;
let albumIndex= 0;
let postIndex=0;

fetch('images.json')
   .then(res => res.json())
   .then(data => {
      jsonData = data;
      populateAlbums();
   })

function populateAlbums() {
   
   jsonData.albums.forEach(path => {
    
      const photo_box = document.createElement('div');
      const img = document.createElement('img');
      const description_wrapper= document.createElement('div')
      const description = document.createElement('p');
      const photo_grid_top= document.getElementById('photo_grid_top');
      const photo_grid_bottom= document.getElementById('photo_grid_bottom');

      photo_box.dataset.index=albumIndex;
      photo_box.className="photo_box";
      photo_box.onclick= populateImages;
      photo_box.appendChild(img);
      photo_box.appendChild(description_wrapper);

      img.src=path.images.slice().reverse()[1];
      img.className="img";

      description_wrapper.className='description_wrapper'
      description_wrapper.dataset.index=albumIndex
      description_wrapper.appendChild(description);

      description.innerHTML=path.name;
      description.className="description";
      
      if (albumIndex%2==0){
         photo_grid_top.appendChild(photo_box);
      }
      else {
         photo_grid_bottom.appendChild(photo_box)
      };
      
      albumIndex=albumIndex+1;

   });
}

function populateImages() {

   document.getElementById("album_grid_wrapper").remove();

   let index=event.target.parentElement.dataset.index;

   document.getElementById("top_head_landing_page").style.backgroundImage="linear-gradient(90deg,rgba(206, 255, 8, 1) 9%, rgba(77, 255, 219, 1) 48%, rgba(255, 0, 85, 1) 85%)";
   document.getElementsByClassName("header_text")[0].innerHTML=jsonData.albums[index].name;

   const photo_grid_top = document.createElement('div');
   const photo_grid_bottom= document.createElement('div');
   const photo_grid_wrapper = document.createElement('div');

   document.getElementById('body').appendChild(photo_grid_wrapper);
   
   photo_grid_wrapper.className="photo_grid_wrapper";
   photo_grid_wrapper.appendChild(photo_grid_top);
   photo_grid_wrapper.appendChild(photo_grid_bottom);

   photo_grid_top.className="photo_grid";
   photo_grid_top.id="photo_grid_top";

   photo_grid_bottom.className="photo_grid";
   photo_grid_bottom.id="photo_grid_bottom";

   jsonData.albums[index].images.slice().reverse().forEach(path => {

      const photo_box = document.createElement('div');
      const description_wrapper= document.createElement('a');
      const description = document.createElement('p');
      const img = document.createElement('img');

      photo_box.dataset.index=postIndex;
      photo_box.className='photo_box';
      photo_box.appendChild(img);
      photo_box.appendChild(description_wrapper);

      img.src = path;
      img.onclick = () => imageMaximize();
   
      description_wrapper.className="description_wrapper"
      description_wrapper.href=path;
      description_wrapper.download=true;
      description_wrapper.appendChild(description);

      description.innerHTML = "Download";
      description.className="description";
         
      if (postIndex%2==0){
         photo_grid_top.appendChild(photo_box);
      }
      else {photo_grid_bottom.appendChild(photo_box)
      };

         postIndex++;

   });
   
}

function imageMaximize() {
   
   const screenwrapper = document.createElement('div');
   const imageClicked = event.target.parentElement.children[0];
   const imagewrapper = document.createElement('div');
   const highlighted_image_description_wrapper = document.createElement('a')
   const description = document.createElement('a');
   const img = document.createElement('img');

   img.src = imageClicked.src;
   img.id = "highlighted_image";
   img.onclick = () => closeMaximizedImage();

   highlighted_image_description_wrapper.href = imageClicked.src;
   highlighted_image_description_wrapper.download=true;
   highlighted_image_description_wrapper.className="highlighted_image_description_wrapper";
   highlighted_image_description_wrapper.appendChild(description)

   description.className="description";
   description.innerHTML="Download This Image";

   imagewrapper.id='imagewrapper';
   imagewrapper.appendChild(img);
   imagewrapper.appendChild(highlighted_image_description_wrapper);

   screenwrapper.id = "highlighted_image_wrapper";
   screenwrapper.appendChild(imagewrapper);

   body.appendChild(screenwrapper);

}

function closeMaximizedImage() {
   document.getElementById("highlighted_image_wrapper").remove();
}


