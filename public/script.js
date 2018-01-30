$(document).ready(function() {
 
  
  // selecting edit form
  $('#signup-submit').submit(function(e){
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    // selecting the beer's id from hidden input
    // const id = $('#beer-id').val();
    
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
    const source = $('#news-source');
    console.log(`fetching news from: ${source}`);
    
   
      $.ajax({
        url: `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a15bce4b34d143389058f96a45bb62b1`, // Path
        type: 'GET',
        success: function(data) {
          console.log(data);
          
          // redirect to beers list after deleting an individual beer
          // window.location.href = '/beers'; 
        },
        error: function(xhr, status, error) {
          // add error handler
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
      url: '/users/update',
      data: data,
      type: 'PUT',
      success: function(data) {
        console.log('response ', data)
        // redirecting to the beer's show page on success
        window.location.href = `/users/profile`;
      }, 
      error: function(xhr, status, error) {
        // add error handler
      }

    })

  })
});