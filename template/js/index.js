// $('.carousel.carousel-slider').carousel({fullWidth: true});
// $(document).ready(function(){
//     $('.slider').slider();
//   });


$(document).ready(function(){
    $('#modal1').modal();
    $('#modalEvents').modal();
    $('#create').modal();
    $('#createCenter').modal();
    $('#Edit').modal();
    $('#EditCenter').modal();
    $('#deleteCenter').modal();
    $('#delete').modal();
    $('#cancel').modal();
    $(".dropdown-button").dropdown(
      {
        belowOrigin: true
      }
    );
    $('ul.tabs').tabs();

    $('.scrollspy').scrollSpy();
    $(".button-collapse").sideNav();
    $('.datepicker').pickadate({
      selectMonths: true, 
      selectYears: 15, 
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false 
    });
    $('#calendar').fullCalendar({
    })
    
  });

