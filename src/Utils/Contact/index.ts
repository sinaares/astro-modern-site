  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById(
      "contact-form"
    ) as HTMLFormElement | null;

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Gönderiliyor...";
      }
      try {
        const formData = new FormData(form);
        const response = await fetch(
          "https://formsubmit.co/ajax/sina.ares85@gmail.com",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("Mesaj başarıyla gönderildi!");
          form.reset();
        } else {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      } catch (error) {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Gönder";
        }
      }
    });
  });