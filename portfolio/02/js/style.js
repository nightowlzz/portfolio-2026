$(document).ready(function(){

function sub1_tap(){
    $('.tapmenu-btn button').on('click',function(){
        var btn_list = $(this).parent('div').siblings('div');
        $(this).addClass('on');
        btn_list.children('button').removeClass('on');
        $(this).next('ul').removeClass('hide');
        btn_list.children('ul').addClass('hide');
    });
   $('.tapmenu-btn button').on('click',function(){
       var idx = $(this).index();
       var btn_view = $(this).parent('div').next('ul').children('li').eq(idx);
       btn_view.removeClass('hide');
       btn_view.siblings().addClass('hide');
   });
}
sub1_tap();

 function sub3_tap(){
     $('.tapmenu-btn1 button').on('click',function(){
         var btn_list = $(this).siblings('button');
         $(this).addClass('on');
         btn_list.removeClass('on');

     });
   $('.tapmenu-btn1 button').on('click',function(){
       var idx = $(this).index();
       var btn_view = $(this).parent('div').next('div').children('article').eq(idx);
       btn_view.removeClass('hide');
       btn_view.siblings().addClass('hide');
   });
 }
 sub3_tap();
});
