function loadContent(){
    // For the initial load it will be empty for the default home page route
    if(!location.hash){
        location.hash = "home";
    }

    // Substring will give the hash starting from index 1 if it is "#home", it will "home". 
    const hash = location.hash.substring(1);

    // To iterate all content divs
    document.querySelectorAll(".content").forEach(item =>{

        // It will make every item display none. In next statement it will display block the specific item.
        item.style.display = "none";
        console.log(item.id);

        //Specific item's id which is same like hash
        if(item.id == hash ){
            // console.log(item);
            item.style.display = "block";
        }
    })
}


// console.log(location);
// console.log(location.hash);

// Can only assign one function
// window.onhashchange = loadContent(); 
window.addEventListener("hashchange",loadContent);
window.addEventListener("load",loadContent);