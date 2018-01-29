$(document).ready(function() {
  console.log("script loaded")
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


  // delete button
  $('#delete').click(function() {
    
    // selecting the beer's id from hidden input
    const id = $('#beer-id').val();
    console.log(`Deleting id: ${id}`);
    
    // Prompt user before deleting
    const confirm = window.confirm('Are you sure you want to delete this?');
    if(confirm) { // execute if user selects okay
      $.ajax({
        url: `/beers/${id}`, // Path
        type: 'DELETE',
        success: function(data) {
          console.log('deleting ', data);
          
          // redirect to beers list after deleting an individual beer
          window.location.href = '/beers'; 
        },
        error: function(xhr, status, error) {
          // add error handler
        }
      })
    }

  })

  // Selecting form that creates a new beer
  $('#new-beer').submit(function(e) {
    e.preventDefault();

    const data = $(this).serialize();
    console.log('data ', data);
    $.ajax({
      url: '/beers',
      data: data,
      type: 'POST',
      success: function(data) {
        console.log('data received ', data)
        window.location.href = `/beers/${data.id}`
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    })
  })
});