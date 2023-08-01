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

  // function toggleLanguage() {
  //   const currentLanguage = localStorage.getItem("language");
  //   const newLanguage = currentLanguage === "ukr" ? "en" : "ukr";
  //   localStorage.setItem("language", newLanguage);

  //   if (newLanguage === "ukr") {
  //     window.location.href = "index_ukr.html";
  //   } else {
  //     window.location.href = "index.html";
  //   }
  // }

  window.addEventListener("load", function () {
    // const toggleBtn = document.querySelector(".toggle-btn");
    // if (toggleBtn) {
    //   toggleBtn.addEventListener("click", toggleLanguage);
    // }

    // const language = localStorage.getItem("language");
    // if (language === "ukr") {
    //   const ukFlag = document.querySelector(".toggle-btn__icon");
    //   if (ukFlag) {
    //     ukFlag.src = "icons/uk.png";
    //   }

    //   const toggleText = document.querySelector(".toggle-btn__text");
    //   if (toggleText) {
    //     toggleText.textContent = "UK";
    //   }
    // }
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
    const textArea = form.querySelector('textarea[name="text"]');
    const privacyCheckbox = form.querySelector("#privacy-policy");

    if (!nameInput.value.trim()) {
      alert("Будь ласка, вкажіть ваше ім'я");
      return false;
    }

    if (!emailInput.value.trim()) {
      alert("Нам потрібна ваша електронна адреса для зв'язку з вами");
      return false;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      alert("Ваша електронна адреса повинна бути у форматі name@domain.com");
      return false;
    }

    if (!textArea.value.trim()) {
      alert("Будь ласка, введіть ваше повідомлення");
      return false;
    }

    if (!privacyCheckbox.checked) {
      alert("Будь ласка, погодьтесь з політикою конфіденційності");
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
  // function sendFormData(form) {
  //   const formData = new FormData(form);

  //   fetch("mailer/smart.php", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.text())
  //     .then((data) => {
  //       if (data.includes("success")) {
  //         alert("Дані успішно відправлені на сервер!");
  //       } else {
  //         alert("Сталася помилка. Будь ласка, спробуйте пізніше.");
  //       }
  //     })
  //     .catch((error) => {
  //       alert("Сталася помилка. Будь ласка, спробуйте пізніше.");
  //     });
  // }
  // Відправка даних на сервер
  function sendFormData(form) {
    const formData = new FormData(form);

    fetch("mailer/smart.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("success")) {
          showModal("Message was sent successfully!"); // Показати повідомлення про успішну відправку
        } else {
          showModal("Error occurred. Please try again later."); // Показати повідомлення про помилку
        }
      })
      .catch((error) => {
        showModal("Error occurred. Please try again later."); // Показати повідомлення про помилку
      });
  }
})();
