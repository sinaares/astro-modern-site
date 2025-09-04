  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetNumber = parseInt(el.getAttribute("data-target") ?? "0", 10);

            let current = 0;
            const increment = targetNumber / 100;

            const counter = setInterval(() => {
              current += increment;
              if (current >= targetNumber) {
                el.textContent = targetNumber.toString();

                clearInterval(counter);
              } else {
                el.textContent = Math.floor(current).toString();

              }
            }, 30);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll(".count-number")
      .forEach((el) => observer.observe(el));
  });