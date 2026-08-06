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
