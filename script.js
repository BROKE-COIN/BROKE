/* ==========================================
   $BROKE WEBSITE
   Premium Interactive JavaScript
========================================== */

"use strict";

/* ==========================================
   DOM ELEMENTS
========================================== */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const sections = document.querySelectorAll("section");
const revealElements = document.querySelectorAll(".reveal");
const particlesContainer = document.getElementById("particles");
const logo3D = document.querySelector(".hero-logo");
const statNumbers = document.querySelectorAll(".stat-number");
const roadmapCards = document.querySelectorAll(".phase-card");

/* ==========================================
   MOBILE MENU
========================================== */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

        });

    });

}

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

/* ==========================================
   SMOOTH SCROLLING
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        window.scrollTo({

            top: target.offsetTop - 80,
            behavior: "smooth"

        });

    });

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(el=>{

    revealObserver.observe(el);

});

/* ==========================================
   ACTIVE NAVIGATION LINK
========================================== */

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});
/* ==========================================
   ANIMATED PARTICLE SYSTEM
========================================== */

if (particlesContainer) {

    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        const size = Math.random() * 6 + 2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particle.style.animationDuration = `${15 + Math.random() * 20}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        particlesContainer.appendChild(particle);

    }

}

/* ==========================================
   HERO LOGO PARALLAX
========================================== */

document.addEventListener("mousemove", (e) => {

    if (!logo3D) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    logo3D.style.transform = `
        rotateX(${y}deg)
        rotateY(${-x}deg)
        translateY(-10px)
    `;

});

/* ==========================================
   FLOATING EFFECT
========================================== */

let floatTime = 0;

function animateLogo() {

    if (logo3D) {

        floatTime += 0.02;

        const y = Math.sin(floatTime) * 10;

        logo3D.style.marginTop = `${y}px`;

    }

    requestAnimationFrame(animateLogo);

}

animateLogo();

/* ==========================================
   ROADMAP CARD HOVER GLOW
========================================== */

roadmapCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let value = 0;

        const speed = target / 120;

        const update = () => {

            value += speed;

            if (value < target) {

                counter.textContent = Math.floor(value);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.6

});

statNumbers.forEach(counter => {

    counterObserver.observe(counter);

});

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});
/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ==========================================
   COPY CONTRACT ADDRESS
========================================== */

const copyButton = document.querySelector(".copy-address");
const contractAddress = document.querySelector(".contract-address");

if (copyButton && contractAddress) {

    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                contractAddress.textContent.trim()
            );

            const original = copyButton.innerHTML;

            copyButton.innerHTML =
                '<i class="fa-solid fa-check"></i> Copied';

            copyButton.classList.add("success");

            setTimeout(() => {

                copyButton.innerHTML = original;
                copyButton.classList.remove("success");

            }, 2000);

        } catch {

            alert("Unable to copy address.");

        }

    });

}

/* ==========================================
   LAZY IMAGE FADE-IN
========================================== */

const lazyImages = document.querySelectorAll("img[data-src]");

if (lazyImages.length) {

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.onload = () => {

                img.classList.add("loaded");

            };

            observer.unobserve(img);

        });

    });

    lazyImages.forEach(img => imageObserver.observe(img));

}

/* ==========================================
   SMALL PARALLAX ON HERO
========================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    hero.style.backgroundPositionY =
        `${window.scrollY * 0.3}px`;

});

/* ==========================================
   FPS-OPTIMISED SCROLL
========================================== */

let ticking = false;

function updateOnScroll() {

    ticking = false;

}

window.addEventListener("scroll", () => {

    if (!ticking) {

        requestAnimationFrame(updateOnScroll);

        ticking = true;

    }

});

/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".preloader");

    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(() => {

        loader.remove();

    }, 800);

});

/* ==========================================
   RANDOM ROADMAP GLOW
========================================== */

setInterval(() => {

    if (!roadmapCards.length) return;

    roadmapCards.forEach(card => {

        card.classList.remove("pulse");

    });

    const random =
        roadmapCards[Math.floor(Math.random() * roadmapCards.length)];

    random.classList.add("pulse");

}, 3500);

/* ==========================================
   CONSOLE EASTER EGG
========================================== */

console.log(
`%c
██████╗ ██████╗  ██████╗ ██╗  ██╗███████╗
██╔══██╗██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝
██████╔╝██████╔╝██║   ██║█████╔╝ █████╗
██╔══██╗██╔══██╗██║   ██║██╔═██╗ ██╔══╝
██████╔╝██║  ██║╚██████╔╝██║  ██╗███████╗
╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

WELCOME TO $BROKE INCORPORATED

You inspected the console...
Now you're officially overqualified.

CA: COMING SOON
`,
"color:#00F5FF;font-weight:bold;font-size:12px;"
);

/* ==========================================
   INITIALISE
========================================== */

document.documentElement.classList.add("js-ready");

console.log("✅ $BROKE website loaded successfully.");
/* ==========================================
   $BROKE WEBSITE
   Production JavaScript
   Part 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Navigation
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==========================
       Mobile Menu
    ========================== */

    const menuBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            nav.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");

            if (menuBtn) {
                menuBtn.classList.remove("active");
            }
        });
    });

    /* ==========================
       Smooth Scroll
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });

        });

    });

    /* ==========================
       Reveal Animations
    ========================== */

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {
        threshold: 0.15
    });

    reveals.forEach(section => observer.observe(section));

    /* ==========================
       Counter Animation
    ========================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = target / 80;

            const update = () => {

                current += increment;

                if (current < target) {

                    counter.innerText = Math.floor(current);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target.toLocaleString();

                }

            };

            update();

            counterObserver.unobserve(counter);

        });

    });
/* ==========================================
   PARALLAX EFFECT
========================================== */

window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;

  document.querySelectorAll(".floating-logo").forEach((logo) => {
    logo.style.transform =
      `translate(${x}px, ${y}px) rotate(${Date.now() / 40}deg)`;
  });
});

/* ==========================================
   RANDOM GLOW PULSE
========================================== */

setInterval(() => {
  document.querySelectorAll(".glass").forEach(card => {
    card.style.boxShadow =
      `0 0 ${20 + Math.random() * 40}px rgba(0,255,170,.18)`;
  });
}, 1500);

/* ==========================================
   COPY CONTRACT BUTTON
========================================== */

const copyBtn = document.querySelector(".copy-btn");

if (copyBtn) {

    copyBtn.addEventListener("click", () => {

        const address =
            copyBtn.dataset.address;

        navigator.clipboard.writeText(address);

        const original = copyBtn.innerHTML;

        copyBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied!';

        setTimeout(() => {

            copyBtn.innerHTML = original;

        },2000);

    });

}

/* ==========================================
   LIVE YEAR
========================================== */

const year = document.querySelector("#year");

if(year){

    year.textContent =
        new Date().getFullYear();

}

/* ==========================================
   HERO BUTTON RIPPLE
========================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e){

        const circle =
            document.createElement("span");

        const diameter =
            Math.max(this.clientWidth,this.clientHeight);

        const radius =
            diameter / 2;

        circle.style.width =
            circle.style.height =
            `${diameter}px`;

        circle.style.left =
            `${e.clientX - this.offsetLeft - radius}px`;

        circle.style.top =
            `${e.clientY - this.offsetTop - radius}px`;

        circle.classList.add("ripple");

        const ripple =
            this.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
    counters.forEach(counter => counterObserver.observe(counter));

});
document.documentElement.style.scrollBehavior = "smooth";
const revealElements = document.querySelectorAll(
".hero-content,.about,.tokenomics,.roadmap,.community,.faq,.footer,.glass-card,.phase-card,.token-card"
);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

revealElements.forEach(el=>{
el.classList.add("hidden");
revealObserver.observe(el);
});
