// Data produk (tidak ada perubahan pada data ini)
const productsData = [
    {
        id: 1,
        name: "Jaket Bomber Urban",
        category: "Jaket",
        stock: 5,
        price: 350000,
        description: "Jaket bomber modern dengan desain urban. Terbuat dari bahan berkualitas tinggi, cocok untuk gaya kasual sehari-hari dan memberikan kehangatan optimal.",
        images: [
            "https://via.placeholder.com/600x400/888/FFF?text=Jaket+Bomber+1",
            "https://via.placeholder.com/600x400/777/DDD?text=Jaket+Bomber+2",
            "https://via.placeholder.com/600x400/666/CCC?text=Jaket+Bomber+3"
        ]
    },
    {
        id: 2,
        name: "Topi Baseball Klasik",
        category: "Topi",
        stock: 0, // STOK HABIS
        price: 85000,
        description: "Topi baseball gaya klasik yang nyaman dipakai. Terbuat dari katun berkualitas dengan desain minimalis, cocok untuk melengkapi penampilan sporty Anda.",
        images: [
            "https://via.placeholder.com/600x400/777/DDD?text=Topi+Baseball+1",
            "https://via.placeholder.com/600x400/666/CCC?text=Topi+Baseball+2"
        ]
    },
    {
        id: 3,
        name: "Kaos Distro Original",
        category: "Baju",
        stock: 12,
        price: 120000,
        description: "Kaos distro original dengan desain unik dan bahan katun combed 30s yang lembut dan menyerap keringat. Ideal untuk aktivitas sehari-hari.",
        images: [
            "https://via.placeholder.com/600x400/666/CCC?text=Kaos+Distro+1",
            "https://via.placeholder.com/600x400/555/BBB?text=Kaos+Distro+2",
            "https://via.placeholder.com/600x400/444/AAA?text=Kaos+Distro+3"
        ]
    },
    {
        id: 4,
        name: "Celana Chino Slim Fit",
        category: "Celana",
        stock: 8,
        price: 220000,
        description: "Celana chino slim fit yang nyaman dan stylish. Cocok untuk tampilan kasual maupun semi-formal. Tersedia dalam berbagai ukuran.",
        images: [
            "https://via.placeholder.com/600x400/555/BBB?text=Celana+Chino+1",
            "https://via.placeholder.com/600x400/444/AAA?text=Celana+Chino+2"
        ]
    },
    {
        id: 5,
        name: "Jaket Parka Musim Dingin",
        category: "Jaket",
        stock: 0, // STOK HABIS
        price: 480000,
        description: "Jaket parka tebal yang dirancang untuk cuaca dingin ekstrem. Tahan air dan angin, dengan banyak saku fungsional. Gaya dan perlindungan dalam satu jaket.",
        images: [
            "https://via.placeholder.com/600x400/444/AAA?text=Jaket+Parka+1",
            "https://via.placeholder.com/600x400/333/999?text=Jaket+Parka+2"
        ]
    },
    {
        id: 6,
        name: "Kemeja Flanel Casual",
        category: "Baju",
        stock: 15,
        price: 150000,
        description: "Kemeja flanel lembut dengan motif kotak-kotak klasik. Ideal untuk gaya santai atau layering. Tersedia dalam berbagai warna.",
        images: [
            "https://via.placeholder.com/600x400/333/999?text=Kemeja+Flanel+1",
            "https://via.placeholder.com/600x400/222/888?text=Kemeja+Flanel+2"
        ]
    },
    {
        id: 7,
        name: "Topi Rimba Outdoor",
        category: "Topi",
        stock: 7,
        price: 95000,
        description: "Topi rimba multifungsi untuk kegiatan outdoor. Melindungi dari sinar matahari dan hujan, dengan tali pengikat yang bisa disesuaikan.",
        images: [
            "https://via.placeholder.com/600x400/222/888?text=Topi+Rimba+1",
            "https://via.placeholder.com/600x400/111/777?text=Topi+Rimba+2"
        ]
    }
];

// Data Banner Slider
const bannerSlides = [
    {
        id: 1,
        image: "https://via.placeholder.com/1200x375/222/DDD?text=Koleksi+Terbaru+TetraStore+(16:5)"
    },
    {
        id: 2,
        image: "https://via.placeholder.com/1200x375/333/CCC?text=Diskon+Up+To+70+Persen+(16:5)"
    },
    {
        id: 3,
        image: "https://via.placeholder.com/1200x375/444/BBB?text=Gratis+Pengiriman+Minimal+100rb+(16:5)"
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

const whatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Anda

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