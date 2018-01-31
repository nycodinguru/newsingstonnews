$(document).ready(function() {
 fetch()
 console.log("script loaded")
  
  // selecting edit form
  $('#signup-submit').submit(function(e){
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    
    
    console.log(`Form data: ${data}`)

    // PUT request to /beer/:beerId to update an individual beer
    $.ajax({
      url: `/`,
      data: data,
      type: 'POST',
      success: function(data) {
        console.log('response ', data)
        // redirecting to the beer's show page on success
        window.location.href = `/profiles/${data.id}`;
      }, 
      error: function(xhr, status, error) {
        // add error handler
      }

    })

  })


  // fetch news from favorite source
  function fetch() {
    
    // selecting the beer's id from hidden input
    const source = $('#fetch-this').text();
    console.log(`fetching news from: ${source}`);


    console.log(source)
    
   
      $.ajax({
        url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a15bce4b34d143389058f96a45bb62b1`, // Path
        type: 'GET',
        success: function(data) {
          var articles = data.articles;

          var $body = $('body');
          console.log(articles)
            
          for (var i = 0; i < articles.length; i++) {
            console.log(articles[i].urlToImage)
        var $newdiv = $('<div>').css({"height": "406px", "width": "310px", "margin-left": "auto", "margin-right": "auto"})
        var $newHeadLine = $('<h3>').text(`${articles[i].title}`)
        var $newImageDiv = $('<div>',{height: "250px", width: "300px"}).css({"background-image": `url('${articles[i].urlToImage}')`, "background-size": "cover", "background-position": "center"})
        var $newPtag = $('<p>').text(`${articles[i].description}`)

          $newdiv.append($newHeadLine)
          $newdiv.append($newImageDiv)
          $newdiv.append($newPtag)
          $body.append($newdiv);
        
      }
    }
  })
    }
          
    

   $('#update-form').submit(function(e){
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    // selecting the beer's id from hidden input
    const id = $('#id').val();
    
    console.log(`Form data: ${data}`)

    // PUT request to /beer/:beerId to update an individual beer
    $.ajax({
      url: '/newsington/users/update',
      data: data,
      type: 'PUT',
      success: function(data) {
        console.log('response ', data)
        // redirecting to the beer's show page on success
        window.location.href = `/newsington/users/profile`;
      }, 
      error: function(xhr, status, error) {
        // add error handler
      }

    })

  })
});