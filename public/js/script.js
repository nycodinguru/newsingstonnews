$(document).ready(function() {
  fetch();
  var navOpen = false;
  $('.Nav-burger-icon').click(toggleNavMenu);
  $('.log-in').click(openLogInDiv);
  $('.Close-button').click(closeLogInDiv);
 
  $(document).scroll( () => {
    const navbar = $(".Nav");

    if (!!navbar) {
      if (scrollY > 50){
      navbar.addClass('scrolled');
      } else ( navbar.removeClass('scrolled') )
    }
  })

  $('.Newsington-logo').click( () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  })

  // This action registers a new user onto the site
  $("#signup-submit").submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();

    //console.log(`Form data: ${data}`);

    $.ajax({
      url: `/`,
      data: data,
      type: "POST",
      success: function(data) {
        //console.log("response ", data);
        // redirecting to the user's show page on success
        window.location.href = `/profiles/${data.id}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });
  });

  // This action fetches news from the user's favorite source
  function fetch() {
    // selecting the user's id from hidden input
    const source = $("#fetch-this").text() ? $("#fetch-this").text() : null;
    //console.log(`fetching news from: ${source}`);

    if ( source !== null ){
      $.ajax({
            url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=10cfd277abed4b3d956528da16a0759a`, // Path
            type: "GET",
            success: function(data) {
              const articles = data.articles;
              const $articleParent = $(".Profile-article-container");
              const $source = $("#source");
              //console.log(articles);

              //This for loop applys inline CSS to dynamically rendered DOM elements

              for (let i = 0; i < articles.length; i++) {
                const $headlineArticle = $(".Header-article");
                var $newdiv = $("<div>").addClass("news-item");
                var $newHeadLine = $("<h3>")
                  .text(`${articles[i].title}`)
                var $newImageDiv = $("<div>").css({
                  "background-image": `url('${articles[i].urlToImage}')`,
                  "background-size": "cover",
                  "background-position": "center"
                }).addClass("news-item-image");;
                var $newPtag = $("<p>").text(`${articles[i].description}`);
                var $articleLink = $("<a>",{href: articles[i].url, target: "_blank"});

                //Here the function appends the latest story to the headline div, all subsequent articles get a generic news item div to be displated below

                $articleLink.append($newdiv);
                $newdiv.append($newImageDiv);
                $newdiv.append($newHeadLine);
                $newdiv.append($newPtag);
                if (i === 0) { $headlineArticle.append($articleLink) }
                else ( $articleParent.append($articleLink) );
              }
            }
          });
    }

    
  }

  //This action handles updating user profiles
  $("#update-form").submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    // selecting the users's id from hidden input
    const id = $("#id").val();

    //console.log(`Form data: ${data}`);

    // PUT request to /user/:userId to update an individual user
    $.ajax({
      url: "/newsington/users/update",
      data: data,
      type: "PUT",
      success: function(data) {
        //console.log("response ", data);
        // redirecting to the users's show page on success
        window.location.href = `/newsington/users/profile`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });
  });

  //This action deletes user accounts
  $(".delete-button").click(function(e) {
    e.preventDefault();
    // selecting the user's id from hidden input
    const id = $("#id").val();
    console.log(`Deleting id: ${id}`);

    // Prompt user before deleting
    const checkboxStatus = $("#checkbox").is(":checked");
    console.log(checkboxStatus);

    if (checkboxStatus) {
      // execute if user selects okay
      $.ajax({
        url: `/newsington/users/delete`,
        data: id,
        type: "DELETE",
        success: function(data) { 
          console.log("deleting ", data);

          // redirect to the homepage after deleting an individual account
          window.location.href = "/newsington/";
        },
        error: function(xhr, status, error) {
          // add error handler
        }
      });
    } else alert('Please check the box if you wish to delete your account');
  }); 

  function openLogInDiv(){
    document.querySelector('.Login-container').style.zIndex = 100000;
        setTimeout(() => {
            $('.Login-container').addClass('active');
            $('body').css({'overflow': 'hidden'});
          }, 500);
    
    if(navOpen){
      toggleNavMenu(400);
    }
  }

  function closeLogInDiv(){
    document.querySelector('.Login-container').classList.remove('active');
          document.querySelector('body').style.overflow = 'scroll';
          setTimeout(() => {
            document.querySelector('.Login-container').style.zIndex = -1000;
          }, 500);
  }
  
  function toggleNavMenu(timeoutArg){
    const $nav = $(".Nav");
    const $navUl = $("#Nav-ul");
    const $body = $("body");
    const $burgerMenu = $(".Nav-burger-icon");
    const $button = $(".button");
    const setTimeoutTime = timeoutArg > 0 ? timeoutArg : navOpen? 1300 : 0;
    
    $burgerMenu.toggleClass('active');
    
    setTimeout( () => {
      $nav.toggleClass('active');
      $navUl.toggleClass('active');
      $body.toggleClass('active');
      $button.toggleClass('active');
    }, setTimeoutTime)

    if (!navOpen){
      $("#Nav-ul li").each(function(i) {
        $(this).delay(150 * i).fadeTo(300, 1).css({
          'transform': 'translateX(0)',
          'transition': 'all 1s ease-out'
        }, 100);
      });
      $button.fadeTo(300, 1).css({'bottom': '18vh'})
      navOpen = true;
    } else {
      $button.css({'bottom': '3vh'}).fadeTo(200, 0)
      $($("#Nav-ul li").get().reverse()).each(function(i) {
        $(this).delay(100 * i).fadeTo(100, 0)});

      setTimeout( () => {
      $("#Nav-ul li").each(function(i) {
        $(this).css({
          'transform': 'translateX(50px)'
        }, 100);
      })
      $button.css({'display': 'none'})
      }, 400 )

      navOpen = false;
    }

    
  
  }
  
  
});