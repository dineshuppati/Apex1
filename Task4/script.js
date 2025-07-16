document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('form-message');

  if (name && email && message) {
    formMessage.innerText = `Thank you for your message, ${name}! I will get back to you soon.`;
    formMessage.style.color = '#28a745';
    document.getElementById('contact-form').reset();
  } else {
    formMessage.innerText = 'Please fill out all fields.';
    formMessage.style.color = '#dc3545';
  }
});

const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.5s ease forwards';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));