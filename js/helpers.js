/**
 * @author Kyle Wagner
 * @description Helper functions
 */
 
function isUserLink (anchorNode) {
    // --- Make sure this is an anchor
    if (!$(anchorNode).is('a')) {
        return false;
    }
    
    // --- Get the link
    var href = anchorNode.href;
    
    if (null === href) {
        return false;
    }
    
    // --- Do some regex
    var pattern = /https?:\/\/((roosterteeth.com)|(achievementhunter.com))\/user\/[a-zA-Z0-9]+/g;
    if(href.match(pattern)) {
        return true;
    }
    
    return false;
}