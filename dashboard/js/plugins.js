// "use strict";
// document.addEventListener("DOMContentLoaded", function () {
//   $(function () {
//     $('[data-toggle="tooltip"]').tooltip();
//   }),
//     $("#myTabs a").click(function (o) {
//       o.preventDefault(), $(this).tab("show");
//     }),
//     $(document).ready(function () {
//       $(".slides").slick({
//         dots: !0,
//         arrows: !1,
//         infinite: !0,
//         speed: 300,
//         slidesToShow: 1,
//       }),
//         $(".scrollbar-inner").scrollbar(),
//         $(window).on("resize", function () {
//           $(".scrollbar-inner").scrollbar();
//         });
//     }),
//     $("#toggle-mode").on("change", function () {
//       $(this).is(":checked")
//         ? ($("body").addClass("night-mode"),
//           $(".fa-moon").addClass("active-mode-icon"),
//           $(".fa-sun").removeClass("active-mode-icon"))
//         : ($("body").removeClass("night-mode"),
//           $(".fa-moon").removeClass("active-mode-icon"),
//           $(".fa-sun").addClass("active-mode-icon"));
//     }),
//     (function () {
//       var o = $(".menu-btn"),
//         a = $("body"),
//         n = "_mobileSidebar",
//         s = 1920,
//         e = "_openInMobile";
//       o.on("click", function (o) {
//         var i = $(window).width();
//         a.toggleClass(n), i < s && a.toggleClass(e);
//       }),
//         $(window).on("resize load", function (o) {
//           var i = $(this).width();
//           i < s && !a.hasClass(e)
//             ? a.addClass(n)
//             : i > s && (a.removeClass(n), a.removeClass(e));
//         });
//       var i = $("#loading");
//       $(window).on("load", function (o) {
//         i.addClass("hide");
//       });
//     })();
//   var modalBtns = $("[data-modal]");
//   modalBtns.on("click", function (o) {
//     o.prventDefault();
//     var a = $(this).attr("data-modal");
//     $(a).bPopup({ closeClass: "close-modal-btn" });
//   });
// });

"use strict";
document.addEventListener("DOMContentLoaded", function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $("#myTabs a").click(function (o) {
    o.preventDefault();
    $(this).tab("show");
  });

  $(document).ready(function () {
    $(".scrollbar-inner").scrollbar();
  });

  $("#toggle-mode").on("change", function () {
    $(this).is(":checked")
      ? ($("body").addClass("night-mode"),
        $(".fa-moon").addClass("active-mode-icon"),
        $(".fa-sun").removeClass("active-mode-icon"))
      : ($("body").removeClass("night-mode"),
        $(".fa-moon").removeClass("active-mode-icon"),
        $(".fa-sun").addClass("active-mode-icon"));
  });

  function toggleMobileSidebar() {
    var o = $(".menu-btn"),
      a = $("body"),
      n = "_mobileSidebar",
      s = 1920,
      e = "_openInMobile";
    o.on("click", function (o) {
      var i = $(window).width();
      a.toggleClass(n), i < s && a.toggleClass(e);
    });

    $(window).on("resize load", function (o) {
      var i = $(this).width();
      a.toggleClass(n, i < s);
      a.toggleClass(e, i < s);
    });

    var i = $("#loading");
    $(window).on("load", function () {
      // После загрузки страницы с задержкой, инициализируем слайдер
      setTimeout(function () {
        $(".slides").slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
        });
      }, 500);

      i.addClass("hide");
    });
  }

  toggleMobileSidebar();

  var modalBtns = $("[data-modal]");
  modalBtns.on("click", function (o) {
    o.preventDefault();
    var a = $(this).attr("data-modal");
    $(a).bPopup({ closeClass: "close-modal-btn" });
  });
});
