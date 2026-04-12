// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ===== FILTER CATALOG =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ===== MODAL =====
const overlay = document.getElementById('modalOverlay');
const modal   = document.getElementById('modal');
let selectedSize = '';

function openModal(card) {
  const name  = card.dataset.name;
  const price = card.dataset.price;
  const desc  = card.dataset.desc;
  const sizes = card.dataset.sizes.split(',');
  const cat   = card.dataset.category;
  const color = card.dataset.color || '#C8966A';

  // Get the background from product-img
  const imgDiv = card.querySelector('.product-img');
  const bg = imgDiv ? imgDiv.style.background : `linear-gradient(135deg, ${color}, #4a2c1a)`;

  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalDesc').textContent  = desc;
  document.getElementById('modalCat').textContent   = cat.charAt(0).toUpperCase() + cat.slice(1);

  const modalImg = document.getElementById('modalImg');
  modalImg.style.background = bg;
  modalImg.innerHTML = `<i class="fa-solid ${cat === 'vestidos' ? 'fa-person-dress' : cat === 'conjuntos' ? 'fa-clothes-hanger' : 'fa-shirt'}"></i>`;

  // Sizes
  selectedSize = '';
  const sizesContainer = document.getElementById('modalSizes');
  sizesContainer.innerHTML = '';
  sizes.forEach(s => {
    const chip = document.createElement('button');
    chip.className = 'size-chip';
    chip.textContent = s.trim();
    chip.addEventListener('click', () => {
      document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedSize = s.trim();
      updateOrderLink(name, price, selectedSize);
    });
    sizesContainer.appendChild(chip);
  });

  // WhatsApp link
  updateOrderLink(name, price, '');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateOrderLink(name, price, size) {
  const sizeText = size ? `Talla: ${size}` : 'Sin talla seleccionada aún';
  const msg = encodeURIComponent(`Hola Pinna! Me interesa:\n👗 ${name}\n💰 ${price}\n📏 ${sizeText}\n\n¿Tienen disponibilidad?`);
  const phone = '573015086774'; // ← Cambia por tu número real
  document.getElementById('btnOrder').href = `https://wa.me/3015086774?text=${msg}`;
}

function closeModal(e) {
  if (e.target === overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalBtn() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});


// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = '0 4px 24px rgba(74,44,26,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


// ===== ANIMATE CARDS ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

productCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, box-shadow 0.3s ease`;
  observer.observe(card);
});