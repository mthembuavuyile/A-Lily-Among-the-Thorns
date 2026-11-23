/* ==========================================================================
   A LILY AMONG THE THORNS — Clean, Lightweight Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Lucide Vector Icons
  if (typeof window.lucide !== 'undefined') {
    window.lucide.createIcons();
  }

  // 1. Mobile Navigation Toggle & Backdrop
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');

  const closeMobileMenu = () => {
    if (!mainNav || !mobileMenuBtn) return;
    mainNav.classList.remove('open');
    mobileMenuBtn.classList.remove('is-active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('is-active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      if (mobileBackdrop) mobileBackdrop.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // 2. Sticky Header Shadow on Scroll
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 16) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Core Values Interactive Highlight
  const petalCards = document.querySelectorAll('.value-petal-card');
  petalCards.forEach((card) => {
    card.addEventListener('click', () => {
      petalCards.forEach((c) => c.classList.remove('active-faith'));
      card.classList.add('active-faith');
    });
  });

  // 4. Daily Grace & Affirmation Generator
  const affirmations = [
    {
      text: '“You are a lily among the thorns — deeply loved by God, rooted in Christ, and created to bloom with grace even in seasons that aren’t gentle.”',
      ref: 'Rooted in Christ • Colossians 2:7'
    },
    {
      text: '“Your worth is not determined by the world, but by the One who created you. Walk boldly in your God-given identity and dignity.”',
      ref: 'Core Value: Self-Love & Dignity'
    },
    {
      text: '“Give yourself room to grow today. When a woman is rooted in Christ, she can navigate every season with faith, hope, courage, and grace.”',
      ref: 'Core Value: Grace & Growth'
    },
    {
      text: '“You never have to navigate the journey of becoming alone. Here, you are seen, heard, valued, and surrounded by sisterhood.”',
      ref: 'Our Vision • Christ-Centered Sisterhood'
    },
    {
      text: '“Rooted and built up in Him, and established in the faith, as ye have been taught, abounding therein with thanksgiving.”',
      ref: 'Colossians 2:7 (KJV)'
    },
    {
      text: '“God has placed unique gifts and purpose within you. May you flourish spiritually, emotionally, mentally, and practically in this season.”',
      ref: 'Core Value: Purpose & Faith'
    }
  ];

  let currentAffirmationIndex = 0;
  const affirmationText = document.getElementById('affirmation-text');
  const affirmationRef = document.getElementById('affirmation-ref');
  const newAffirmationBtn = document.getElementById('new-affirmation-btn');

  if (newAffirmationBtn && affirmationText && affirmationRef) {
    newAffirmationBtn.addEventListener('click', () => {
      currentAffirmationIndex = (currentAffirmationIndex + 1) % affirmations.length;
      affirmationText.style.opacity = '0';
      setTimeout(() => {
        affirmationText.textContent = affirmations[currentAffirmationIndex].text;
        affirmationRef.textContent = affirmations[currentAffirmationIndex].ref;
        affirmationText.style.opacity = '1';
      }, 180);
    });
  }

  // 5. Copy Phone Number Buttons
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const showToast = (msg) => {
    if (!toast) return;
    if (toastMessage) {
      toastMessage.textContent = msg;
    } else {
      toast.textContent = msg;
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  };

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const numberToCopy = btn.getAttribute('data-copy');
      if (!numberToCopy) return;
      try {
        await navigator.clipboard.writeText(numberToCopy);
        showToast(`Copied ${numberToCopy} to clipboard`);
      } catch {
        showToast(`Phone: ${numberToCopy}`);
      }
    });
  });

  // 6. Sisterhood Form -> Direct WhatsApp Message Builder
  const sisterhoodForm = document.getElementById('sisterhood-form');
  if (sisterhoodForm) {
    sisterhoodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('member-name').value.trim();
      const interest = document.getElementById('member-interest').value;
      const recipient = document.getElementById('member-recipient').value;
      const message = document.getElementById('member-message').value.trim();

      const formattedText =
        `*A Lily Among the Thorns — Sisterhood Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Area of Interest:* ${interest}\n\n` +
        `*Message:* ${message}\n\n` +
        `_Rooted in Christ. Growing in purpose. Blooming in faith._`;

      const whatsappUrl = `https://wa.me/${recipient}?text=${encodeURIComponent(formattedText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp to send your inquiry');
    });
  }
});
