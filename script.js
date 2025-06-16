document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Анимация гамбургера
        if (this.classList.contains('active')) {
            this.querySelector('.menu-bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.querySelector('.menu-bar:nth-child(2)').style.opacity = '0';
            this.querySelector('.menu-bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.querySelectorAll('.menu-bar').forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    });
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем меню после клика (на мобильных)
                if (navList.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
    
    // Анимация цифр статистики
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-section');
    
    function checkStatsVisibility() {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75) && 
                         (rect.bottom >= window.innerHeight * 0.25);
        
        if (isVisible && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-count'));
                animateValue(num, 0, target, 2000);
            });
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // Проверить при загрузке
    
    const reviews = document.querySelectorAll('.review-item');
    let currentReview = 0;
    let reviewInterval;
    
    function showReview(index) {
        // Скрываем все отзывы
        reviews.forEach(review => {
            review.style.opacity = '0';
            review.style.visibility = 'hidden';
            review.classList.remove('active');
        });
        
        // Показываем текущий отзыв с анимацией
        reviews[index].style.visibility = 'visible';
        reviews[index].style.opacity = '1';
        reviews[index].classList.add('active');
    }
    
    function nextReview() {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }
    
    function startReviewSlider() {
        // Останавливаем предыдущий интервал, если он был
        if (reviewInterval) {
            clearInterval(reviewInterval);
        }
        
        // Запускаем новый интервал
        reviewInterval = setInterval(nextReview, 5000);
    }
    
    // Инициализация слайдера
    if (reviews.length > 0) {
        // Показываем первый отзыв
        showReview(currentReview);
        
        // Запускаем автоматическое переключение
        startReviewSlider();
        
        // Останавливаем при наведении, возобновляем при уходе
        const reviewContainer = document.querySelector('.review-slider');
        if (reviewContainer) {
            reviewContainer.addEventListener('mouseenter', () => {
                clearInterval(reviewInterval);
            });
            
            reviewContainer.addEventListener('mouseleave', () => {
                startReviewSlider();
            });
        }
    }
    
    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить AJAX-отправку формы
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    // Параллакс-эффект для герой-секции
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        // Эффект появления элементов при скролле
        document.querySelectorAll('.feature-card, .service-card').forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            if (cardPosition < window.innerHeight * 0.75) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Инициализация анимации карточек
    document.querySelectorAll('.feature-card, .service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимации после загрузки
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
});