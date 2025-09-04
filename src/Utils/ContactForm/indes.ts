
  document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById(
      "dropdown-button"
    ) as HTMLButtonElement | null;
    const dropdownText = document.getElementById(
      "dropdown-text"
    ) as HTMLElement | null;
    const dropdownArrow = document.querySelector(
      ".dropdown-arrow"
    ) as HTMLElement | null;
    const dropdownMenu = document.getElementById(
      "dropdown-menu"
    ) as HTMLElement | null;
    const dropdownItems =
      document.querySelectorAll<HTMLElement>(".dropdown-item");

    // Elements in the display
    const displayNumber = document.getElementById("display-number");
    const displayQuestion = document.getElementById("display-question");
    const displayAnswer = document.getElementById("display-answer");

    if (
      !dropdownButton ||
      !dropdownMenu ||
      !dropdownText ||
      !dropdownArrow ||
      !displayNumber ||
      !displayQuestion ||
      !displayAnswer
    ) {
      console.warn("Some dropdown or display elements are missing");
      return;
    }

    if (dropdownItems.length === 0) {
      console.warn("No dropdown items found");
      return;
    }

    let isOpen = false;

    // Initialize first item
    const firstItem = dropdownItems[0];
    if (firstItem) {
      firstItem.classList.add("selected");
      dropdownText.textContent = firstItem.dataset.question || "";
      displayNumber.textContent = "01";
      displayQuestion.textContent = firstItem.dataset.question || "";
      displayAnswer.textContent = firstItem.dataset.answer || "";
    }

    // Toggle dropdown
    dropdownButton.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen = !isOpen;

      if (isOpen) {
        dropdownMenu.style.display = "block";
        dropdownArrow.style.transform = "rotate(180deg)";
        dropdownButton.classList.add("active");
      } else {
        dropdownMenu.style.display = "none";
        dropdownArrow.style.transform = "rotate(0deg)";
        dropdownButton.classList.remove("active");
      }
    });

    // Handle dropdown item selection
    dropdownItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const question = this.dataset.question;
        const answer = this.dataset.answer;
        const indexStr = this.dataset.index;

        if (!question || !answer || !indexStr) return;

        const index = parseInt(indexStr) + 1;

        // Update dropdown button text
        dropdownText.textContent = question;

        // Update display text only (keep colors/borders)
        displayNumber.textContent = index.toString().padStart(2, "0");
        displayQuestion.textContent = question;
        displayAnswer.textContent = answer;

        // Close dropdown
        dropdownMenu.style.display = "none";
        dropdownArrow.style.transform = "rotate(0deg)";
        dropdownButton.classList.remove("active");
        isOpen = false;

        // Highlight selected dropdown item
        dropdownItems.forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      if (isOpen) {
        dropdownMenu.style.display = "none";
        dropdownArrow.style.transform = "rotate(0deg)";
        dropdownButton.classList.remove("active");
        isOpen = false;
      }
    });
  });