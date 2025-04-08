const container = document.querySelector(".container");
const URL = "https://pixabay.com/api/?key=49678158-9678e6d8ae4059b18d8292101&per_page=10";

// Async -> return promise
async function ImgContainer(){
    let images;
    try{
        // await -> pauses the execution
        images = await fetch(URL).then(response => response.json());

        console.log(images.hits);
            let hitsArray = images.hits;
            hitsArray.forEach(img => {
                const image = document.createElement("img");
                image.src = img.webformatURL;
                container.appendChild(image);
            });
    }
    catch(error){ 
        console.error(error);
    }
}

// when scrolling
window.addEventListener("scroll",()=>{
    console.log("scrolling");
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-100){
        console.log("bottom");
        ImgContainer();
    }
})

ImgContainer(); //Initial Loading
