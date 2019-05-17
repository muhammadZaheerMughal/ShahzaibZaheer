$('document').ready(function(){




  //******** Detect Scroll position and hide show nav
  const MAIN_NAV =  $('#main_sticky_nav');
  var position = $(window).scrollTop();
  // should start at 0
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if(scroll > position) {
          // scroll down
          // MAIN_NAV.slideUp();
          MAIN_NAV.removeClass('visible').addClass('hidden');
      } else {
          // scroll up
          // MAIN_NAV.slideDown();
          MAIN_NAV.removeClass('hidden').addClass('visible sticky');
      }
      position = scroll;
  });







  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 50
          }, 1000);
        }
      }
    });





//************ Getting Projets
const LOAD_PROJECTS_BTN =  $('#loadMoreProjects');
const LOADING_iCON = $('#loading_icon').hide();

LOAD_PROJECTS_BTN.click(function(){
  // alert('load projects and append in project container');
  showLoading();

      // $.ajax({
      //       type: 'GET',
      //       url: 'data.json',
      //       async: true,
      //       datatype: 'JSON',
      //       success: function(data)
      //       {
      //         if (data)
      //         {
      //           console.log(data);
      //         }
      //       }
      // });
    setTimeout(function(){hideLoading();},2000);


});


  function showLoading(){
    LOAD_PROJECTS_BTN.hide();
    LOADING_iCON.show();

  }
  function hideLoading(){
    LOADING_iCON.hide();
    LOAD_PROJECTS_BTN.show();
  }



});
