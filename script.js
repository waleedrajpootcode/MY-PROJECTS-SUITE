/* =========================================================
   NEXUS CORE SUITE — SAAS HUB CONTROLLER
   Full-stack sandbox engine, live previews & keyboard telemetry
   ========================================================= */

const projectsData = [
    {
        id: "ecommerce-system",
        title: "ShopEase Global E-Commerce",
        category: "ecommerce",
        folder: "Ecommerce_Project",
        desc: "Enterprise-grade digital retail suite featuring interactive dynamic product carousels, responsive catalog filtering, flash-sale countdown timers, and client-side persistent cart architecture.",
        tags: ["E-Commerce Engine", "Dynamic Carousels", "Client State Mgmt", "CSS Grid", "Clean JS"],
        specs: {
            modules: "12 Sections",
            perf: "99%",
            latency: "< 16ms"
        }
    },
    {
        id: "fashion-storefront",
        title: "Vogue & Trend Fashion Boutique",
        category: "ecommerce",
        folder: "Fashan web project",
        desc: "Editorial high-fashion apparel platform designed with mobile-first aesthetics, lookbook showcases, instant quick-add workflows, and fluid responsive grid layouts.",
        tags: ["Fashion Retail", "Responsive Showcase", "CSS Transitions", "Fluid Viewports"],
        specs: {
            modules: "Lookbooks",
            perf: "100%",
            latency: "< 14ms"
        }
    },
    {
        id: "nexa-saas-agency",
        title: "Nexa SaaS Cloud & Agency Platform",
        category: "saas",
        folder: "Nexa web Project",
        desc: "High-velocity B2B SaaS landing architecture featuring futuristic dark-mode aesthetics, feature matrices, interactive service highlights, and conversion funnel optimization.",
        tags: ["SaaS Platform", "B2B Funnels", "High Conversion", "Dark UI", "Performance"],
        specs: {
            modules: "Enterprise",
            perf: "99.8%",
            latency: "< 12ms"
        }
    },
    {
        id: "restaurant-management",
        title: "Gourmet Bistro & Table Reservation",
        category: "hospitality",
        folder: "Resturant web project",
        desc: "Full-service hospitality web application with interactive chef menus, category-filtered dining options, table booking UX, and rich multimedia presentation.",
        tags: ["Hospitality", "Interactive Menu", "Booking Workflow", "Clean Typography"],
        specs: {
            modules: "Menu Engine",
            perf: "98.5%",
            latency: "< 18ms"
        }
    },
    {
        id: "personal-portfolio",
        title: "Full-Stack Developer Sandbox & Lab",
        category: "portfolio",
        folder: "My Portfolio",
        desc: "Signature personal engineering portfolio demonstrating core full-stack proficiencies, client deliverables, interactive project galleries, and verified technical capabilities.",
        tags: ["Personal Brand", "Glassmorphic UI", "Core Web Vitals", "Production Ready"],
        specs: {
            modules: "Core Showcase",
            perf: "100%",
            latency: "< 10ms"
        }
    }
];

/* =========================================
   DOM NODES & INITIALIZATION
========================================= */

const projectsGrid = document.getElementById("projects-grid");
const filterPills = document.querySelectorAll(".pill-btn");
const searchInput = document.getElementById("project-search-input");
const toastContainer = document.getElementById("toast-container");

// Sandbox Modal Elements
const sandboxModal = document.getElementById("sandbox-modal");
const sandboxFrame = document.getElementById("sandbox-frame");
const sandboxOverlay = document.getElementById("sandbox-overlay");
const sandboxIframe = document.getElementById("sandbox-iframe");
const iframeSkeleton = document.getElementById("iframe-skeleton");
const viewportStage = document.getElementById("viewport-stage");
const chromeUrlText = document.getElementById("chrome-url-text");
const chromeExternalLink = document.getElementById("chrome-external-link");
const modalClose = document.getElementById("modal-close");
const modalReload = document.getElementById("modal-reload");
const modalFullscreen = document.getElementById("modal-fullscreen");
const viewportBtns = document.querySelectorAll(".viewport-btn");
const copyUrlBtn = document.getElementById("copy-url-btn");
const dimensionIndicator = document.getElementById("dimension-indicator");

let activeFilter = "all";
let searchFilter = "";
let currentOpenUrl = "";

/* =========================================
   RENDER FUNCTION
========================================= */

function renderProjects(data) {
    projectsGrid.innerHTML = "";

    if (data.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-tertiary);">
                <i class="fa-solid fa-folder-open" style="font-size: 40px; margin-bottom: 16px; color: var(--primary-indigo); display: block;"></i>
                <h3 style="color: #fff; margin-bottom: 6px;">No Architecture Match Found</h3>
                <p style="font-size: 13px;">Try adjusting your query or reset the filter pill.</p>
            </div>
        `;
        return;
    }

    data.forEach((proj) => {
        // Safe relative path encoding for web servers
        const projectHref = encodeURI(`./${proj.folder}/index.html`);

        const card = document.createElement("article");
        card.className = "project-card";
        card.innerHTML = `
            <div>
                <div class="card-meta-top">
                    <span class="badge-category">${proj.category}</span>
                    <span class="badge-status">
                        <span class="badge-status-dot"></span>
                        LIVE INSTANCE
                    </span>
                </div>

                <h3 class="card-title">${proj.title}</h3>
                <p class="card-desc">${proj.desc}</p>

                <!-- Specs Micro-HUD -->
                <div class="card-specs">
                    <div class="spec-box">
                        <span class="spec-val">${proj.specs.modules}</span>
                        <span class="spec-lbl">Architecture</span>
                    </div>
                    <div class="spec-box">
                        <span class="spec-val">${proj.specs.perf}</span>
                        <span class="spec-lbl">Lighthouse</span>
                    </div>
                    <div class="spec-box">
                        <span class="spec-val">${proj.specs.latency}</span>
                        <span class="spec-lbl">Latency</span>
                    </div>
                </div>

                <!-- Tech Pills -->
                <div class="card-tags">
                    ${proj.tags.map(tag => `<span class="tech-pill">${tag}</span>`).join("")}
                </div>
            </div>

            <!-- Actions -->
            <div class="card-cta-group">
                <button class="btn-action btn-preview" data-url="${projectHref}" data-title="${proj.title}">
                    <i class="fa-solid fa-circle-play"></i> Live Sandbox
                </button>
                <a href="${projectHref}" target="_blank" class="btn-action btn-external">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Launch
                </a>
            </div>
        `;

        projectsGrid.appendChild(card);
    });

    bindPreviewEvents();
}

/* =========================================
   SEARCH & FILTER LOGIC
========================================= */

function applyFilters() {
    const filtered = projectsData.filter((item) => {
        const matchesFilter = activeFilter === "all" || item.category === activeFilter;
        const q = searchFilter.toLowerCase();
        const matchesQuery = 
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.tags.some(tag => tag.toLowerCase().includes(q));

        return matchesFilter && matchesQuery;
    });

    renderProjects(filtered);
}

filterPills.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterPills.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        applyFilters();
    });
});

searchInput.addEventListener("input", (e) => {
    searchFilter = e.target.value.trim();
    applyFilters();
});

// Quick keyboard search shortcut (press "/" to focus search)
document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
});

/* =========================================
   SANDBOX LIVE PREVIEW CONTROLLER
========================================= */

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function openSandbox(url, title) {
    currentOpenUrl = url;
    iframeSkeleton.classList.remove("is-hidden");
    
    // Set source and simulated address
    sandboxIframe.src = url;
    const cleanAddress = url.replace("./", "").replace("/index.html", "");
    chromeUrlText.textContent = `https://nexus-core.internal/${cleanAddress}`;
    chromeExternalLink.href = url;

    // Reveal modal
    sandboxModal.classList.add("is-active");
    sandboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Stop loader when iframe ready
    sandboxIframe.onload = () => {
        setTimeout(() => {
            iframeSkeleton.classList.add("is-hidden");
        }, 250);
    };
}

function closeSandbox() {
    sandboxModal.classList.remove("is-active");
    sandboxModal.setAttribute("aria-hidden", "true");
    sandboxIframe.src = "";
    sandboxFrame.classList.remove("is-fullscreen");
    document.body.style.overflow = "";
}

function bindPreviewEvents() {
    document.querySelectorAll(".btn-preview").forEach((btn) => {
        btn.addEventListener("click", () => {
            const url = btn.getAttribute("data-url");
            const title = btn.getAttribute("data-title");
            openSandbox(url, title);
        });
    });
}

/* =========================================
   DEVICE SWITCHER & CHROME ACTIONS
========================================= */

viewportBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        viewportBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const size = btn.dataset.size;
        viewportStage.className = "viewport-stage"; // Reset

        if (size === "desktop") {
            dimensionIndicator.textContent = "Viewport: Fluid Desktop (100%)";
        } else if (size === "laptop") {
            viewportStage.classList.add("is-laptop");
            dimensionIndicator.textContent = "Viewport: Laptop HD (1024 x 768)";
        } else if (size === "tablet") {
            viewportStage.classList.add("is-tablet");
            dimensionIndicator.textContent = "Viewport: iPad Air (768 x 1024)";
        } else if (size === "mobile") {
            viewportStage.classList.add("is-mobile");
            dimensionIndicator.textContent = "Viewport: iPhone Pro (390 x 844)";
        }
    });
});

// Reload Sandbox
modalReload.addEventListener("click", () => {
    if (sandboxIframe.src) {
        iframeSkeleton.classList.remove("is-hidden");
        sandboxIframe.src = sandboxIframe.src;
        showToast("Sandbox reloaded");
    }
});

// Fullscreen Toggle
modalFullscreen.addEventListener("click", () => {
    sandboxFrame.classList.toggle("is-fullscreen");
    showToast(sandboxFrame.classList.contains("is-fullscreen") ? "Fullscreen Mode Active" : "Default Mode Restored");
});

// Copy URL
copyUrlBtn.addEventListener("click", () => {
    if (currentOpenUrl) {
        const fullPath = new URL(currentOpenUrl, window.location.href).href;
        navigator.clipboard.writeText(fullPath).then(() => {
            showToast("Direct Sandbox URL copied to clipboard");
        });
    }
});

// Modal Close Listeners
modalClose.addEventListener("click", closeSandbox);
sandboxOverlay.addEventListener("click", closeSandbox);

// Hotkeys Management
document.addEventListener("keydown", (e) => {
    if (!sandboxModal.classList.contains("is-active")) return;

    if (e.key === "Escape") {
        closeSandbox();
    } else if (e.key === "1") {
        document.querySelector('[data-size="desktop"]').click();
    } else if (e.key === "2") {
        document.querySelector('[data-size="laptop"]').click();
    } else if (e.key === "3") {
        document.querySelector('[data-size="tablet"]').click();
    } else if (e.key === "4") {
        document.querySelector('[data-size="mobile"]').click();
    } else if (e.key.toLowerCase() === "f") {
        modalFullscreen.click();
    }
});

// Boot the ecosystem
renderProjects(projectsData);