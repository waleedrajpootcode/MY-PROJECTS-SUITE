/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show");

});


/* Close menu after clicking link */

const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");

    });

});


/* ================= MENU FILTER ================= */

const filters = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll(".menu-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.getAttribute("data-filter");

        menuCards.forEach(card => {

            const category =
                card.getAttribute("data-category");

            if (
                selected === "all" ||
                selected === category
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.classList.add("show");
                }, 50);

            } else {

                card.classList.remove("show");

                card.style.display = "none";

            }

        });

    });

});


/* ================= SCROLL ANIMATION ================= */

const revealElements = document.querySelectorAll(
    ".menu-card, .speciality, .gallery-item, .story-content, .chef-content"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    observer.observe(element);

});


/* ================= HEADER SCROLL ================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.boxShadow =
            "0 5px 25px rgba(70, 55, 35, .08)";

    } else {

        header.style.boxShadow = "none";

    }

});