//closing the windows
$( ".loc_map" ).click(function() {
  $( "#foodmarket" ).hide();
  $( "#route" ).hide();
  $( "#service" ).hide();
  $( "#about" ).hide();
  $( "#contact" ).hide();
  $( "#search" ).hide();
});

$( ".bt-close" ).click(function() {
  $( "#foodmarket" ).hide();
  $( "#service" ).hide();
  $( "#about" ).hide();
  $( "#contact" ).hide();
  $( "#route" ).hide();
  $( "#search" ).hide();
});


//controlling top menu

$( "#i_foodmarket" ).click(function() {
  $( "#service" ).hide();
  $( "#search" ).hide();
  $( "#about" ).hide();
  $( "#contact" ).hide();
  $( "#route" ).hide();
  $( "#foodmarket" ).toggle(100);
});

$( "#i_route" ).click(function() {
  $( "#service" ).hide();
  $( "#search" ).hide();
  $( "#about" ).hide();
  $( "#contact" ).hide();
  $( "#foodmarket" ).hide();
  $( "#route" ).toggle(100);
});

$( "#i_search" ).click(function() {
  $( "#service" ).hide();
  $( "#foodmarket" ).hide();
  $( "#about" ).hide();
  $( "#contact" ).hide();
  $( "#route" ).hide();
  $( "#search" ).toggle(100);
});

$( "#i_service" ).click(function() {
  $( "#foodmarket" ).hide();
  $( "#search" ).hide();
  $( "#about" ).hide();
  $( "#contact" ).hide();
  $( "#route" ).hide();
  $( "#service" ).toggle(100);
});



$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});