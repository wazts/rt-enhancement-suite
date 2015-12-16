/**
 * @author Kyle Wagner
 * @description Add hovercard info to links of uses on the Rooster Teeth site
 */

/* global isUserLink */

// --- Functions
/*
 * Wrap the anchor in a container for a link
 */
function attachCard(anchor){
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
        },
        mouseleave: function () {
            $('.rtes-hovercard').removeClass('top bottom');
            $(this).removeClass('zIndex');
            $('.rtes-hovercard').hide();
        }
    });
    
    $(anchor).wrap(rtesCardWrapper);
    
    var rtesHovercard = $('<div class="rtes-hovercard"><div class="card-content"></div></div>');
    rtesHovercard.hide();
    rtesHovercard.find('.card-content').append('<div class="loading"><i class="fa fa-cog fa-spin fa-4x"></i></div>');
    
    $(anchor).after(rtesHovercard);

}
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