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
