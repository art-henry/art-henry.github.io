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
})();
