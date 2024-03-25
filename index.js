const accessKey = 'fWLMT6kTeP73m43U3JiqWfUjQosKrA_ti1cZEKILR8c';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;

//this is the function to fetch images from unsplash API
const fetchImages = async (query, pageNo) =>{
    if(pageNo === 1){
        imagesContainer.innerHTML = '';
    }

    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();


    //console.log(data);
    data.results.forEach(photo =>{
        //creating omage div
        const imageElement = document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

        //creating overlay
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        //creating overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);

        imagesContainer.appendChild(imageElement);
    });
    
    if(data.total_pages === pageNo){
        loadMoreBtn.style.display = "none";
    }
    else{
        loadMoreBtn.style.display = "block";
    }

    if (imagesContainer.innerHTML.trim() === '') {
        imagesContainer.innerHTML = `<h2>No Images To Show. Search to See.</h2>`;
    } else {
        imagesContainer.querySelector('h2').style.display = 'none';
    }
};

//Adding event listener to search form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        page = 1;
        fetchImages(inputText);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a proper search query.</h2>`
    }
})

//Adding event listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', ()=>{
    fetchImages(searchInput.value.trim(), ++page);
})