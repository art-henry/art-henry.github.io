(function () {
  // Функція для показу модального вікна з переданим текстом
  function showModal(message) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";
    setTimeout(function () {
      modal.style.display = "none";
    }, 3000); // Закривати автоматично після 3 секунд
  }
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

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
        }, 500); // Задержка для отображения стилей ховера
      }
    }

    function isMobileDevice() {
      return window.innerWidth <= 768;
    }

    const links = document.querySelectorAll(".sidepanel__link");
    links.forEach(function (link) {
      link.addEventListener("click", handleLinkClick);
    });

    // Знаходимо елементи overlay, hamburger та menu
    const overlay = document.querySelector(".overlay");
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    // Функція для закриття меню
    function closeMenu() {
      overlay.classList.remove("overlay--open");
      menu.classList.remove("menu--open");
      hamburger.classList.remove("hamburger--open");
    }

    // Знаходимо всі посилання меню з класом .menu__item
    const menuItems = document.querySelectorAll(".menu__item");

    // Додаємо обробник кліку для кожного посилання меню
    menuItems.forEach(function (menuItem) {
      menuItem.addEventListener("click", closeMenu);
    });

    // Додаємо обробник кліку для overlay, щоб закрити меню
    overlay.addEventListener("click", closeMenu);

    // Функція для відкриття/закриття меню
    function toggleMenu() {
      hamburger.classList.toggle("hamburger--open");
      menu.classList.toggle("menu--open");
      overlay.classList.toggle("overlay--open");
    }

    // Додаємо обробник кліку для hamburger, щоб відкрити/закрити меню
    hamburger.addEventListener("click", toggleMenu);
  });

  // level bar

  const counters = document.querySelectorAll(".skills__counter"),
    bars = document.querySelectorAll(".skills__bar span");

  counters.forEach((counter, i) => {
    bars[i].style.width = counter.innerHTML;
  });

  // Валідація форми
  function validateForm(form) {
    const targetForm = document.querySelector(form);

    targetForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!isValidForm(targetForm)) {
        return;
      }

      // Відправка даних на сервер
      sendFormData(targetForm);

      // Очищення полів форми після успішного надсилання
      targetForm.reset();
    });
  }

  function isValidForm(form) {
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const textArea = form.querySelector('textarea[name="message"]');
    const privacyCheckbox = form.querySelector("#privacy-policy");

    if (!nameInput.value.trim()) {
      alert("Please enter your name.");
      return false;
    }

    if (!emailInput.value.trim()) {
      alert("We need your email to contact you.");
      return false;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      alert("Please enter a valid email address (e.g., name@example.com).");
      return false;
    }

    if (!textArea.value.trim()) {
      alert("Please enter your message.");
      return false;
    }

    if (!privacyCheckbox.checked) {
      alert("Please agree to the privacy policy.");
      return false;
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  // Викликати функцію validateForm для вашої конкретної форми
  validateForm(".contacts__form");

  // Відправка даних на сервер
  function sendFormData(form) {
    // const formData = new FormData(form);

    // form.submit();

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://formspree.io/f/mvojzqdy", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(xhr.responseText);
        if (response.ok) {
          showModal("Message was sent successfully!");
        } else {
          showModal("Error occurred. Please try again later.");
        }
      }
    };
    xhr.send(formData);
  }

  // videoLoader
  var videoPlaceholder = document.getElementById("video-placeholder"),
    playIcon = document.querySelector(".play-icon"),
    playButtons = document.querySelectorAll(".play-video"),
    body = document.body;

  function playVideo() {
    var videoLinkElement = document.querySelector(".video_link"),
      videoSrc = videoLinkElement ? videoLinkElement.textContent.trim() : "",
      videoContainer = document.querySelector(".video_review_section"),
      originalContent = videoContainer.innerHTML; // Зберігаємо оригінальний вміст контейнера

    // Очищаємо контейнер перед додаванням нового елемента
    if (videoContainer) {
      videoContainer.innerHTML = "";
    } else {
      console.log("Video container not found");
      return;
    }

    if (videoLinkElement && videoLinkElement.classList.contains("mediateka")) {
      // Якщо є клас 'mediateka', створюємо тег <video>
      var videoElement = document.createElement("video");
      videoElement.src = videoSrc;
      videoElement.controls = true; // Дозволяємо контроли відтворення
      videoElement.autoplay = true; // Автовідтворення
      videoElement.title = "Video player";
      videoContainer.appendChild(videoElement);

      // Додаємо обробник подій для відтворення відео
      videoElement.onended = function () {
        videoContainer.innerHTML = originalContent; // Повертаємо оригінальний вміст контейнера
        reattachEventListeners();
      };
    } else {
      // Якщо класу 'mediateka' немає, використовуємо <iframe>
      videoSrc += "&autoplay=1";
      var videoIframe = document.createElement("iframe");
      videoIframe.src = videoSrc;
      videoIframe.title = "YouTube video player";
      videoIframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      videoIframe.allowFullscreen = true;
      videoContainer.appendChild(videoIframe);
    }
  }

  function reattachEventListeners() {
    // Перепризначення обробників подій для play-icon та .play-video
    playIcon = document.querySelector(".play-icon"); // Перепризначення, тому що playIcon втратив свій обробник
    playButtons = document.querySelectorAll(".play-video"); // Якщо .play-video також використовуються і їх було замінено

    if (playIcon) {
      playIcon.addEventListener("click", playVideo);
    }

    playButtons.forEach(function (button) {
      button.addEventListener("click", handlePlayButtonClick);
    });
  }

  function redirectToHomeAndPlayVideo() {
    // Перенаправлення на головну сторінку з параметром для відтворення відео
    sessionStorage.setItem("playVideo", "true"); // Встановлюємо флаг у sessionStorage перед перенаправленням
    var homeUrl = new URL(window.location.origin);
    window.location.href = homeUrl.href;
  }

  function handlePlayButtonClick(event) {
    if (event.target.closest(".play-video")) {
      // Перевіряємо, чи ми на головній сторінці
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html"
      ) {
        playVideo();
      } else {
        redirectToHomeAndPlayVideo();
      }
    } else if (event.target.closest(".play-icon")) {
      playVideo();
    }

    // Перевірка, чи кнопка знаходиться всередині елемента `aside`
    if (event.target.closest("aside")) {
      body.classList.remove("mobile-menu-open");
    }
  }

  // Перевірка sessionStorage і відтворення відео
  if (sessionStorage.getItem("playVideo") === "true") {
    playVideo();
    sessionStorage.removeItem("playVideo"); // Видаляємо флаг після відтворення, щоб відео не відтворювалось повторно
  }

  // Навішування обробників подій на кнопку play-icon
  if (playIcon && videoPlaceholder) {
    playIcon.addEventListener("click", playVideo);
  }

  // Навішування обробників подій на кнопки .play-video
  playButtons.forEach(function (button) {
    button.addEventListener("click", handlePlayButtonClick);
  });
})();
