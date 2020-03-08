'use strict';
(() => {

    const partnerButton = $('#partner-button');
    const requestButton = $('#request-button');
    const modal = $('#modal');
    const requestContent = $('#request-content');
    const partnerContent = $('#partner-content');
    const closeButton = $('#close-button');
    const signInButton = $('#sign-in-button');
    const noAccount = $('#no-account-alert');
    let slickActive = false;

    partnerButton.on('click', () => {
        modal.css('display', 'block');
        partnerContent.css('display', 'flex');
    })

    requestButton.on('click', () => {
        if (window.innerWidth >= 768 && !slickActive) {
            // if not mobile and slick hasn't been initiated 
            // necessary to not use openModal() here because slick needs to know size of request-content div before running, which cannot be done if display: none
            $('#mc-embedded-subscribe').addClass('button__disabled');
            requestContent.css('display', 'flex');
            modal.css('display', 'block');
            $('.request-info').slick({
                dots: true,
                infinite: false
            });
            $('.slick-next').on('click', (e) => {
                if ($(e.target).hasClass('slick-disabled')) {
                    $('#mc-embedded-subscribe').removeClass('button__disabled');
                }
            })
            $('.slick-prev').on('click', (e) => {
                $('#mc-embedded-subscribe').addClass('button__disabled');
            })
            slickActive = true;
            setTimeout(function() {
                modal.css('display', 'block');
            }, 100);

        } else if (window.innerWidth >= 768 && slickActive) {
            // if not mobile and slick has been initiated
            openModal();
        } else if (window.innerWidth <= 768 && !slickActive) {
            $('#mc-embedded-subscribe').removeClass('button__disabled');
            slickActive = false;
            openModal();
        } else {
            // if mobile
            $('.request-info').slick('unslick');
            $('#mc-embedded-subscribe').removeClass('button__disabled');
            slickActive = false;
            openModal();
        }
    })

    closeButton.on('click', () => {
        modal.css('display', 'none');
        partnerContent.css('display', 'none');
        requestContent.css('display', 'none');
    })

    signInButton.on('click', () => {
        noAccount.css('visibility', 'visible')
    })

    $(document).on('keydown', (e) => {
        // prevent return from submitting form
        if (e.keyCode === 13) {
            e.preventDefault()
        }
        // advance carousel if open and return key triggered
        if (e.keyCode === 13 && requestContent.css('display') === 'flex') {
            $('.slick-next').trigger('click');
            if ($('.slick-next').hasClass('slick-disabled') && $('#mce-CURINSUR').val().length > 0) {
                $('#mc-embedded-subscribe').trigger('click');
            }
        } 
        // open modal if email input filled out and return key triggered
        else if (e.keyCode === 13 && requestContent.css('display') === 'none' && $('#mce-EMAIL').val().length > 0) {
            requestButton.trigger('click');
        }
        // hide modal on escape key triggered
        if (e.keyCode === 27) {
            hideModal();
        }
    })

    function openModal() {
        modal.css('display', 'block');
        requestContent.css('display', 'flex');
    }

    function hideModal() {
        modal.css('display', 'none');
        partnerContent.css('display', 'none');
        requestContent.css('display', 'none');
        noAccount.css('visibility', 'hidden')
    }

    window.onclick = function(event) {
        if (event.target == modal[0]) {
            hideModal();
        }
    }

})();