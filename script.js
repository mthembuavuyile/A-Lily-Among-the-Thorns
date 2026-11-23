/* ==========================================================================
   A LILY AMONG THE THORNS — Interactive Scripts, Lucide Icons & Petals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Lucide Vector Icons
  if (typeof window.lucide !== 'undefined') {
    window.lucide.createIcons();
  }

  // 1. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Sticky Header Shadow on Scroll
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4. Core Values Interactive Highlight
  const petalCards = document.querySelectorAll('.value-petal-card');
  petalCards.forEach((card) => {
    card.addEventListener('click', () => {
      petalCards.forEach((c) => c.classList.remove('active-faith'));
      card.classList.add('active-faith');
    });
  });

  // 5. Daily Grace & Affirmation Generator
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
      }, 220);
    });
  }

  // 6. Copy Phone Number Buttons
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
    setTimeout(() => toast.classList.remove('show'), 2800);
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

  // 7. Sisterhood Form -> Direct WhatsApp Message Builder
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

  // 8. Soft Floating Pink & Lavender Petals Canvas
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalColors = [
      'rgba(251, 207, 232, 0.55)', // Soft Blush Pink
      'rgba(244, 114, 182, 0.35)', // Rose Pink
      'rgba(233, 213, 255, 0.55)', // Soft Lavender Purple
      'rgba(255, 255, 255, 0.7)'   // Pure White Lily Petal
    ];

    const petals = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 10,
      speedY: 0.35 + Math.random() * 0.65,
      speedX: -0.3 + Math.random() * 0.6,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.015,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    }));

    function drawPetals() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.012) * 0.3;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(drawPetals);
    }

    drawPetals();
  }
});
