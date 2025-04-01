const list = document.querySelector(".container"); //Whole list
const items = document.querySelectorAll(".item"); //List items

items.forEach((item)=>{
    item.addEventListener("dragstart",()=>{
        item.classList.add("dragging")
    })
    item.addEventListener("dragend",()=>{
        item.classList.remove("dragging")
    })
})

list.addEventListener("dragover",(e)=>{
    e.preventDefault();

    // Since queryselector don't return array , so that spread operator is used here 
    const otherItems = [...list.querySelectorAll(".item:not(.dragging)")];
    const draggingItem = list.querySelector(".dragging");

    let reorderingItem = otherItems.find(hoveringItem =>{
        console.log(hoveringItem);

        //  It is the Y axis position of item's middle relative to viewport (hoveringItem.offsetTop + hoveringItem.offsetHeight / 2)
        // It is the Y axis position of mouse realtive to viewport (e.clientY)
        // That means Comparing two Y axis position if mouse's is greater than items's it will return that item.

        return e.clientY <= hoveringItem.offsetTop + hoveringItem.offsetHeight / 2;
    });
    console.log(reorderingItem);

    list.insertBefore(draggingItem,reorderingItem);
})

// dragenter runs when the dragged item enters another item.
list.addEventListener("dragenter",(e)=> e.preventDefault()); 