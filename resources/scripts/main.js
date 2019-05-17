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















/************ Load more Projets
****************************************************/
var project_item_one =  '<div class="project-item ltr">';
    project_item_one += '<div class="project-image">';
    project_item_one += '<img src="https://picsum.photos/520/320" alt="">';
    project_item_one += '</div>';
    project_item_one += '<h3 class="project-title">Project title</h3>';
    project_item_one += '<div class="project-description">';
    project_item_one += 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    project_item_one += '</div>';
    project_item_one += '<ul class="project-technologies"><li>React</li><li>Laravel</li><li>Php</li><li>Css</li><li>Sass</li>  </ul>';
    project_item_one += '<div class="project-links">'
    project_item_one += '<a href="#"><svg><use href="#github-icon" /></svg></a>';
    project_item_one += '<a href="#"><svg><use href="#external-link-icon" /></svg></a></div></div>';

var project_item_two =  '<div class="project-item rtl">';
    project_item_two += '<div class="project-image">';
    project_item_two += '<img src="https://picsum.photos/520/320" alt="">';
    project_item_two += '</div>';
    project_item_two += '<h3 class="project-title">Project title</h3>';
    project_item_two += '<div class="project-description">';
    project_item_two += 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    project_item_two += '</div>';
    project_item_two += '<ul class="project-technologies"><li>React</li><li>Laravel</li><li>Php</li><li>Css</li><li>Sass</li>  </ul>';
    project_item_two += '<div class="project-links">'
    project_item_two += '<a href="#"><svg><use href="#github-icon" /></svg></a>';
    project_item_two += '<a href="#"><svg><use href="#external-link-icon" /></svg></a></div></div>';













const LOAD_PROJECTS_BTN =  $('#loadMoreProjects');
const LOADING_iCON = $('#loading_icon').hide();
const PROJECTS_CONTAINER = $('.project-items-container');

LOAD_PROJECTS_BTN.click(function(){
  // alert('load projects and append in project container');
  loadProjects();
});


  function loadProjects(){
    showLoading();
    // get the projects and append the projects
    setTimeout(function(){
      hideLoading();
      PROJECTS_CONTAINER.append(project_item_one);
      PROJECTS_CONTAINER.append(project_item_two);
      disableLoadProjectButton();
    },1000);

  }

  function showLoading(){
    LOAD_PROJECTS_BTN.hide();
    LOADING_iCON.show();

  }
  function hideLoading(){
    LOADING_iCON.hide();
    LOAD_PROJECTS_BTN.show();
  }

  function disableLoadProjectButton(){
    // LOAD_PROJECTS_BTN.attr('disabled','true');
    // LOAD_PROJECTS_BTN.text('There are no more projects');
    //or
    LOAD_PROJECTS_BTN.hide();
  }


});
