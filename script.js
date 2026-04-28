// ===================================================
// ✏️ AQUÍ EDITAS TUS PRODUCTOS - solo toca esta parte
// ===================================================
const productos = [
  {
    nombre: "Croptop dalila",
    categoria: "croptops",
    precio: "$28.000",
    descripcion: "Croptop dalila, una prenda espectacular si te gusta vestirte sencilla pero elegante.",
    tallas: ["Talla única"],
    colores: ["#808080", "#000000", "#1B2A4A"],
    imagen: "img/Croptop dalila.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "Blusa reservada",
    categoria: "blusas",
    precio: "$30.000",
    descripcion: "Blusa reservada, una blusa que combina con todo, y la puedes usar para cualquier ocasión.",
    tallas: ["Talla única"],
    colores: ["#000000", "#1B2A4A", "#4A5E3A", "#87CEEB", "#FFFFFF"],
    imagen: "img/Blusa reservada.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "Body maya",
    categoria: "bodys",
    precio: "$45.000",
    descripcion: "Un body que está a la altura de una chica como tú.",
    tallas: ["Talla única"],
    colores: [],
    imagen: "img/Body.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "Croptop playero",
    categoria: "croptops",
    precio: "$25.000",
    descripcion: "Croptop playero, preciso para un día que quieras salir de tu zona de confort.",
    tallas: ["Talla única"],
    colores: [],
    imagen: "img/Croptop playero.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "Blusa ema",
    categoria: "blusas",
    precio: "$33.000",
    descripcion: "Blusa ema, una blusa super elegante para ocasiones especiales. Enamórate de ella.",
    tallas: ["Talla única"],
    colores: [],
    imagen: "img/Blusa ema.jpeg",
    badge: "Hot"
  },
  {
    nombre: "Body strapless",
    categoria: "bodys",
    precio: "$33.000",
    descripcion: "Body strapless, un body sencillo pero de alta calidad.",
    tallas: ["Talla única"],
    colores: [],
    imagen: "img/Body strapless.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "Blusa Top paris",
    categoria: "blusas",
    precio: "$25.000",
    descripcion: "Blusa top paris, una pieza única para cualquier ocasión.",
    tallas: ["Talla única"],
    colores: ["#FFFFFF"],
    imagen: "img/Blusa top paris.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "Body suzette",
    categoria: "bodys",
    precio: "$32.000",
    descripcion: "",
    tallas: ["Talla única"],
    colores: ["#000000, #4f030c"],
    imagen: "img/body suzeh.jpeg",
    badge: "Nuevo"
  },
  {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    tallas: [""],
    colores: [""],
    imagen: "",
    badge: ""
  },
  {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    tallas: [""],
    colores: [""],
    imagen: "",
    badge: ""
  },
  {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    tallas: [""],
    colores: [""],
    imagen: "",
    badge: ""
  },
  {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    tallas: [""],
    colores: [""],
    imagen: "",
    badge: ""
  },
  {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    tallas: [""],
    colores: [""],
    imagen: "",
    badge: ""
  },
  {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    tallas: [""],
    colores: [""],
    imagen: "",
    badge: ""
  },
]; 
// ===================================================
// NO toques nada debajo de esta línea
// ===================================================


// Generar tarjetas
function renderProductos() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  productos.forEach((p, i) => {
    const imgHTML = p.imagen
      ? `<img src="${p.imagen}" alt="${p.nombre}">`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#e8d5c0,#c9a882);display:flex;align-items:center;justify-content:center"><i class="fa-solid fa-shirt" style="font-size:3rem;color:rgba(255,255,255,0.5)"></i></div>`;

    const badgeHTML = p.badge
      ? `<span class="product-badge">${p.badge}</span>`
      : '';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = p.categoria;
    card.dataset.name = p.nombre;
    card.dataset.price = p.precio;
    card.dataset.desc = p.descripcion;
    card.dataset.sizes = p.tallas.join(',');
    card.dataset.colors = p.colores.join(',');
    card.dataset.imagen = p.imagen;

    card.innerHTML = `
      <div class="product-img">
        ${imgHTML}
        ${badgeHTML}
      </div>
      <div class="product-info">
        <h3>${p.nombre}</h3>
        <p class="product-cat">${p.categoria}</p>
        <div class="product-footer">
          <span class="price">${p.precio}</span>
          <button class="btn-view" onclick="openModal(this.closest('.product-card'))">Ver más</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Re-aplicar animaciones
  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, box-shadow 0.3s ease`;
    observer.observe(card);
  });
}


// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ===== FILTROS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
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
let selectedSize = '';
let selectedColor = '';

function openModal(card) {
  const name   = card.dataset.name;
  const price  = card.dataset.price;
  const desc   = card.dataset.desc;
  const sizes  = card.dataset.sizes.split(',');
  const cat    = card.dataset.category;
  const colors = card.dataset.colors ? card.dataset.colors.split(',') : [];
  const imagen = card.dataset.imagen;

  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalDesc').textContent  = desc;
  document.getElementById('modalCat').textContent   = cat.charAt(0).toUpperCase() + cat.slice(1);

  // Imagen modal
  const modalImg = document.getElementById('modalImg');
  if (imagen) {
    modalImg.style.background = 'none';
    modalImg.innerHTML = `<img src="${imagen}" alt="${name}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
  } else {
    modalImg.style.background = 'linear-gradient(135deg,#e8d5c0,#c9a882)';
    modalImg.innerHTML = `<i class="fa-solid fa-shirt"></i>`;
  }

  // Tallas
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
      updateOrderLink(name, price, selectedSize, selectedColor);
    });
    sizesContainer.appendChild(chip);
  });

  // Limpiar colores anteriores
  const oldColors = document.querySelector('.color-selector');
  if (oldColors) oldColors.remove();

  // Colores
  if (colors.length > 0) {
    const colorsHTML = `
      <div class="color-selector">
        <p class="size-label">Colores disponibles:</p>
        <div class="colors">
          ${colors.map(c => `
            <button class="color-chip" style="background:${c.trim()}"
              title="${c.trim()}"
              onclick="selectColor(this, '${c.trim()}', '${name}', '${price}')">
            </button>
          `).join('')}
        </div>
      </div>
    `;
    document.getElementById('btnOrder').insertAdjacentHTML('beforebegin', colorsHTML);
  }

  selectedColor = '';
  updateOrderLink(name, price, '', '');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectColor(btn, color, name, price) {
  document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('selected'));
  btn.classList.add('selected');
  selectedColor = color;
  updateOrderLink(name, price, selectedSize, selectedColor);
}

const nombreColores = {
  "#000000": "Negro",
  "#FFFFFF": "Blanco",
  "#808080": "Gris",
  "#722F37": "Vino tinto",
  "#800020": "Borgoña",
  "#1B2A4A": "Azul marino",
  "#4A5E3A": "Verde militar",
  "#87CEEB": "Azul cielo",
  "#AED6F1": "Azul bebé",
  "#7D9B76": "Verde salvia",
  "#C19A6B": "Camel",
  "#D4B896": "Nude",
  "#FFFFFF": "Blanco",
  "#4f030c" : "Vino tinto profundo"
  // ➕ agrega más si usas otros colores
};

function updateOrderLink(name, price, size, color) {
  const sizeText  = size  ? `Talla: ${size}` : 'Sin talla seleccionada';
  const colorNombre = color ? (nombreColores[color] || color) : '';
  const colorText = colorNombre ? `\nColor: ${colorNombre}` : '';
  const msg = encodeURIComponent(`Hola Pinna! Me interesa:\n🤎 ${name}\n🤎 ${price}\n🤎 ${sizeText}${colorText}\n\n¿Tienen disponibilidad?`);
  const phone = '573015086774';
  document.getElementById('btnOrder').href = `https://wa.me/${phone}?text=${msg}`;
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});


// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 30
    ? '0 4px 24px rgba(74,44,26,0.1)'
    : 'none';
});


// ===== ANIMACIÓN SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });


// ===== INIT =====
renderProductos();