document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");

    if (menuButton && navbar) {

        menuButton.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }

});