// Data produk (tidak ada perubahan pada data ini)
const productsData = [
    {
        id: 1,
        name: "Crewneck Rebook",
        category: "Baju",
        stock: 1,
        price: 95000,
        description: "Jaket Rebook Original Second, no minus, no cacat, no baret",
        images: [
            "Produk 1.jpg",
            "Produk 1 belakang.jpg",
        ]
    },
    {
        id: 2,
        name: "Vintage Nike",
        category: "Jaket",
        stock: 1, // STOK HABIS
        price: 110000,
        description: "Jaket Origial Nike Second, ada pertanyaan? klik logo WhatsApp di bawah.",
        images: [
            "Produk 2.jpg",
            "Produk 2 Belakang.jpg"
        ]
    },
    {
        id: 3,
        name: "Nike Sport Swear",
        category: "Jaket",
        stock: 1,
        price: 35000,
        description: "Info lengkap lebih lanjut klik logo WhatsApp di bawah.",
        images: [
            "Nike 1,.jpg",
            "Nike 1,2.jpg",
        ]
    },
    {
        id: 4,
        name: "Vintage Playboy",
        category: "Jaket",
        stock: 1,
        price: 160000,
        description: "Info lengkap klik logo WhatsApp.",
        images: [
            "Playboy.jpg",
            "Playboy 2.jpg"
        ]
    },
    {
        id: 5,
        name: "Jaket SKI",
        category: "Jaket",
        stock: 1, // STOK HABIS
        price: 30000,
        description: "Jaket warna orange, info lebih lengkap klik logo WhatsApp.",
        images: [
            "Produk 4.jpg",
        ]
    }
]

// Data Banner Slider
const bannerSlides = [
    {
        id: 1,
        image: "Banner.png"
    }
];

// Elemen DOM
const productsGrid = document.getElementById('products');
const searchInput = document.getElementById('searchInput');
const categoriesFilter = document.getElementById('categories-filter');

const promotionBannerContainer = document.querySelector('.promotion-banner-container');
const productsSection = document.getElementById('products-section'); // Controls section (search/filter)

const promotionSlider = document.getElementById('promotion-slider');
const prevSlideButton = document.getElementById('prevSlide');
const nextSlideButton = document.getElementById('nextSlide');
const sliderDotsContainer = document.getElementById('slider-dots');

const productDetailModal = document.getElementById('productDetailModal');
const modalMainImage = document.getElementById('modalMainImage');
const modalThumbnails = document.getElementById('modalThumbnails');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductStock = document.getElementById('modalProductStock');
const modalProductDescription = document.getElementById('modalProductDescription');
const buyViaWhatsappButton = document.getElementById('buyViaWhatsapp');

// New: About Us Modal Elements
const openAboutUsModalButton = document.getElementById('openAboutUsModal');
const aboutUsModal = document.getElementById('aboutUsModal');

let currentSlideIndex = 0;
let startX = 0;
let endX = 0;

const whatsappNumber = "628889377344"; // Ganti dengan nomor WhatsApp Anda

let activeCategory = "Semua";
let searchQuery = "";

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

function displayProducts() {
    productsGrid.innerHTML = '';

    let filteredProducts = productsData.filter(product => {
        const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filteredProducts.sort((a, b) => {
        if (a.stock === 0 && b.stock > 0) return 1;
        if (a.stock > 0 && b.stock === 0) return -1;
        return 0;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">Tidak ada produk yang ditemukan untuk pencarian atau kategori ini.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        if (product.stock === 0) {
            productCard.classList.add('out-of-stock-card');
        }

        const mainProductImage = product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300x220/AAA/FFF?text=No+Image';

        productCard.innerHTML = `
            ${product.stock === 0 ? '<div class="out-of-stock-overlay">HABIS</div>' : ''}
            <img src="${mainProductImage}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${formatRupiah(product.price)}</p>
                <button onclick="openProductDetail(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>Detail Selengkapnya</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

searchInput.addEventListener('keyup', (e) => {
    searchQuery = e.target.value.trim();
    displayProducts();
});

categoriesFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-button')) {
        document.querySelectorAll('.category-button').forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        activeCategory = e.target.dataset.category;
        displayProducts();
    }
});

// --- Navigasi Halaman & Modal ---
// Handle opening About Us Modal
openAboutUsModalButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Hide main content (products section and banner)
    productsSection.style.display = 'none';
    promotionBannerContainer.style.display = 'none';

    // Show About Us Modal
    aboutUsModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
});

// Handle 'Contact Us' link (still scrolls)
document.querySelector('header nav ul li a[href="#contact"]').addEventListener('click', (e) => {
    e.preventDefault();
    // Hide About Us Modal if open
    closeAboutUsModal();
    // Ensure product section and banner are visible
    productsSection.style.display = 'flex';
    promotionBannerContainer.style.display = 'block';
    // Scroll to contact section
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});


// --- Fungsi untuk Banner Slider (tidak ada perubahan logika) ---
function loadSlider() {
    promotionSlider.innerHTML = '';
    sliderDotsContainer.innerHTML = '';

    bannerSlides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('promotion-slide');
        slideElement.style.backgroundImage = `url(${slide.image})`;
        promotionSlider.appendChild(slideElement);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });
    updateSliderPosition();
    updateDots();
}

function updateSliderPosition() {
    if (promotionSlider.children.length > 0) {
        const slideWidth = promotionSlider.children[0].clientWidth;
        promotionSlider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }
    updateDots();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % bannerSlides.length;
    updateSliderPosition();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + bannerSlides.length) % bannerSlides.length;
    updateSliderPosition();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSliderPosition();
}

function updateDots() {
    document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

prevSlideButton.addEventListener('click', prevSlide);
nextSlideButton.addEventListener('click', nextSlide);

promotionSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    promotionSlider.style.transition = 'none';
});

promotionSlider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    const diff = startX - endX;
    if (promotionSlider.children.length > 0) {
        const slideWidth = promotionSlider.children[0].clientWidth;
        promotionSlider.style.transform = `translateX(${-(currentSlideIndex * slideWidth) - diff}px)`;
    }
});

promotionSlider.addEventListener('touchend', () => {
    promotionSlider.style.transition = 'transform 0.5s ease-in-out';
    const threshold = 50;
    if (endX < startX - threshold) {
        nextSlide();
    } else if (endX > startX + threshold) {
        prevSlide();
    } else {
        updateSliderPosition();
    }
    startX = 0;
    endX = 0;
});

let autoSlideInterval = setInterval(nextSlide, 5000);

const sliderWrapper = document.querySelector('.slider-wrapper');
if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// --- Fungsi untuk Product Detail Modal (tidak ada perubahan logika) ---
function openProductDetail(productId) {
    // Ensure About Us Modal is closed if open
    closeAboutUsModal();

    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    modalProductName.textContent = product.name;
    modalProductPrice.textContent = formatRupiah(product.price);
    modalProductDescription.textContent = product.description;

    modalProductStock.textContent = `Stok: ${product.stock > 0 ? product.stock : 'Habis'}`;
    modalProductStock.classList.remove('available', 'out-of-stock');
    if (product.stock > 0) {
        modalProductStock.classList.add('available');
    } else {
        modalProductStock.classList.add('out-of-stock');
    }

    modalThumbnails.innerHTML = '';
    product.images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.alt = `${product.name} - Gambar ${index + 1}`;
        thumbnail.addEventListener('click', () => {
            modalMainImage.src = imgSrc;
            document.querySelectorAll('.gallery-thumbnails img').forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        modalThumbnails.appendChild(thumbnail);
    });

    if (product.images.length > 0) {
        modalMainImage.src = product.images[0];
        if (modalThumbnails.children.length > 0) {
            modalThumbnails.children[0].classList.add('active');
        }
    } else {
        modalMainImage.src = 'https://via.placeholder.com/600x400/AAA/FFF?text=No+Image';
    }

    const whatsappMessage = `Halo TetraStore, saya tertarik dengan produk ${product.name} (${formatRupiah(product.price)}). Mohon informasinya lebih lanjut.`;
    buyViaWhatsappButton.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    buyViaWhatsappButton.target = "_blank";

    if (product.stock === 0) {
        buyViaWhatsappButton.classList.add('disabled');
    } else {
        buyViaWhatsappButton.classList.remove('disabled');
    }

    productDetailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    productDetailModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// New: Close About Us Modal
function closeAboutUsModal() {
    aboutUsModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Ensure product section and banner are visible after closing about us modal
    productsSection.style.display = 'flex';
    promotionBannerContainer.style.display = 'block';
}


// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target == productDetailModal) {
        closeProductDetail();
    }
    if (event.target == aboutUsModal) {
        closeAboutUsModal();
    }
});

// Panggil fungsi-fungsi inisialisasi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan bagian produk dan banner terlihat saat pertama kali dimuat
    productsSection.style.display = 'flex';
    promotionBannerContainer.style.display = 'block';

    displayProducts();
    loadSlider();
    window.addEventListener('resize', updateSliderPosition);
});
