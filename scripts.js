'use strict';
(() => {

    let partnerButton = $('#partner-button');
    let requestButton = $('#request-button');
    var modal = $("#modal");
    var requestContent = $("#request-content");
    var partnerContent = $("#partner-content");
    let slickActive = false;

    partnerButton.on('click', () => {
        modal.css('display', 'block');
        partnerContent.css('display', 'flex');
    })

    requestButton.on('click', () => {
        if (screen.width >= 768 && !slickActive) {
            // if not mobile and slick hasn't been initiated 
            // necessary to not use openModal() here because slick needs to know size of request-content div before running, which cannot be done if display: none
            requestContent.css('display', 'flex');
            modal.css('display', 'block');
            $('.request-info').slick({
                dots: true,
                infinite: false
            });
            $('.slick-next').on('click', (e) => {
                if ($(e.target).hasClass('slick-disabled')) {
                    $('#submit-button').removeClass('button__disabled');
                }
            })
            $('.slick-prev').on('click', (e) => {
                $('#submit-button').addClass('button__disabled');
            })
            slickActive = true;
            setTimeout(function() {
                modal.css('display', 'block');
            }, 100);
            
        } else if (screen.width >= 768 && slickActive) {
            // if not mobile and slick has been initiated
            openModal();
        } else {
            // if mobile
            $('.request-info').slick('unslick');
            $('#submit-button').removeClass('button__disabled');
            slickActive = false;
            openModal();
        }

    })

    function openModal() {
        modal.css('display', 'block');
        requestContent.css('display', 'flex');
    }

    window.onclick = function(event) {
        if (event.target == modal[0]) {
            modal.css('display', 'none');
            partnerContent.css('display', 'none');
            requestContent.css('display', 'none');
        }
    }

})();