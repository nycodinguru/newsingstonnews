$(document).ready(function() {
  fetch();
  console.log("script loaded");

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
        console.log("response ", data);
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
    const source = $("#fetch-this").text();
    //console.log(`fetching news from: ${source}`);

    $.ajax({
      url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a15bce4b34d143389058f96a45bb62b1`, // Path
      type: "GET",
      success: function(data) {
        var articles = data.articles;

        var $body = $("body");
        console.log(articles);

        //This for loop applys inline CSS to dynamically rendered DOM elements

        for (var i = 0; i < articles.length; i++) {
          console.log(articles[i].urlToImage);
          var $newdiv = $("<div>").css({
            height: "406px",
            width: "100vw",
            "margin-left": "auto",
            "margin-right": "auto",
            display: "inline-block"
          });
          var $newHeadLine = $("<h3>")
            .text(`${articles[i].title}`)
            .css({
              "text-align": "center",
              margin: "15px 0px 10px 0px",
              "font-size": "23pt",
              background: "black",
              color: "white",
              padding: "8px",
              "margin-bottom": "0px",
              "font-family": `'Archivo Narrow', sans-serif`
            });
          var $newImageDiv = $("<div>", {
            height: "380px",
            width: "100vw"
          }).css({
            "background-image": `url('${articles[i].urlToImage}')`,
            "background-size": "cover",
            "background-position": "center"
          });
          var $newPtag = $("<p>")
            .text(`${articles[i].description}`)
            .css({
              "padding-top": "15px",
              "padding-bottom": "5px",
              "margin-bottom": "130px",
              "font-size": "16pt",
              "font-family": `'Archivo Narrow', sans-serif`,
              "margin-bottom": "20px"
            });

          $newdiv.append($newHeadLine);
          $newdiv.append($newImageDiv);
          $newdiv.append($newPtag);
          $body.append($newdiv);
        }
      }
    });
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
  $("#delete-button").click(function(e) {
    e.preventDefault();
    // selecting the user's id from hidden input
    const id = $("#id").val();
    console.log(`Deleting id: ${id}`);

    // Prompt user before deleting
    const checkbox = $("#checkBox").val();
    console.log(checkbox);

    if (confirm) {
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
    }
  });
});
