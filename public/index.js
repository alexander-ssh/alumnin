const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentScroll = 0;
const slideWidth = document.querySelector('.slide').offsetWidth + 30;

nextButton.addEventListener('click', () => {
    if (window.innerWidth < 500) {
        currentScroll += window.innerWidth - 60;

    } else {
        currentScroll += slideWidth;
    }
    slider.scrollTo({ left: currentScroll, behavior: 'smooth' });
});

prevButton.addEventListener('click', () => {
    currentScroll = Math.max(0, currentScroll - slideWidth);
    slider.scrollTo({ left: currentScroll, behavior: 'smooth' });
});

const expansionPanels = document.querySelectorAll('.expansionPanel')

expansionPanels.forEach(panel => panel.addEventListener('click', function(e) {
    this.classList.toggle('opened')
    const p = this.querySelector('p')
    p.classList.toggle('shown')
}))

const scrollIndicator = document.querySelector('.scroll-progress');
const sliderContainer = document.querySelector('.slider');


function updateScrollIndicator() {
    const scrollLeft = sliderContainer.scrollLeft;
    const maxScrollLeft = sliderContainer.scrollWidth - sliderContainer.clientWidth;


    const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;
    const indicatorWidth = (scrollPercentage / 100) * 400;
    scrollIndicator.style.width = `${indicatorWidth}px`;
}


// Обновляем индикатор при скролле вручную и при нажатии на кнопки
sliderContainer.addEventListener('scroll', updateScrollIndicator);
nextButton.addEventListener('click', () => {
    setTimeout(updateScrollIndicator, 300); // Даем время анимации завершиться
});
prevButton.addEventListener('click', () => {
    setTimeout(updateScrollIndicator, 300);
});

// Инициализируем индикатор при загрузке
updateScrollIndicator();

document.querySelectorAll('.benefit').forEach(benefit => {

    benefit.addEventListener('click', function(e) {
        if (this.classList.contains('active')) {
            this.classList.remove('active')
        } else {

            document.querySelectorAll('.benefit').forEach(benefit => { benefit.classList.remove('active') })
            this.classList.toggle('active')
        }
    })

})

// Добавить в index.js
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');

burger.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileNav.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
    }
});

// Добавить в конец файла
document.querySelectorAll('#nav div, .mobile-nav div').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.dataset.section;
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Закрываем мобильное меню после клика
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    });
});