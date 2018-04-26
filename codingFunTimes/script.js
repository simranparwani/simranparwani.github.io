
$(document).ready(function() {
    $("#homepage").on('click', function() {
        $("#sections .home:not('.hide')").stop().fadeOut('fast', function() {
            $(this).addClass('hide');
            $('#page2').fadeIn('slow').removeClass('hide');
            
        });
    });
});