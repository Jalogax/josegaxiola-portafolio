document.addEventListener("DOMContentLoaded", function () {
    // INICIA  EFECTO MOUSE //
    document.addEventListener("mousemove", (event) => {
        let x = (event.clientX / window.innerWidth) * 100;
        let y = (event.clientY / window.innerHeight) * 100;

        // Invertimos la dirección para que siga el cursor
        document.body.style.backgroundPosition = `${100 - x}% ${100 - y}%`;
    });

    // window.onload = function() {
    //     // Establece el scroll al inicio de la página (coordenada Y = 0)
    //     window.scrollTo(0, 0);
    // };

    // TERMINA EFECTO MOUSE //

    // INICIA SCROLL LENTO //
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento por defecto

            const targetId = this.getAttribute('href'); // Obtiene el id de la sección
            const targetSection = document.querySelector(targetId); // Selecciona la sección

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Desplazamiento suave
                    block: 'start'      // Alinea la sección al inicio de la ventana
                });
            }
        });
    });

    function smoothScroll(target, duration) {
        const targetSection = document.querySelector(target);
        const targetPosition = targetSection.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1500); // 1000ms = 1 segundo de duración
        });
    });


    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section'); // Selecciona todas las secciones
        console.log(sections);
        const navLinks = document.querySelectorAll('nav ul li a'); // Selecciona todos los enlaces del menú
        console.log(navLinks);
        let currentSection = '';

        // Recorre las secciones para ver cuál está visible
        sections.forEach(section => {
            console.log(section);
            const sectionTop = section.offsetTop; // Posición superior de la sección
            const sectionHeight = section.clientHeight; // Altura de la sección
            const scrollPosition = window.pageYOffset; // Posición actual del scroll

            // Verifica si la sección está visible en la pantalla
            if (scrollPosition >= sectionTop - sectionHeight * 0.25 && // 25% de la sección visible
                scrollPosition < sectionTop + sectionHeight - sectionHeight * 0.25) {
                currentSection = section.getAttribute('id'); // Obtiene el id de la sección visible
            }
        });

        // Recorre los enlaces del menú y aplica la clase 'active' al correspondiente
        navLinks.forEach(link => {
            link.classList.remove('active'); // Remueve la clase 'active' de todos los enlaces
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active'); // Aplica la clase 'active' al enlace correspondiente
            }

            console.log(link);
        });
    });

    // Ejecuta la función de detección de sección visible al cargar la página
    document.dispatchEvent(new Event('scroll'));

    // TERMINA SCROLL LENTO //

    //INICIA CONFIGURACION IDIOMAS //
    let translations = {};

    // Cargar archivo JSON de traducciones
    fetch("src/translations.json")
        .then(response => response.json())
        .then(data => {
            translations = data;
            setLanguage("en"); // Idioma por defecto
        });

    // Cambiar idioma según selección

    document.getElementById("selector-idioma").addEventListener("change", function(event) {
        setLanguage(event.target.value);
    });
    function setLanguage(lang) {
        document.getElementById("titulo").innerText = translations[lang].titulo;
        document.getElementById("profesion").innerText = translations[lang].profesion;
        document.getElementById("idioma-ingles").innerText = translations[lang].idioma_ingles;
        document.getElementById("idioma-espaniol").innerText = translations[lang].idioma_espaniol;
        document.getElementById("menu-sobremi").innerText = translations[lang].menu_sobre_mi;
        document.getElementById("menu-experiencia").innerText = translations[lang].menu_experiencia;
        document.getElementById("menu-proyectos").innerText = translations[lang].menu_proyectos;
        document.getElementById("sobremi-titulo").innerText = translations[lang].sobremi_titulo;
        document.getElementById("sobremi-contenido-1").innerHTML = translations[lang].sobremi_contenido_1;
        document.getElementById("sobremi-contenido-2").innerHTML = translations[lang].sobremi_contenido_2;
        document.getElementById("sobremi-contenido-3").innerHTML = translations[lang].sobremi_contenido_3;
        document.getElementById("sobremi-contenido-4").innerHTML = translations[lang].sobremi_contenido_4;
        document.getElementById("sobremi-contenido-5").innerHTML = translations[lang].sobremi_contenido_5;
        document.getElementById("experiencia-titulo").innerText = translations[lang].experiencia_titulo;

        translations[lang].experiencia.forEach((exp, index) => {
            document.getElementById(`experiencia-fecha-${index}`).innerText = exp.fecha;
            document.getElementById(`experiencia-puesto-${index}`).innerText = exp.puesto;
            document.getElementById(`experiencia-descripcion-${index}`).innerText = exp.descripcion;
        });

        document.getElementById("proyectos-titulo").innerText = translations[lang].proyectos_titulo;
        translations[lang].proyectos.forEach((proyecto, index) => {
            document.getElementById(`proyecto-nombre-${index}`).innerText = proyecto.nombre;
            document.getElementById(`proyecto-descripcion-${index}`).innerText = proyecto.descripcion;
        });
        document.getElementById("pie-pagina").innerHTML = translations[lang].pie_pagina;
    }

    //TERMINA CONFIGURACION IDIOMAS //

});

