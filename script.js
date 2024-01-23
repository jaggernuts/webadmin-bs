$(document).ready(function(){
  $("#toggleSidebar").on( "click" ,function(){
    $("#sidebar").animate({right: "0", width: "toggle"}, 300, function(){
      $("#sidebar").css("right", "0");
          
    });
  });
 
  // for (let i = 1; i <= 10; i++) {
  //   let newRow = $('<tr>');
  //   
  //   newRow.append('<th scope="row">'+ i +'</th>');
  //   newRow.append('<td>Kitagawa</td>');
  //   newRow.append('<td>1/4/1998</td>');
  //   newRow.append('<td>Perempuan</td>');
  //   newRow.append('<td>Bojonegoro</td>');
  //   newRow.append('<td>082442332458</td>');
  //
  //  
  //   $('tbody').append(newRow);
  // }

  if($("aside li").hasClass("sidebar-active")){
    $(".sidebar-active a").css("color", "rgb(30, 84, 210)")
  }
  $("#userInfo").on("click", function(){
    $(".user-info .card").toggleClass("d-none");
  })

  const myImg = ["./assets/img/doctor1.webp", "./assets/img/doctor2.webp"];

  const size = myImg.length;
  const x = Math.floor(size*Math.random());
  $("#randomImages").src=myImg[x];

});


