$(document).ready(function() {

  $(window).scroll(function() {
    var barImg = $('.bar_img');
    var scr = $(this).scrollTop();
    var con2 = $('.content2').offset().top -($(window).height() / 2);
    var con3 = $('.content3').offset().top - ($(window).height() / 2);
    // console.log(con2 + "/con2////" + con3 + "con3");
    if (scr > con2 && scr < con3) {
        barImg.addClass('moving1');
        barImg.removeClass('moving2');
    } else if (scr > con3) {
        barImg.removeClass('moving1');
        barImg.addClass('moving2');
    } else {
        barImg.removeClass('moving1');
        barImg.removeClass('moving2');
    }
  });
});
