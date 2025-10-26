$(function () {
    $('a img').hover( function () {
        $('a img').attr('src', 'images/eyeflowerfull-hover.png');
    },
    function(){
      $('a img').attr('src', 'images/eyeflowerfull.png')
    });
  });

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  filterSelection("all")
  function filterSelection(c){
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
    console.log(c);
  }


function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }
  
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
  }

  // Add active class to the current button (highlight it)
var myDropdown = document.getElementById("myDropdown");
var btns = myDropdown.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  $(document).ready(function() {
    //toggle the component with class accordion_body
    $(".accordion_head").click(function() {
      if ($('.accordion_body').is(':visible')) {
        $(".accordion_body").slideUp(300);
        $(".plusminus").text('+');
      }
      if ($(this).next(".accordion_body").is(':visible')) {
        $(this).next(".accordion_body").slideUp(300);
        $(this).children(".plusminus").text('+');
      } else {
        $(this).next(".accordion_body").slideDown(300);
        $(this).children(".plusminus").text('-');
      }
    });

    // Show black box on hover over projects
    $(".accordion_head").hover(
      function() {
        // Generate random position
        const maxX = window.innerWidth - 300; // 300 is the width of the box
        const maxY = window.innerHeight - 300; // 300 is the height of the box
        const randomX = Math.floor(Math.random() * Math.max(0, maxX));
        const randomY = Math.floor(Math.random() * Math.max(0, maxY));
        
        $(".hover-image-container").css({
          'opacity': '1',
          'visibility': 'visible',
          'top': randomY + 'px',
          'left': randomX + 'px',
          'right': 'auto',
          'transform': 'none'
        });
      },
      function() {
        $(".hover-image-container").css({
          'opacity': '0',
          'visibility': 'hidden'
        });
      }
    );
  });
  

