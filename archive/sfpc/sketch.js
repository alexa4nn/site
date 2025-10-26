$(function () {
    $("#testarea").mousemove(function (e) {
      $(".cursor").show().css({
        "left": e.clientX,
        "top": e.clientY
      });
    }).mouseout(function () {
      $(".cursor").hide();
    });
  });