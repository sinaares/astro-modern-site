  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
  );

  document
    .querySelectorAll(".content-card, .story-section")
    .forEach((el, i) => {
      const element = el as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(50px)";
      element.style.transition = `opacity 0.8s ease ${i * 0.05}s, transform 0.8s ease ${i * 0.05}s`;
      observer.observe(element);
    });

  document.querySelectorAll(".highlight-item").forEach((el, i) => {
    const element = el as HTMLElement;
    element.style.opacity = "0";
    element.style.transform = "translateX(-30px)";
    element.style.transition = `opacity 0.6s ease ${i * 0.05 + 0.2}s, transform 0.6s ease ${i * 0.05 + 0.2}s`;
    observer.observe(element);
  });