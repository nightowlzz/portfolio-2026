$(document).ready(function(){

    $(window).on('scroll', function(){
        scrollAni($('.content'));
    });
    scrollAni($('.content'));
      function scrollAni(selector){
          var scrollAmt = $(document).scrollTop();
          selector.each(function() {
              var $selector = $(this);
              var minScroll = $selector.offset().top - ($(window).height() / 2);
              if(scrollAmt >= minScroll){
                  if($selector.hasClass('show') !== true){
                      $selector.addClass('show');
                  };
              };
          });
          if(scrollAmt > 100){
             $('.quick').addClass('fix');
             $('.quick').css({'top': '50px'});
         }else{
              $('.quick').removeClass('fix');
              $('.quick').css({'top': '95px'});
         };
      };

  function menu() {
    //대메뉴
    $('.section-main li').on('mouseenter focusin', function() {
        $(this).siblings().children('.small-menu').removeClass('show');
        $(this).children('div').addClass('show');
        $('.back').addClass('show');
    });
    $('.section-main').on('mouseleave focusout', function() {
        $('.small-menu').removeClass('show');
        $('.back').removeClass('show');
    });
};
  menu();

  function button() {
    $('.open').on('click focus', function() {
        $(this).next('div').toggleClass('blur');
    });
    $('.btm_quic > a:eq(1)').on('focusout', function() {
        $('.qui_containner').removeClass('blur');
    });
  }
  button();

  $('.up_top').on('click', function() {
      $('html, body').animate({'scrollTop':0},500);
  });
});
