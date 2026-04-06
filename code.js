const abrirMenu = document.querySelector('.abrir--menu');
const menu = document.querySelector('.menu');
const cerrarMenu =document.querySelectorAll('.a_menu');

const body = document.body;
const toggle = document.getElementById('dark_mode');
const iconoSol = document.querySelector('.icono--sol');

const sliderContainer = document.querySelector('.testimonios_clientes');
const sliderBox = document.querySelectorAll('.testimonio_cliente');
const dotsContainer =document.querySelector('.dots-container');

const form = document.querySelector('.form')

const elemenntoObserver =document.querySelectorAll('.observame');

toggle.addEventListener('change', () => {
    body.classList.toggle('dark', toggle.checked);
    
    iconoSol.classList.toggle('fa-sun');
    iconoSol.classList.toggle('fa-moon');
});

abrirMenu.addEventListener('click', () => {
    if (!menu.open) {
        menu.showModal();
    } else {
        menu.close();
    }
        abrirMenu.classList.toggle('fa-bars');
        abrirMenu.classList.toggle('fa-xmark');


});

menu.addEventListener('click', e => {
    if (e.target=== menu) {
        menu.close();
    }
    abrirMenu.classList.remove('fa-xmark');
    abrirMenu.classList.add('fa-bars');
})

cerrarMenu.forEach(cerrando => {
    cerrando.addEventListener('click', () => {
        menu.close();
    })
})

let currentIndex = 0;
let interval;
let indice = 0;


sliderBox.forEach((_,index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);

    if (index === 0) {
        dot.classList.add('activa');
    }

    dot.setAttribute('data-index', index);
    dot.addEventListener('click', () => {
        goToSlide(index);
    })
});

function updateSlider() {
    const slideWidth = sliderBox[0].offsetWidth + 41.5;
    sliderContainer.style.transform = `translateX(${-currentIndex*slideWidth}px)`;
    updateDots();
}

function nextSlider() {
    currentIndex = (currentIndex - 1 + sliderBox.length)% sliderBox.length;
    updateSlider();
}

function prevSlider() {
    currentIndex = (currentIndex + 1 )% sliderBox.length;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function updateDots () {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('activa', index === currentIndex);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Los datos se enviaron correctamente ✅");
    form.submit();
});


const observer = new IntersectionObserver((entries,ob) => {
    entries.forEach(entry => {
        console.log('entro', entry.target)
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            ob.unobserve(entry.target);
        }
    });
}, {
    threshold:0.2
});


elemenntoObserver.forEach(el => observer.observe(el));