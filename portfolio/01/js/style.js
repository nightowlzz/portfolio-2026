$(document).ready(function() {

setScrollCheck('.scroll_ani');
function setScrollCheck(selector){
    var numPage = $(selector).length;
    var pageNow = 0;
    var pagePrev = 0;
    var pageNext = 0;
     $('.scroll_tap li').on('click', function() {
         var idx = $(this).index();
         showPage(idx + 1);

     });
     $(window).on('scroll resize', function() {
         chekScroll();
     });
     function chekScroll(){
         var scrollTop = $(document).scrollTop();
         var minScroll = 0;
         var maxScroll = 0;
         var midMenu = $('.btm_line');
         var off1 = midMenu.offset().top;
         var midTap = $('.con_tap').offset().top;
         console.log(off1);
         $(selector).each(function(i) {
             minScroll = $(selector).offset().top - ($(window).height / 3);
             maxScroll = $(selector).offset().top + ($(window).height / 3);
             if(minScroll < scrollTop && maxScroll > scrollTop){
                 var n = i+1;
                  $('.scroll_tap li').removeClass('on');
                  $('.scroll_tap li').eq(n-1).addClass('on');
                pageNow = n;
                pageNext = (n + 1) > numPage ? numPage : (n + 1);
                pagePrev = (n - 1) < 1 ? 1 : (n - 1);
                return false;
            };
         });
         if(off1 < scrollTop){
             if(midMenu.hasClass('show') !== true){
                midMenu.addClass('show');
            };
        } else if(scrollTop < midTap){
            midMenu.removeClass('show');
        };
     };
     function showPage(n){
         if(pageNow === n) return false;
         var scrollAmt = $(selector + ':eq(' + (n - 1) + ')').offset().top;
         $('html, body').stop(true).animate({'scrollTop': scrollAmt + 'px'}, 500);

     }
};
  // scrollbox
  $('.tult_table .opbox').on('touchend mouseup', function() {
    $(this).addClass('hide');
    $('.tult_table').addClass('show');
  });

//slide


});
