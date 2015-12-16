/**
 * @author Kyle Wagner
 * @description Add hovercard info to links of uses on the Rooster Teeth site
 */

/* global isUserLink */

// --- Functions
function main(){
    
    // Get all anchors
    var anchors = $(this).find('a');
    
    // --- Is this what we are looking for?
    for (var i = 0; i < anchors.length; i++) {
        if (! isUserLink(anchors[i])) {
            console.log("Bad link");
            continue;
        }
        console.log("Found link");
    }
}

// --- bindings
$(document).ready(main);