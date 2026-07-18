import './style.css';

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// Fetch and display view count
let shouldFetch = true;
try {
  const cachedCount = sessionStorage.getItem('viewCount');
  if (cachedCount) {
    const viewCountElement = document.getElementById("view-count");
    if (viewCountElement) {
      viewCountElement.textContent = cachedCount;
    }
    shouldFetch = false; // Already have the count, no need to fetch
  }
} catch (e) {
  // Ignore sessionStorage errors (e.g. private mode, webviews)
}

if (shouldFetch) {
  fetch("https://abacus.jasoncameron.dev/hit/kylorrr.github.io/index")
    .then(response => response.json())
    .then(data => {
      const viewCountElement = document.getElementById("view-count");
      if (viewCountElement && data.value) {
        const countStr = data.value.toLocaleString();
        viewCountElement.textContent = countStr;
        try {
          sessionStorage.setItem('viewCount', countStr);
        } catch (e) {} // Ignore
      }
    })
    .catch(error => {
      console.error("Error fetching view count:", error);
      // Nascondi il badge se l'API viene bloccata (es. da Brave Shields o AdBlock)
      const container = document.querySelector(".view-count-container");
      if (container) {
        container.style.display = "none";
      }
    });
}

