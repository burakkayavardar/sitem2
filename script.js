// ==========================================================================
// Burak Kişisel Web Sitesi - script.js
// Sabit Menü Kaydırma, Aktif Bölüm Takibi ve Erişilebilirlik
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sabit Navbar için Yükseklik Dengesi
  const getNavHeight = () => navbar ? navbar.offsetHeight : 76;

  // 1. Menü Bağlantılarına Tıklanınca Yumuşak Kaydırma
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - getNavHeight() + 2;

          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });

          // URL hash güncelleme
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // 2. Sayfa Kaydırıldıkça Menü Gölgesi ve Aktif Bölüm Vurgusu (Scroll Spy)
  const onScroll = () => {
    const scrollY = window.scrollY;

    // Navbar gölge efekti
    if (scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Aktif bölümü belirleme
    const navHeight = getNavHeight();
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 60;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Sayfa yüklendiğinde bir kez çalıştır
});
