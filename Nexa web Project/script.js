/* =========================================
   NEXA — FAQ Accordion
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {

        question.addEventListener("click", () => {

            const isCurrentlyOpen =
                question.getAttribute("aria-expanded") === "true";

            // Close all FAQ items
            faqQuestions.forEach((item) => {
                item.setAttribute("aria-expanded", "false");

                const icon = item.querySelector(".faq-icon");

                if (icon) {
                    icon.textContent = "+";
                }
            });

            // Open selected item if it was closed
            if (!isCurrentlyOpen) {

                question.setAttribute("aria-expanded", "true");

                const icon = question.querySelector(".faq-icon");

                if (icon) {
                    icon.textContent = "−";
                }
            }

        });

    });

});/* =========================================
   NEXA — Footer Back To Top
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        backToTop.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});