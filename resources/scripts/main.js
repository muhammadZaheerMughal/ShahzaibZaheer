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
var currentProjectsCount = 2;
var totalProjectsCount = null;
var projectsData = null;    // we load data only once, this is to store cache.

LOAD_PROJECTS_BTN.click(function(){
  // alert('load projects and append in project container');
  loadProjects();
});


  function loadProjects(){
    showLoading();
    // get the projects and append the projects

    // grab the projects, if success then append and hide loading
    // if fails or no more projects are there then disable loadProjects button
    //*******  /resources/scripts/data.json

    if(projectsData == null){
      // console.log('Download and extract data');
      downloadData();
    }else{
      extractAndAppendProjects();
      // console.log('Only extract data');
    }


    // setTimeout(function(){
    //   //
    //   hideLoading();
    //   PROJECTS_CONTAINER.append(project_item_one);
    //   PROJECTS_CONTAINER.append(project_item_two);
    //   disableLoadProjectButton();
    // },1000);

  }
  function isEven($number){
    if($number==0) return true;
    return $number/2 ? true : false;
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
  function downloadData(){
    var url = '/resources/scripts/data.json';
    var onSuccess = function (data){
        projectsData = data;
        totalProjectsCount = projectsData.projects.length;
        extractAndAppendProjects();
        // console.log(data.projects[0].projectTitle);
        console.log(totalProjectsCount);
        // console.log("successfull");
        console.log(data);
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
  function appendProjectItem(projectItem){
    console.log('apend project');
    console.log(projectItem);
  }
  function extractAndAppendProjects(){

    var loadCount = currentProjectsCount + 2 ;   // we only want to load 2 projects at one request
    var projectItem = '';
    for(currentProjectsCount; currentProjectsCount < loadCount; currentProjectsCount++)
    {
      console.log(projectsData.projects[currentProjectsCount]);
      projectItem = projectsData.projects[currentProjectsCount];
      appendProjectItem(projectItem);
    }

    // appen project
    hideLoading();
  }
});
