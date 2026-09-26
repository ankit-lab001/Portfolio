// ============================================================
// ANKIT KUMAR SINGH — CINEMATIC PORTFOLIO SCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ================= PAGE LOADER =================
    const pageLoader = document.getElementById("page-loader");

    if (pageLoader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                pageLoader.classList.add("loaded");
                setTimeout(function () {
                    document.body.classList.add("cine-open");
                }, 350);
            }, 500);
        });
    }

    // ================= MOBILE MENU =================
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });

        const links = navLinks.querySelectorAll("a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
            });
        });
    }

    // ================= SMOOTH SCROLL =================
    const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    allNavLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                const navbar = document.querySelector(".navbar");
                const navbarHeight = navbar ? navbar.offsetHeight + 20 : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ================= PARTICLES =================
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
        const particleCount = window.innerWidth <= 768 ? 20 : 45;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("span");
            particle.className = "particle";
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 12 + 8;
            const delay = Math.random() * 8;

            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.left = left + "%";
            particle.style.top = top + "%";
            particle.style.animationDuration = duration + "s";
            particle.style.animationDelay = "-" + delay + "s";

            particlesContainer.appendChild(particle);
        }
    }

    // ================= CURSOR GLOW =================
    const cursorGlow = document.querySelector(".cursor-glow");
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (cursorGlow && supportsHover && !reducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        document.addEventListener("mousemove", function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            document.body.classList.add("cursor-active");
        });

        function animateCursor() {
            currentX += (mouseX - currentX) * 0.12;
            currentY += (mouseY - currentY) * 0.12;
            cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.addEventListener("mouseleave", function () {
            document.body.classList.remove("cursor-active");
        });
    } else if (cursorGlow) {
        cursorGlow.style.display = "none";
    }

    // ================= SCROLL REVEAL =================
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length) {
        if (reducedMotion || !("IntersectionObserver" in window)) {
            revealElements.forEach(function (element) {
                element.classList.add("visible");
            });
        } else {
            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            });

            revealElements.forEach(function (element) {
                revealObserver.observe(element);
            });
        }
    }

    // ================= TYPING EFFECT =================
    const typingText = document.getElementById("typing-text");
    if (typingText && !reducedMotion) {
        const roles = [
            "BCA Student & Technology Enthusiast",
            "Java Developer",
            "Web Developer",
            "Vibe Coding Enthusiast"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];
            if (!deleting) {
                typingText.textContent = currentRole.substring(0, characterIndex + 1);
                characterIndex++;
                if (characterIndex === currentRole.length) {
                    deleting = true;
                    setTimeout(typeRole, 1800);
                    return;
                }
            } else {
                typingText.textContent = currentRole.substring(0, characterIndex - 1);
                characterIndex--;
                if (characterIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }
            setTimeout(typeRole, deleting ? 45 : 75);
        }
        typeRole();
    } else if (typingText) {
        typingText.textContent = "BCA Student & Technology Enthusiast";
    }

    // ================= 3D CARD TILT =================
    const tiltCards = document.querySelectorAll(".tilt-card");
    if (tiltCards.length && supportsHover && !reducedMotion) {
        tiltCards.forEach(function (card) {
            card.addEventListener("mousemove", function (event) {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "";
            });
        });
    }

    // ================= MAGNETIC BUTTONS =================
    const magneticElements = document.querySelectorAll(".magnetic");
    if (magneticElements.length && supportsHover && !reducedMotion) {
        magneticElements.forEach(function (element) {
            element.addEventListener("mousemove", function (event) {
                const rect = element.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;
                const strength = 0.15;
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            element.addEventListener("mouseleave", function () {
                element.style.transform = "";
            });
        });
    }

    // ================= ACTIVE NAVIGATION =================
    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length && navigationLinks.length && "IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navigationLinks.forEach(function (link) {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === "#" + id) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }, {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    // ================= CINEMATIC SCENE SWITCHER =================
    const sceneVideos = document.querySelectorAll(".scene-video");
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    const allowVideoScenes = sceneVideos.length && !reducedMotion && !saveData && window.innerWidth > 700;

    if (allowVideoScenes) {
        const sceneMap = {
            home: 1,
            about: 1,
            skills: 1,
            projects: 2,
            achievements: 2,
            education: 3,
            contact: 3
        };

        let activeScene = null;
        function activateScene(sceneNumber) {
            if (sceneNumber === activeScene) return;
            activeScene = sceneNumber;

            sceneVideos.forEach(function (video) {
                const isTarget = Number(video.dataset.scene) === sceneNumber;
                if (isTarget) {
                    const source = video.querySelector("source");
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        video.load();
                        delete source.dataset.src;
                    }
                    video.classList.add("is-active");
                    const playPromise = video.play();
                    if (playPromise && playPromise.catch) {
                        playPromise.catch(function () {});
                    }
                } else {
                    video.classList.remove("is-active");
                    video.pause();
                }
            });
        }

        const sceneObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const scene = sceneMap[entry.target.id];
                    if (scene) activateScene(scene);
                }
            });
        }, {
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0
        });

        document.querySelectorAll("section[id]").forEach(function (section) {
            sceneObserver.observe(section);
        });
    }

    // ================= HERO PARALLAX =================
    const hero = document.querySelector(".hero");
    if (hero && supportsHover && !reducedMotion) {
        const heroContent = hero.querySelector(".hero-content");
        const profileVisual = hero.querySelector(".profile-wrapper");

        document.addEventListener("mousemove", function (event) {
            const x = (event.clientX / window.innerWidth) - 0.5;
            const y = (event.clientY / window.innerHeight) - 0.5;

            if (heroContent) {
                heroContent.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`;
            }
            if (profileVisual) {
                profileVisual.style.transform = `translate3d(${x * 12}px, ${y * 10}px, 0)`;
            }
        });
    }

    // ================= SCROLL INDICATOR =================
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", function () {
            const about = document.getElementById("about");
            if (about) {
                about.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    window.addEventListener("load", function () {
        console.log("%cWelcome to Ankit's Portfolio! 🚀", "font-size: 16px; font-weight: bold; color: #00f2fe;");
    });
});