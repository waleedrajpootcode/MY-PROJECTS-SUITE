/* =========================================
   SHOP EASE
   SECTION 1 — HEADER / NAVBAR JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    const navLinks = document.querySelectorAll(".nav-link");


    /* ---------- Open / Close Mobile Menu ---------- */

    function toggleMobileMenu() {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        overlay.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    }


    /* ---------- Close Mobile Menu ---------- */

    function closeMobileMenu() {

        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        overlay.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    /* ---------- Menu Button ---------- */

    menuToggle.addEventListener("click", toggleMobileMenu);


    /* ---------- Overlay ---------- */

    overlay.addEventListener("click", closeMobileMenu);


    /* ---------- Navigation Links ---------- */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            closeMobileMenu();

        });

    });


    /* ---------- Escape Key ---------- */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* ---------- Resize Protection ---------- */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {
            closeMobileMenu();
        }

    });

});/* =========================================
   SECTION 5 — FEATURED PRODUCTS CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const viewport = document.getElementById("featured-viewport");
    const track = document.getElementById("featured-track");

    const prevButton = document.getElementById("featured-prev");
    const nextButton = document.getElementById("featured-next");

    const dotsContainer = document.getElementById("featured-dots");

    if (!viewport || !track || !prevButton || !nextButton) {
        return;
    }


    const products = Array.from(
        track.querySelectorAll(".product-card")
    );


    let currentIndex = 0;


    /* =========================================
       HOW MANY PRODUCTS ARE VISIBLE?
    ========================================= */

    function getVisibleProducts() {

        if (window.innerWidth <= 600) {
            return 2;
        }

        if (window.innerWidth <= 800) {
            return 3;
        }

        if (window.innerWidth <= 1000) {
            return 4;
        }

        return 5;
    }


    /* =========================================
       MAXIMUM SLIDE INDEX
    ========================================= */

    function getMaxIndex() {

        return Math.max(
            0,
            products.length - getVisibleProducts()
        );

    }


    /* =========================================
       CREATE DOTS
    ========================================= */

    function createDots() {

        dotsContainer.innerHTML = "";

        const visible = getVisibleProducts();

        const totalSlides = Math.max(
            1,
            products.length - visible + 1
        );


        for (let i = 0; i < totalSlides; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.className = "carousel-dot";

            dot.setAttribute(
                "aria-label",
                `Go to product slide ${i + 1}`
            );


            dot.addEventListener("click", () => {

                currentIndex = i;

                updateCarousel();

            });


            dotsContainer.appendChild(dot);

        }

    }


    /* =========================================
       UPDATE DOTS
    ========================================= */

    function updateDots() {

        const dots = dotsContainer.querySelectorAll(
            ".carousel-dot"
        );

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* =========================================
       UPDATE BUTTONS
    ========================================= */

    function updateButtons() {

        const maxIndex = getMaxIndex();

        prevButton.disabled = currentIndex <= 0;

        nextButton.disabled = currentIndex >= maxIndex;

    }


    /* =========================================
       MOVE CAROUSEL
    ========================================= */

    function updateCarousel() {

        const maxIndex = getMaxIndex();

        currentIndex = Math.min(
            currentIndex,
            maxIndex
        );


        const firstCard = products[0];

        if (!firstCard) {
            return;
        }


        const cardWidth = firstCard.offsetWidth;

        const trackStyle = getComputedStyle(track);

        const gap = parseFloat(
            trackStyle.columnGap ||
            trackStyle.gap ||
            0
        );


        const moveDistance =
            (cardWidth + gap) * currentIndex;


        track.style.transform =
            `translateX(-${moveDistance}px)`;


        updateButtons();
        updateDots();

    }


    /* =========================================
       NEXT
    ========================================= */

    nextButton.addEventListener("click", () => {

        const maxIndex = getMaxIndex();

        if (currentIndex < maxIndex) {

            currentIndex++;

            updateCarousel();

        }

    });


    /* =========================================
       PREVIOUS
    ========================================= */

    prevButton.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    /* =========================================
       WISHLIST
    ========================================= */

    const wishlistButtons =
        track.querySelectorAll(".product-wishlist");


    wishlistButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");


            const icon =
                button.querySelector("i");


            if (button.classList.contains("active")) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

            } else {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

            }

        });

    });


    /* =========================================
       ADD TO CART FEEDBACK
    ========================================= */

    const cartButtons =
        track.querySelectorAll(".add-cart-btn");


    cartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const originalHTML =
                button.innerHTML;


            button.innerHTML =
                '<i class="fa-solid fa-check"></i> Added';


            button.classList.add("added");


            setTimeout(() => {

                button.innerHTML =
                    originalHTML;

                button.classList.remove("added");

            }, 1400);

        });

    });


    /* =========================================
       QUICK VIEW
    ========================================= */

    const quickViewButtons =
        track.querySelectorAll(".quick-view-btn");


    quickViewButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".product-card");

            const productName =
                card.querySelector("h3")?.textContent ||
                "Product";


            alert(
                `Quick View: ${productName}`
            );

        });

    });


    /* =========================================
       TOUCH / SWIPE
    ========================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    viewport.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    viewport.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;


            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                nextButton.click();

            } else {

                prevButton.click();

            }

        },
        { passive: true }
    );


    /* =========================================
       RESIZE
    ========================================= */

    let resizeTimer;


    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(() => {

            currentIndex = Math.min(
                currentIndex,
                getMaxIndex()
            );


            createDots();
            updateCarousel();

        }, 150);

    });


    /* =========================================
       INITIALIZE
    ========================================= */

    createDots();
    updateCarousel();

});/* =========================================
   SECTION 6 — FLASH SALE COUNTDOWN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const daysElement =
        document.getElementById("flash-days");

    const hoursElement =
        document.getElementById("flash-hours");

    const minutesElement =
        document.getElementById("flash-minutes");

    const secondsElement =
        document.getElementById("flash-seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    /*
       Demo sale deadline:
       3 days from the time the page loads.
    */

    const saleEndTime =
        Date.now() + (3 * 24 * 60 * 60 * 1000);


    function updateCountdown() {

        const now = Date.now();

        const difference =
            saleEndTime - now;


        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference /
                    (1000 * 60 * 60)) % 24
            );


        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );


        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

});/* =========================================
   SECTION 7 — NEW ARRIVALS CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const viewport =
        document.getElementById("new-arrivals-viewport");

    const track =
        document.getElementById("new-arrivals-track");

    const prevButton =
        document.getElementById("new-arrivals-prev");

    const nextButton =
        document.getElementById("new-arrivals-next");


    if (
        !viewport ||
        !track ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    const products =
        Array.from(
            track.querySelectorAll(".new-arrival-card")
        );


    let currentIndex = 0;


    /* =========================================
       VISIBLE PRODUCTS
    ========================================= */

    function getVisibleProducts() {

        if (window.innerWidth <= 600) {
            return 2;
        }

        if (window.innerWidth <= 800) {
            return 3;
        }

        if (window.innerWidth <= 1000) {
            return 4;
        }

        return 5;
    }


    /* =========================================
       MAX INDEX
    ========================================= */

    function getMaxIndex() {

        return Math.max(
            0,
            products.length -
            getVisibleProducts()
        );

    }


    /* =========================================
       UPDATE CAROUSEL
    ========================================= */

    function updateCarousel() {

        const maxIndex =
            getMaxIndex();


        currentIndex =
            Math.min(
                currentIndex,
                maxIndex
            );


        const firstCard =
            products[0];


        if (!firstCard) {
            return;
        }


        const cardWidth =
            firstCard.offsetWidth;


        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;


        const distance =
            (cardWidth + gap) *
            currentIndex;


        track.style.transform =
            `translateX(-${distance}px)`;


        prevButton.disabled =
            currentIndex <= 0;


        nextButton.disabled =
            currentIndex >= maxIndex;

    }


    /* =========================================
       NEXT
    ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            if (
                currentIndex <
                getMaxIndex()
            ) {

                currentIndex++;

                updateCarousel();

            }

        }
    );


    /* =========================================
       PREVIOUS
    ========================================= */

    prevButton.addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

                updateCarousel();

            }

        }
    );


    /* =========================================
       QUICK ADD
    ========================================= */

    const quickAddButtons =
        track.querySelectorAll(
            ".quick-add-btn"
        );


    quickAddButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const originalHTML =
                        button.innerHTML;


                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Added';


                    button.classList.add(
                        "added"
                    );


                    setTimeout(
                        () => {

                            button.innerHTML =
                                originalHTML;

                            button.classList.remove(
                                "added"
                            );

                        },
                        1400
                    );

                }
            );

        }
    );


    /* =========================================
       TOUCH SWIPE
    ========================================= */

    let touchStartX = 0;

    let touchEndX = 0;


    viewport.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    viewport.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;


            const difference =
                touchStartX - touchEndX;


            if (
                Math.abs(difference) < 50
            ) {
                return;
            }


            if (difference > 0) {

                nextButton.click();

            } else {

                prevButton.click();

            }

        },
        { passive: true }
    );


    /* =========================================
       RESIZE
    ========================================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(
                    () => {

                        updateCarousel();

                    },
                    150
                );

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    updateCarousel();

});

/* =========================================
   TASK 2 — PREMIUM MOTION ENGINE
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Add reveal classes after JS loads so content remains visible if JS is disabled.
    const revealTargets = [
        ...document.querySelectorAll(".hero-content"),
        ...document.querySelectorAll("main > section"),
        ...document.querySelectorAll(".product-card"),
        ...document.querySelectorAll(".category-card"),
        ...document.querySelectorAll(".review-card"),
        ...document.querySelectorAll(".social-card")
    ];

    const uniqueTargets = [...new Set(revealTargets)];
    uniqueTargets.forEach((element, index) => {
        element.classList.add("reveal");
        if (element.classList.contains("product-card")) {
            element.style.setProperty("--reveal-delay", `${Math.min((index % 4) * 70, 210)}ms`);
        }
    });

    if (prefersReducedMotion) {
        uniqueTargets.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    if (!("IntersectionObserver" in window)) {
        uniqueTargets.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
    });

    uniqueTargets.forEach((element) => observer.observe(element));
});

/* =========================================================
   TASK 2.5 — SIGNATURE MICRO-INTERACTIONS
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Gentle pointer tilt on desktop product cards — never enough to hurt usability.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.querySelectorAll(".product-card").forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.setProperty("--tilt-x", `${(-y * 2.2).toFixed(2)}deg`);
                card.style.setProperty("--tilt-y", `${(x * 2.2).toFixed(2)}deg`);
                card.style.transform = `translateY(-7px) perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))`;
            });
            card.addEventListener("pointerleave", () => {
                card.style.removeProperty("transform");
            });
        });
    }

    // Give the logo a tiny magnetic response while keeping keyboard/touch unaffected.
    const logo = document.querySelector(".brand-logo");
    if (logo && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        logo.addEventListener("pointermove", (event) => {
            const rect = logo.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            logo.style.transform = `translate(${x * 3}px, ${y * 2}px)`;
        });
        logo.addEventListener("pointerleave", () => logo.style.removeProperty("transform"));
    }
});

/* =========================================================
   SHOP EASE — FAQ + FOOTER INTERACTION LAYER
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((button) => {
        const item = button.closest(".faq-item");
        if (!item) return;

        button.setAttribute(
            "aria-expanded",
            String(item.classList.contains("active"))
        );

        button.addEventListener("click", () => {
            const currentItem = button.closest(".faq-item");
            if (!currentItem) return;

            const opening = !currentItem.classList.contains("active");
            currentItem.classList.toggle("active", opening);
            button.setAttribute("aria-expanded", String(opening));
        });
    });

    document.querySelectorAll(".footer-column a, .footer-bottom-links a").forEach((link) => {
        link.addEventListener("pointerdown", () => {
            link.classList.add("link-pressed");
            window.setTimeout(() => link.classList.remove("link-pressed"), 180);
        });
    });
});
