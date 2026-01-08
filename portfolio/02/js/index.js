$(document).ready(function() {
    //탭메뉴
  $('.tap button').on('click focus', function() {
      var btn_list = $(this).parent('div').siblings('div');
      $(this).addClass('on');
      btn_list.children('button').removeClass('on');
      $(this).next('ul').removeClass('hide');
      btn_list.children('ul').addClass('hide');
  });
});
