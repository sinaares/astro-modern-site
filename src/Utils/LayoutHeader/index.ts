  const navToggle = document.querySelector(".nav-toggle") as HTMLElement | null;
  const navMenuContainer = document.querySelector(
    ".nav-menu-container"
  ) as HTMLElement | null;
  const navOverlay = document.querySelector(
    ".nav-overlay"
  ) as HTMLElement | null;

  // Add item index for staggered animations
  const navItems = document.querySelectorAll<HTMLElement>(".nav-menu > li");
  navItems.forEach((item, index) => {
    item.style.setProperty("--item-index", index.toString());
  });

  // Toggle menu open/close
  navToggle?.addEventListener("click", () => {
    if (!navMenuContainer) return;
    const isActive = navMenuContainer.classList.contains("active");
    isActive ? closeMenu() : openMenu();
  });

  function openMenu() {
    if (navMenuContainer && navOverlay && navToggle) {
      navMenuContainer.classList.add("active");
      navOverlay.classList.add("active");
      navToggle.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMenu() {
    if (navMenuContainer && navOverlay && navToggle) {
      navMenuContainer.classList.remove("active");
      navOverlay.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }

    // Close all dropdowns
    document
      .querySelectorAll<HTMLElement>(".dropdown.active")
      .forEach((dropdown) => {
        dropdown.classList.remove("active");
      });

    // Also explicitly hide all dropdown menus (fixes lingering items)
    document.querySelectorAll<HTMLElement>(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  }

  // Close on overlay click
  navOverlay?.addEventListener("click", closeMenu);

  // Handle links & dropdown toggling
  document
    .querySelectorAll<HTMLAnchorElement>(".nav-menu a")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const parentDropdown = link.closest(".dropdown");

        // Mobile dropdown toggle
        if (
          parentDropdown &&
          link === parentDropdown.querySelector(".nav-link") &&
          window.innerWidth <= 1100
        ) {
          e.preventDefault();
          parentDropdown.classList.toggle("active");
          const dropdownMenu =
            parentDropdown.querySelector<HTMLElement>(".dropdown-menu");
          dropdownMenu!.style.display = parentDropdown.classList.contains(
            "active"
          )
            ? "flex"
            : "none";
          return;
        }

        // For normal links: prevent instant jump
        if (window.innerWidth <= 1100) {
          e.preventDefault(); // stop instant navigation

          const href = link.href;

          closeMenu(); // start closing animation

          // Wait for animation to finish (~400ms)
          setTimeout(() => {
            window.location.href = href;
          }, 400);
        }
      });
    });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // Close menu on resize (desktop mode)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });