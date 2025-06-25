const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

// Toggle menu on hamburger click
menuToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInsideMenu = navList.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    navList.classList.remove('show');
  }
});




// DOM references
const fold1 = document.querySelector('.fold1');
const fold2 = document.querySelector('.fold2');
const mover = document.querySelector('.mover');
const folds = document.querySelector('.folds');
const shadows = document.querySelectorAll('.shadow');

// Handle prefixed transform
const transform =
  'transform' in document.body.style
    ? 'transform'
    : 'webkitTransform' in document.body.style
    ? 'webkitTransform'
    : 'mozTransform';

// States
let percent = 1; // initially open
let isOpen = true;
let foldHeight = fold2.offsetHeight;

// Easing function
function ease(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}

// Fold update
function fold(pct) {
  fold1.style[transform] = `rotate3d(1,0,0,${pct * -90}deg)`;
  fold2.style[transform] = `rotate3d(1,0,0,${pct * 180}deg)`;
  shadows[0].style.opacity = pct * 0.6;
  shadows[1].style.opacity = pct * 0.6;

  const visualFoldHeight = Math.cos(pct * Math.PI / 2) * foldHeight;
  folds.style.perspectiveOrigin = `50% ${visualFoldHeight}px`;

  mover.style[transform] = `translate3d(0,${Math.floor((visualFoldHeight - foldHeight) * 2)}px,0)`;
}

// Animation
function animate(from, to, duration) {
  const start = Date.now();
  function step() {
    const now = Date.now();
    const progress = now - start;
    const eased = ease(progress, from, to - from, duration);

    if (progress < duration) {
      fold(eased);
      percent = eased;
      requestAnimationFrame(step);
    } else {
      fold(to);
      percent = to;
      isOpen = to === 1;
    }
  }
  step();
}

// Toggle
function toggleFold() {
  animate(percent, isOpen ? 0 : 1, 500);
}

// Attach click to all relevant parts
[mover, fold1, fold2].forEach(el => {
  el.addEventListener('click', toggleFold);
});

// Init: start open
fold(1);

const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.vinyl-record, .reveal-up');
        animatedElements.forEach(el => observer.observe(el));
        
        // Add parallax effect to floating notes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const notes = document.querySelectorAll('.note');
            
            notes.forEach((note, index) => {
                const speed = (index + 1) * 0.1;
                const yPos = -(scrolled * speed);
                note.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
            });
        });
        
        // Add hover sound effect simulation
        document.querySelectorAll('.record-disc').forEach(disc => {
            disc.addEventListener('mouseenter', () => {
                disc.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.6), inset 0 0 30px rgba(255,255,255,0.2)';
            });
            
            disc.addEventListener('mouseleave', () => {
                disc.style.boxShadow = '0 0 30px rgba(0,0,0,0.8), inset 0 0 30px rgba(255,255,255,0.1)';
            });
        });
        
        // Typewriter effect for the main title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }
        
        // Initialize typewriter effect when page loads
        window.addEventListener('load', () => {
            const titleElement = document.querySelector('.main-title');
            const originalText = titleElement.textContent;
            setTimeout(() => {
                typeWriter(titleElement, originalText, 150);
            }, 500);
        });
