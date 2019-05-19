$('document').ready(function(){




  //******** Detect Scroll position and hide show nav
  const MAIN_NAV =  $('#main_sticky_nav');
  // const MAIN_NAV =  $('.js--main_nav');
  var position = $(window).scrollTop();
  // should start at 0
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if(scroll > position) {
          // scroll down
          // MAIN_NAV.slideUp();
          MAIN_NAV.removeClass('visible').addClass('hidden');
          NAV_TOGGLER.removeClass('visible').addClass('hidden');

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

            //***** highlighting clicked nav link
            hightlightNavItem(this);

          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 10
          }, 1000);
        }
      }
    });



function hightlightNavItem(navItem){
    //***** highlighting nav link, when click on nav item (<a> inside nav)
    // remove active class from all the nav links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').removeClass('active');
    // add active class to clicked link
    $(navItem).addClass('active');

}

function hightlightNavItemById(navItemID){
    // remove active class from all the nav links
    closeNavIfOpen();
    $(' a[href*="#"]').not('[href="#"]').not('[href="#0"]').removeClass('active');
    // add active class to clicked link
    $(' a[href="'+navItemID+'"]').addClass('active');

    if(navItemID == "#home"){
      NAV_TOGGLER.removeClass('hidden').addClass('visible sticky');
    }else{
      NAV_TOGGLER.removeClass('visible').addClass('hidden');
    }

}










/************ Load more Projets
****************************************************/

const LOAD_PROJECTS_BTN =  $('#loadMoreProjects');
const LOADING_iCON = $('#loading_icon').hide();
const PROJECTS_CONTAINER = $('.project-items-container');
var currentProjectsCount = 0;
var totalProjectsCount = -1;
var projectsData = null;    // we load data only once, this is to store cache.

loadProjects();  // load 2 projects by default
LOAD_PROJECTS_BTN.click(function(){
  // alert('load projects and append in project container');
  showLoading();
  setTimeout(loadProjects,1000); //artificial loading
});


  function loadProjects(){
    // showLoading();
    // get the projects and append the projects
    // grab the projects, if success then append and hide loading
    // if fails or no more projects are there then disable loadProjects button
    //*******  /resources/scripts/data.json
    if(projectsData == null){
      downloadData();
    }else{
      extractAndAppendProjects();
    }
    // if(currentProjectsCount >= totalProjectsCount){
    //   disableLoadProjectButton();
    //   // hideLoading();
    // }else{
    //
    // }

  }
  function isEven(number){
    // if(number==0) return true;
    return (number%2 == 0) ? true : false;
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
    LOAD_PROJECTS_BTN.attr('disabled','true');
    LOAD_PROJECTS_BTN.text('There are no more projects');
    hideLoading();
    //or
    // LOAD_PROJECTS_BTN.hide();
  }
  function downloadData(){
    var url = '/resources/scripts/data.json';
    var onSuccess = function (data){
        projectsData = data;
        totalProjectsCount = projectsData.projects.length;
        extractAndAppendProjects();
    }
    var onFailure = function (jqXHR, textStatus, error) {
      console.log("Error occur");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(error);
    }

    $.ajax({
      type: "GET",
      url: url,
      async: true,
      success: onSuccess,
      error: onFailure
    });
  }
  function appendProjectItem(projectItem, className){
    if(projectItem){
        var project_item_html =  '<div class="project-item '+ className +'">';
            project_item_html += '<div class="project-image">';
            project_item_html += '<img src="'+projectItem.image+'" alt="">';
            project_item_html += '</div>';
            project_item_html += '<h3 class="project-title">'+projectItem.title+'</h3>';
            project_item_html += '<div class="project-description">';
            project_item_html += projectItem.description;
            project_item_html += '</div>';
            var projectsTechnologies = '';
            for(var i=0; i<projectItem.technologies.length; i++){
              projectsTechnologies += "<li>"+projectItem.technologies[i]+"</li>";
            }
            project_item_html += '<ul class="project-technologies">'+projectsTechnologies+' </ul>';
            project_item_html += '<div class="project-links">'
            project_item_html += '<a href="'+projectItem.githubLink+'"><svg><use href="#github-icon" /></svg></a>';
            project_item_html += '<a href="'+projectItem.liveLink+'"><svg><use href="#external-link-icon" /></svg></a></div></div>';
            PROJECTS_CONTAINER.append(project_item_html);
          }
  }
  function extractAndAppendProjects(){
        // console.log("CurrentCount: "+currentProjectsCount);
        // console.log("TotalCount: "+totalProjectsCount);
        if(currentProjectsCount < totalProjectsCount){
              var loadCount = currentProjectsCount + 2 ;   // we only want to load 2 projects at one request
              var projectItem = '';
              //append projects
              for(currentProjectsCount; currentProjectsCount < loadCount; currentProjectsCount++)
              {
                projectItem = projectsData.projects[currentProjectsCount];

                if(isEven(currentProjectsCount)){
                  console.log(currentProjectsCount+' is Even');
                  appendProjectItem(projectItem, 'ltr');
                }else{
                  console.log(currentProjectsCount+' is Odd');
                  appendProjectItem(projectItem, 'rtl');
                }
                // console.log(projectsData.projects[currentProjectsCount]);
              }
              hideLoading();
        }else{
          disableLoadProjectButton();
        }
  }









  /************** Make nav item active on scroll
  *************************************/
  //  calculate the offset of the element and then compare that with the scroll value
  // for about section
  new Waypoint({
          element: $('#about'),
          handler: function(direction) {
              hightlightNavItemById('#about');
              // console.log('scrolled to about');
          }
  });

    // for work section
    new Waypoint({
        element: $('#work'),
        handler: function(direction) {
            hightlightNavItemById('#work');
            // console.log('scrolled to work');
        }
    });

    // for contact us section
    new Waypoint({
        element: $('#contact'),
        handler: function(direction) {
            hightlightNavItemById('#contact');
            // console.log('scrolled to contact');
        }
    });

    // for home section, to remove highlight about nav link when currently user is on home section
    new Waypoint({
        element: $('#home'),
        handler: function(direction) {
            hightlightNavItemById('#home');
            // console.log('scrolled to home');
        }
    });
















/************ Toggle Nav
****************************************************/
const NAV_TOGGLER = $('#main_nav_toggler');
const DRAWER_OPEN_ICON = $('#drawer_open_icon');
const DRAWER_CLOSE_ICON = $('#drawer_close_icon').hide();
const NAV = $('#main_sticky_nav');

  NAV_TOGGLER.click(toggleNav);



  function toggleNav(){
    // alert("hello");
      NAV.toggleClass('collapse');
      toggleDrawerIcon();


  }

  function isNavOpen(){
    if(DRAWER_CLOSE_ICON.is(":visible")){
      // yes nav is open
      return true;
    }
    return false;
  }

  function toggleDrawerIcon(){
    if(DRAWER_OPEN_ICON.is(":visible")){
      // alert("drawer open is visible.");
      DRAWER_CLOSE_ICON.show();
      DRAWER_OPEN_ICON.hide();
    }else{
      // alert("drawer close is visible.");
      DRAWER_CLOSE_ICON.hide();
      DRAWER_OPEN_ICON.show();
    }
  }

  function closeNavIfOpen(){
    NAV.removeClass('collapse');
    DRAWER_CLOSE_ICON.hide();
    DRAWER_OPEN_ICON.show();
  }
});
