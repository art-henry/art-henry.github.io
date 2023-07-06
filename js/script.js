// (function () {
//   window.addEventListener("load", function () {
//     function handleLinkClick(event) {
//       if (isTouchDevice()) {
//         event.preventDefault(); // Предотвращаем переход по ссылке по умолчанию

//         const link = event.currentTarget;
//         link.classList.add("hovered"); // Добавляем класс для применения стилей ховера

//         setTimeout(function () {
//           window.location.href = link.href; // Переходим по ссылке после отображения стилей ховера

//           link.classList.remove("hovered"); // Удаляем класс "hovered" после перехода по ссылке
//         }, 500); // Задержка для отображения стилей ховера (здесь 500 мс, вы можете изменить значение)
//       }
//     }

//     function isTouchDevice() {
//       return (
//         "ontouchstart" in window ||
//         navigator.maxTouchPoints > 0 ||
//         navigator.msMaxTouchPoints > 0
//       );
//     }

//     const links = document.querySelectorAll(".sidepanel__link");
//     links.forEach(function (link) {
//       link.addEventListener("click", handleLinkClick);
//     });
//   });
// })();

(function () {
  window.addEventListener("load", function () {
    function handleLinkClick(event) {
      if (isMobileDevice()) {
        event.preventDefault(); // Предотвращаем переход по ссылке по умолчанию
        const link = event.currentTarget;
        link.classList.add("hovered"); // Добавляем класс для применения стилей ховера
        console.log(link);
        setTimeout(function () {
          window.location.href = link.href; // Переходим по ссылке после отображения стилей ховера

          link.classList.remove("hovered"); // Удаляем класс "hovered" после перехода по ссылке
        }, 500); // Задержка для отображения стилей ховера (здесь 500 мс, вы можете изменить значение)
      }
    }

    function isMobileDevice() {
      return window.innerWidth <= 768;
    }

    const links = document.querySelectorAll(".sidepanel__link");
    links.forEach(function (link) {
      link.addEventListener("click", handleLinkClick);
    });

    //overlay

    const overlay = document.querySelector(".overlay");

    const closeMenu = function () {
      overlay.classList.remove("overlay--open");
      menu.classList.remove("menu--open");
      hamburger.classList.remove("hamburger--open");
    };

    overlay.addEventListener("click", closeMenu);

    // hamburger
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    const toggleMenu = function () {
      hamburger.classList.toggle("hamburger--open");
      menu.classList.toggle("menu--open");
      overlay.classList.toggle("overlay--open");
    };

    hamburger.addEventListener("click", toggleMenu);
  });

  // level bar

  const counters = document.querySelectorAll(".skills__counter"),
    bars = document.querySelectorAll(".skills__bar span");

  counters.forEach((counter, i) => {
    bars[i].style.width = counter.innerHTML;
  });
})();
