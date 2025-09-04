  // Enhanced parallax effect
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape, index) => {
      const element = shape as HTMLElement;
      const speed = [0.3, 0.5, 0.7, 0.4, 0.6][index % 5];
      const xOffset = index % 2 === 0 ? speed * 0.5 : -speed * 0.5;
      element.style.transform = `translateY(${scrolled * speed}px) translateX(${scrolled * xOffset}px)`;
    });
  });