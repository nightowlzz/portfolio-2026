$(document).ready(function() {
  preventDefaultAnchor();
  containerSwiper('.swiper-container', 2);
  portfolioSwiper('.pofol_swiper', 1, false, 3000);
});

/** * href="#" 클릭 시 페이지 상단 이동 방지
 */
function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

/**
 * 메인 컨테이너 섹션 스와이퍼
 */
function containerSwiper(selector, first) {
  const $container = $(selector);
  const $sections = $container.find('.swiper-section');
  const numSlide = $sections.length;
  
  let slideNow = 0;
  let slidePrev = 0;
  let slideNext = 0;
  let slideFirst = first;

  // 초기화 및 슬라이드 배치
  showSlide(slideFirst);
  $sections.each(function(i) {
    $(this).css({ 'left': (i * 100) + '%' });
  });

  // 좌우 버튼 클릭 이벤트
  $container.find('.about').on('click', function() {
    $(this).find('img').stop(true).animate({ 'left': '-10px' }, 50).animate({ 'left': 0 }, 100);
    showSlide(slidePrev);
  });

  $container.find('.porfo').on('click', function() {
    $(this).find('img').stop(true).animate({ 'right': '-10px' }, 50).animate({ 'right': 0 }, 100);
    showSlide(slideNext);
  });

  // SNB 메뉴 네비게이션
  function snbMenu() {
    $('.back_menu').on('click', () => showSlide(2));
    $('.pofol_move').on('click', () => showSlide(3));
    $('.about_move').on('click', () => showSlide(1));
  }
  snbMenu();

  function showSlide(n) {
    const transitionStyle = (slideNow === 0) ? 'none' : 'left 0.3s';
    
    $container.css({
      'transition': transitionStyle,
      'left': -((n - 1) * 100) + '%'
    });

    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
  }
}

/**
 * 포트폴리오 슬라이더 (터치 지원)
 */
function portfolioSwiper(selector, first, status, speed) {
  const $slider = $(selector);
  const $slideItems = $slider.find('.slide > li');
  const numSlide = $slideItems.length;
  
  let slideNow = 0;
  let slidePrev = 0;
  let slideNext = 0;
  let startX = 0, startY = 0, delX = 0, delY = 0, offsetX = 0;
  let direction = '';

  // 초기 슬라이드 배치 및 인디케이터 생성
  $slideItems.each(function(i) {
    $(this).css({ 'left': (i * 100) + '%', 'display': 'block' });
    $slider.find('.indicator').append(`<li><a href="#"><span class="hide">${i + 1}번 슬라이드</span></a></li>\n`);
  });

  showSlide(first);

  // 인디케이터 클릭
  $slider.find('.indicator li a').on('click', function() {
    const index = $slider.find('.indicator li').index($(this).parent());
    showSlide(index + 1);
  });

  // 이전/다음 버튼
  $slider.find('.swiper-navigation .prev').on('click', function() {
    $(this).find('img').stop(true).animate({ 'left': '-10px' }, 50).animate({ 'left': 0 }, 100);
    showSlide(slidePrev);
  });

  $slider.find('.swiper-navigation .next').on('click', function() {
    $(this).find('img').stop(true).animate({ 'right': '-10px' }, 50).animate({ 'right': 0 }, 100);
    showSlide(slideNext);
  });

  // 터치 이벤트 제어
  $slider.find('.slide').on('touchstart', function(e) {
    $slider.find('.swiper-navigation span.bar').stop(true).css({ 'width': 0 });
    $(this).css({ 'transition': 'none' });

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    offsetX = $(this).position().left;

    document.addEventListener('touchmove', touchMove, { passive: false });

    $(document).on('touchend', function() {
      if (delX < -50 && slideNow !== numSlide) {
        showSlide(slideNext);
      } else if (delX > 50 && slideNow !== 1) {
        showSlide(slidePrev);
      } else {
        showSlide(slideNow);
      }
      
      direction = '';
      document.removeEventListener('touchmove', touchMove);
      $(document).off('touchend');
    });
  });

  function touchMove(e) {
    delX = e.touches[0].clientX - startX;
    delY = e.touches[0].clientY - startY;

    if (direction === '') {
      if (Math.abs(delX) > 5) direction = 'horizon';
      else if (Math.abs(delY) > 5) direction = 'vertical';
    }

    if (direction === 'horizon') {
      e.preventDefault();
      // 처음/끝 슬라이드 저항감 효과
      if ((slideNow === 1 && delX > 0) || (slideNow === numSlide && delX < 0)) {
        delX = delX / 10;
      }
      $slider.find('.slide').css({ 'left': (offsetX + delX) + 'px' });
    } else if (direction === 'vertical') {
      delX = 0;
    }
  }

  function showSlide(n) {
    $slider.find('.swiper-navigation span.bar').stop(true).css({ 'width': 0 });
    
    const $slideContainer = $slider.find('.slide');
    const transitionStyle = (slideNow === 0) ? 'none' : 'left 0.3s';

    $slideContainer.css({
      'transition': transitionStyle,
      'left': -((n - 1) * 100) + '%'
    });

    // 인디케이터 활성화
    $slider.find('.indicator li').removeClass('on').eq(n - 1).addClass('on');
    
    slideNow = n;
    slidePrev = (n - 1 < 1) ? numSlide : n - 1;
    slideNext = (n + 1 > numSlide) ? 1 : n + 1;
  }
}