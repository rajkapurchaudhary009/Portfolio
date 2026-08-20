/* =========================================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SMOOTH SCROLLING
    ===================================================== */

    const navLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navLinks.forEach(link => {
        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       2. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            '.navbar nav a[href^="#"]'
        );


    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .project, .skill-card, .process-item"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       5. MOUSE GLOW
    ===================================================== */

    const mouseGlow =
        document.createElement("div");

    mouseGlow.className =
        "mouse-glow";

    document.body.appendChild(
        mouseGlow
    );


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;

            mouseY = event.clientY;

        }
    );


    const animateGlow = () => {

        glowX +=
            (mouseX - glowX) * 0.08;

        glowY +=
            (mouseY - glowY) * 0.08;


        mouseGlow.style.transform =
            `translate3d(
                ${glowX}px,
                ${glowY}px,
                0
            )`;


        requestAnimationFrame(
            animateGlow
        );

    };


    animateGlow();


    /* =====================================================
       6. PROJECT CARD TILT
    ===================================================== */

    const projectVisuals =
        document.querySelectorAll(
            ".project-visual"
        );


    projectVisuals.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       7. SKILL CARD GLOW
    ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );


    skillCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });


    /* =====================================================
       8. TYPEWRITER EFFECT
    ===================================================== */

    const eyebrow =
        document.querySelector(".eyebrow");


    if (eyebrow) {

        const originalText =
            eyebrow.textContent.trim();

        eyebrow.textContent = "";

        let index = 0;


        const typeText = () => {

            if (
                index <
                originalText.length
            ) {

                eyebrow.textContent +=
                    originalText.charAt(index);

                index++;

                setTimeout(
                    typeText,
                    35
                );

            }

        };


        setTimeout(
            typeText,
            700
        );

    }


    /* =====================================================
       9. PROJECT LINK INTERACTION
    ===================================================== */

    const projectLinks =
        document.querySelectorAll(
            ".project-link"
        );


    projectLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                    alert(
                        "Project details will be available soon."
                    );

                }

            }
        );

    });


    /* =====================================================
       10. EMAIL COPY BUTTON
    ===================================================== */

    const email =
        document.querySelector(".email");


    if (email) {

        email.addEventListener(
            "click",
            async event => {

                const emailAddress =
                    email.textContent
                        .replace("↗", "")
                        .trim();


                if (
                    navigator.clipboard
                ) {

                    try {

                        await navigator.clipboard.writeText(
                            emailAddress
                        );

                        const original =
                            email.innerHTML;

                        email.innerHTML =
                            "Email copied! ✓";


                        setTimeout(() => {

                            email.innerHTML =
                                original;

                        }, 1800);

                    } catch (error) {

                        console.log(
                            "Copy failed"
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       11. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            'footer a[href="#"]'
        );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       12. REDUCE ANIMATION FOR ACCESSIBILITY
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reducedMotion.matches
    ) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }


    /* =====================================================
       13. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});