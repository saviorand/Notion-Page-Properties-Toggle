var isVisible=false

function setPropertiesListVisibility(propertiesList, visible){
    if (visible){
        // Show properties list section
        propertiesList.style.height = null;
        propertiesList.style.display = null;
        isVisible = true
    }
    else {
        // Hide properties list section
        propertiesList.style.height = 0;
        propertiesList.style.display = "none";
        isVisible = false
    }
}

// Called every time something new loads inside Notion window
// e.g. you navigate to a different Notion page
var onPageChange = function(){
    //console.log("Notion Layout Improver: Something changed");

    // Find the block with properties list
    var propertiesLists = document.querySelectorAll(".notion-scroller.vertical > div:nth-child(2) > div > div:nth-child(1)[style='width: 100%; font-size: 14px;']");

    // For each found properties list
    propertiesLists.forEach(function(propertiesList){
        //console.log("Found properties list");

        // Set up the toggle button
        let toggleButton = document.createElement("button");
        /* Uncomment this and include FontAwesome Icons to add an icon to the button (WIP)
        let toggleIcon = document.createElement("i");
        toggleIcon.setAttribute('class', 'far fa-eye');
        toggleButton.appendChild(toggleIcon);*/
        let buttonText = "👁 Show properties";
        toggleButton.setAttribute('class', 'propertiesToggleBar');
        toggleButton.innerHTML = buttonText;
        toggleButton.onclick = function(){

            setPropertiesListVisibility(propertiesList, !isVisible);
            (buttonText === "👁 Show properties") ? (buttonText = "Hide properties") : buttonText = "👁 Show properties";
            toggleButton.innerHTML = buttonText;

            }

        // If not already processed this properties list,
        // add the toggle button and hide the list
        if (!(propertiesList.id === "already_processed")){
            //console.log("Notion Layout Improver: Processing new properties list");
            var parentBlockForButton = propertiesList.parentElement
            parentBlockForButton.prepend(toggleButton)
            setPropertiesListVisibility(propertiesList, false)
            propertiesList.id = "already_processed";

        }
    })
}

// This calls onPageChange function each time Notion window changes
// e.g. you navigate to a new Notion page
const targetNode = document.body;
const config = {attributes: false, childList: true, subtree: true };
const observer = new MutationObserver(onPageChange);
observer.observe(targetNode, config);