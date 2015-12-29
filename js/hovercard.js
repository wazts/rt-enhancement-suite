/**
 * @author Kyle Wagner
 * @description Add hovercard info to links of uses on the Rooster Teeth site
 */

/* global isUserLink */
var g_rtes_storedUserData = new Array();
var g_rtes_token = "";

// --- Functions

function populateUserHovercard(hovercard, user) {
    var cardContent = $(hovercard).find('.card-content');
    cardContent.empty();
    
    // --- Header
    var header = $('<div>').addClass('rtes-card-header');
    cardContent.append(header);
    
    // --- Inner
    var innerContent = $('<div>').addClass('row');
    var userImage = $('<div>')
            .addClass('user-image')
            .addClass('col-xs-4')
            .append($('<img>')
                .addClass('img-thumbnail')
                .attr('src', user.image));
            
    innerContent.append(userImage);
    
    var profileInfo = $('<div>')
            .addClass('user-profile')
            .addClass('col-xs-8')
            .append(user.profileControls);
            
    innerContent.append(profileInfo);
    
    cardContent.append(innerContent);
    
    // --- Footer
    var footer = $('<div>').addClass('rtes-card-footer row')
    
    // Add the buttons if we can.
    var State = __webpack_require__(2);
    footer.append(State.get('user'));
    cardContent.append(footer);
    
    hovercard.data("loaded", true);
}
/* 
 * Loads the user data into the card
 */
function loadUserData(hovercard, href) {
    // --- Already have this data?
    if (hovercard.data("loaded")) {
        return;
    }
    
    // --- See if the data is stored
    var user = href.substring(href.lastIndexOf('/') + 1);
    if(!g_rtes_storedUserData[user]) {
        
        // --- Get the data from the server
        $.get(href, function(data){
            // --- Parse the data into an object
            var userProfile = new Array();
            
            // Profile Image
            userProfile.image = $(data).find('.profile-img-lg').find('img.profile').attr('src');
            
            // Controls
            userProfile.profileControls = $(data).find('.left-sidebar > .details');
            console.log(userProfile.profileControls);
            
            // --- Find the token
            userProfile.token = $(data).find('input[name="_token"]').val();
            
            // --- Add to global
            g_rtes_storedUserData[user] = userProfile;
            populateUserHovercard(hovercard, g_rtes_storedUserData[user]);
    
        });
        
    } else {
        populateUserHovercard(hovercard, g_rtes_storedUserData[user]);
    }
}

/*
 * Wrap the anchor in a container for a link
 */
function attachCard(anchor){
    
    // --- We set up a wrapper so we can have a hover card.
    var rtesCardWrapper = $('<span class="rtes-cardWrapper"></span>');
    
    $(rtesCardWrapper).on({
        mouseenter: function () {
            $(this).addClass('zIndex');   
            
            var hovercard = $(this).find('.rtes-hovercard');
               
            var top, left,
                toolTipWidth = 250,
                toolTipHeight = 120,
                arrowHeight = 0,
                elementHeight = $(this).height(),
                elementWidth = $(this).width(),
                documentHeight = $(window).height(),       
                bounding = $(this)[0].getBoundingClientRect(),      
                topHub = bounding.top;
            
            
            if (topHub < topHub + toolTipHeight && topHub + toolTipHeight + arrowHeight + elementHeight <= documentHeight) {
    
                hovercard.addClass('top');
                top = elementHeight + arrowHeight;
                left = -(elementWidth / 2);
    
            }
    
            if (topHub + toolTipHeight + arrowHeight + elementHeight >= documentHeight) {
                hovercard.addClass('bottom');
                top = -toolTipHeight - arrowHeight;
                left = -(elementWidth / 2);
            }
    
    
            hovercard.css({
                'top': top,
                'left': left
            });
            
            hovercard.show();
            loadUserData(hovercard, anchor.href);
        },
        mouseleave: function () {
            $('.rtes-hovercard').removeClass('top bottom');
            $(this).removeClass('zIndex');
            $('.rtes-hovercard').hide();
        }
    });
    
    // --- Wrap the anchor in the wrapper
    $(anchor).wrap(rtesCardWrapper);
    
    // --- Set up the card
    var rtesHovercard = $('<div class="rtes-hovercard"><div class="card-content"></div></div>');
    rtesHovercard.hide();
    rtesHovercard.find('.card-content').append('<div class="loading"><i class="fa fa-cog fa-spin fa-4x"></i></div>');
    
    $(anchor).after(rtesHovercard);

}

/**
 * The main function
 */
function main(){
    
    // Get all anchors
    var anchors = $(this).find('a');
    
    // --- Is this what we are looking for?
    for (var i = 0; i < anchors.length; i++) {
        if (! isUserLink(anchors[i])) {
            continue;
        }
        attachCard(anchors[i]);
    }
}

// --- bindings
$(document).ready(main);