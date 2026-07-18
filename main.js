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
const hasVisited = sessionStorage.getItem('visited');
const viewCountUrl = hasVisited 
  ? "https://api.counterapi.dev/v1/kylorrr.github.io/index/" 
  : "https://api.counterapi.dev/v1/kylorrr.github.io/index/up";

if (!hasVisited) {
  sessionStorage.setItem('visited', 'true');
}

fetch(viewCountUrl)
  .then(response => response.json())
  .then(data => {
    const viewCountElement = document.getElementById("view-count");
    if (viewCountElement && data.count) {
      viewCountElement.textContent = data.count.toLocaleString();
    }
  })
  .catch(error => console.error("Error fetching view count:", error));

