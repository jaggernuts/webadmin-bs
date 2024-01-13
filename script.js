$(document).ready(function(){
  $("#toggleSidebar").on( "click" ,function(){
    $("#sidebar").animate({right: "0", width: "toggle"}, 200, function(){
      $("#sidebar").css("right", "0");

    });

  });
  if($("aside li").hasClass("sidebar-active")){
    $(".sidebar-active a").css("color", "rgb(30, 84, 210)")
  }
  $("#userInfo").on("click", function(){
    $(".user-info .card").toggleClass("d-none");
  })
});
