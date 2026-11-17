    /* -----------------------------------------------------------------------

       1. PAKISTANI WOMEN'S LUXURY SUITS CATALOG (Khaadi / Eastern Couture)

    ----------------------------------------------------------------------- */

    const pakistaniSuits = [

      {

        id: 'fof-pk-01',

        name: 'Zari Embroidered Lawn Kurta Set',

        category: '3-Piece Unstitched Lawn',

        price: 8950,

        img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-02',

        name: 'Kohinoor Chiffon Festive Shalwar',

        category: 'Luxury Festive Pret',

        price: 14500,

        img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-03',

        name: 'Multani Resham Thread Kurta',

        category: 'Artisanal Khaadi Weave',

        price: 7450,

        img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-04',

        name: 'Shalimar Raw Silk Ensemble',

        category: 'Signature Evening Wear',

        price: 18900,

        img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-05',

        name: 'Noor-e-Jahan Organza Dupatta Suit',

        category: '3-Piece Embroidered',

        price: 12800,

        img: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-06',

        name: 'Mehrunnisa Chikankari Kameez',

        category: 'Summer Heritage Pret',

        price: 9600,

        img: 'https://images.unsplash.com/photo-1583391733981-8b530b760347?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-07',

        name: 'Lahori Tilla Work Gharara Set',

        category: 'Festive Couture',

        price: 21500,

        img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=85'

      },

      {

        id: 'fof-pk-08',

        name: 'Badshahi Jacquard Woven Kurta',

        category: '2-Piece Jacquard Edit',

        price: 6850,

        img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85'

      }

    ];



    const suitsGrid = document.getElementById('suits-grid');

    const noResults = document.getElementById('no-results');

    const searchInput = document.getElementById('suit-search');



    function renderSuits(filterText = '') {

      const q = filterText.trim().toLowerCase();

      const filtered = pakistaniSuits.filter(s =>

        s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)

      );



      if (filtered.length === 0) {

        suitsGrid.innerHTML = '';

        noResults.classList.remove('hidden');

        return;

      }

      noResults.classList.add('hidden');



      suitsGrid.innerHTML = filtered.map(suit => `

        <article class="suit-card group flex flex-col cursor-pointer">

          <!-- Strictly Borderless Image Container: 100% B&W default -> Full Color on Hover -->

          <div class="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#1F130D]">

            <img src="${suit.img}" alt="${suit.name}"

                 onerror="this.src='https://placehold.co/600x800/2A1A12/E6C79C?text=${encodeURIComponent(suit.name)}'"

                 class="suit-img w-full h-full object-cover" />



            <!-- Subtle Quick Add Pill on Hover -->

            <button onclick="addToCart('${suit.id}')"

                    class="absolute bottom-3.5 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 px-5 py-2 rounded-full bg-[#140C08]/90 text-[#F5E1C3] hover:bg-[#E6C79C] hover:text-[#140C08] text-[10px] font-medium uppercase tracking-[0.22em] transition-all duration-300 whitespace-nowrap cursor-pointer">

              + Add to Bag

            </button>

          </div>



          <!-- Clean Borderless Editorial Typography -->

          <div class="pt-3.5 flex items-start justify-between gap-2">

            <div>

              <p class="text-[10px] uppercase tracking-[0.24em] text-[#C89D66]/80">${suit.category}</p>

              <h3 class="font-['Cormorant_Garamond'] text-lg sm:text-xl text-[#F5E1C3] leading-snug mt-0.5">${suit.name}</h3>

            </div>

            <span class="font-['Cinzel'] text-xs sm:text-sm text-[#E6C79C] shrink-0 pt-1">

              PKR ${suit.price.toLocaleString()}

            </span>

          </div>

        </article>

      `).join('');

    }



    searchInput.addEventListener('input', (e) => renderSuits(e.target.value));

    renderSuits();



    /* -----------------------------------------------------------------------

       2. CART STATE & DRAWER LOGIC

    ----------------------------------------------------------------------- */

    let cart = [];



    function showToast(msg) {

      const toast = document.getElementById('toast-box');

      toast.textContent = msg;

      toast.style.opacity = '1';

      clearTimeout(toast._t);

      toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2200);

    }



    function addToCart(id) {

      const item = pakistaniSuits.find(s => s.id === id);

      if (!item) return;

      const existing = cart.find(c => c.id === id);

      if (existing) {

        existing.qty += 1;

      } else {

        cart.push({ ...item, qty: 1 });

      }

      updateCartUI();

      showToast(`${item.name} added to bag`);

    }



    function updateQty(id, delta) {

      const idx = cart.findIndex(c => c.id === id);

      if (idx === -1) return;

      cart[idx].qty += delta;

      if (cart[idx].qty <= 0) cart.splice(idx, 1);

      updateCartUI();

    }



    function updateCartUI() {

      const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);



      document.getElementById('cart-badge').textContent = totalCount;

      document.getElementById('cart-total').textContent = `PKR ${totalPrice.toLocaleString()}`;



      const list = document.getElementById('cart-items-list');

      if (cart.length === 0) {

        list.innerHTML = `<p class="text-center text-xs text-[#C89D66]/65 py-12 tracking-widest uppercase">Your bag is currently empty</p>`;

        return;

      }



      list.innerHTML = cart.map(item => `

        <div class="flex items-center gap-3.5 bg-[#140C08]/75 p-3 rounded-xl">

          <img src="${item.img}" alt="${item.name}" class="w-14 h-18 object-cover rounded-lg" />

          <div class="flex-1 min-w-0">

            <h4 class="font-['Cormorant_Garamond'] text-base text-[#F5E1C3] truncate">${item.name}</h4>

            <p class="text-xs text-[#C89D66]">PKR ${item.price.toLocaleString()}</p>

            <div class="flex items-center gap-2.5 mt-1.5">

              <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 rounded-full bg-[#2A1A12] text-[#E6C79C] text-xs cursor-pointer">-</button>

              <span class="text-xs text-[#F5E1C3]">${item.qty}</span>

              <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 rounded-full bg-[#2A1A12] text-[#E6C79C] text-xs cursor-pointer">+</button>

            </div>

          </div>

        </div>

      `).join('');

    }



    function toggleCartDrawer(open) {

      const drawer = document.getElementById('cart-drawer');

      const backdrop = document.getElementById('cart-drawer-backdrop');

      if (open) {

        backdrop.classList.remove('hidden');

        requestAnimationFrame(() => drawer.classList.remove('translate-x-full'));

      } else {

        drawer.classList.add('translate-x-full');

        setTimeout(() => backdrop.classList.add('hidden'), 400);

      }

    }



    function checkoutViaWhatsApp() {

      if (cart.length === 0) {

        showToast('Please add a Pakistani suit to your bag first');

        return;

      }

      const lines = cart.map(c => `• ${c.name} (x${c.qty}) - PKR ${(c.price * c.qty).toLocaleString()}`).join('%0A');

      const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

      const url = `https://wa.me/923001234567?text=Assalam-o-Alaikum%20FOF!%20I%20want%20to%20order:%0A${lines}%0A%0ATotal:%20PKR%20${total.toLocaleString()}`;

      window.open(url, '_blank', 'noopener,noreferrer');

    }



    updateCartUI();



    /* -----------------------------------------------------------------------

       3. AUTH MODAL LOGIC

    ----------------------------------------------------------------------- */

    let authMode = 'login';



    function openAuthModal() {

      const m = document.getElementById('auth-modal');

      m.classList.remove('hidden');

      m.classList.add('flex');

    }



    function closeAuthModal() {

      const m = document.getElementById('auth-modal');

      m.classList.add('hidden');

      m.classList.remove('flex');

    }



    function switchAuthTab(mode) {

      authMode = mode;

      const loginTab = document.getElementById('tab-login');

      const signupTab = document.getElementById('tab-signup');

      const nameWrap = document.getElementById('signup-name-wrap');

      const submitBtn = document.getElementById('auth-submit-btn');



      if (mode === 'login') {

        loginTab.className = 'flex-1 py-1.5 rounded-full text-xs uppercase tracking-widest bg-[#E6C79C] text-[#140C08] font-medium transition cursor-pointer';

        signupTab.className = 'flex-1 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#E6C79C] transition cursor-pointer';

        nameWrap.classList.add('hidden');

        submitBtn.textContent = 'Enter Atelier';

      } else {

        signupTab.className = 'flex-1 py-1.5 rounded-full text-xs uppercase tracking-widest bg-[#E6C79C] text-[#140C08] font-medium transition cursor-pointer';

        loginTab.className = 'flex-1 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#E6C79C] transition cursor-pointer';

        nameWrap.classList.remove('hidden');

        submitBtn.textContent = 'Create Account';

      }

    }



    function handleAuthSubmit(e) {

      e.preventDefault();

      const email = document.getElementById('auth-email').value;

      const name = document.getElementById('auth-name').value || email.split('@')[0];

      document.getElementById('auth-btn').textContent = `Hi, ${name}`;

      closeAuthModal();

      showToast(`Welcome to FOF, ${name}`);

    }



    /* -----------------------------------------------------------------------

       4. SILKY-SMOOTH 4-STAGE LERPED SCROLL CHOREOGRAPHY

          Stage 1 (0.00 -> 0.28): Hero Logo Zoom-In & Dissolve

          Stage 2 (0.28 -> 0.42): Calm Deep Coffee & Golden Ambient Breather

          Stage 3 (0.42 -> 0.72): 9 Lookbook Photos Glide Smoothly Left

          Stage 4 (0.72 -> 1.00): Pakistani Suits Borderless Cards Reveal

    ----------------------------------------------------------------------- */

    const runway = document.getElementById('master-runway');

    const introOverlay = document.getElementById('intro-overlay');

    const zoomStage = document.getElementById('zoom-stage');

    const hint = document.getElementById('scroll-hint');

    const brandHeader = document.getElementById('brand-header');

    const galleryStage = document.getElementById('gallery-stage');

    const galleryTrack = document.getElementById('gallery-track');

    const cardsStage = document.getElementById('cards-stage');

    const progressBar = document.getElementById('progress-bar');



    let targetProgress = 0;

    let smoothProgress = 0;



    setTimeout(() => {

      if (window.scrollY < 15) hint.style.opacity = '1';

    }, 3300);



    function updateTarget() {

      const maxScroll = Math.max(runway.offsetHeight - window.innerHeight, 1);

      targetProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

    }



    function animate() {

      smoothProgress += (targetProgress - smoothProgress) * 0.065;

      if (Math.abs(targetProgress - smoothProgress) < 0.00015) {

        smoothProgress = targetProgress;

      }



      progressBar.style.width = `${smoothProgress * 100}%`;



      /* STAGE 1: INTRO LOGO ZOOM & DISSOLVE (0.00 -> 0.28) */

      const introEnd = 0.28;

      if (smoothProgress >= introEnd) {

        introOverlay.style.opacity = '0';

        introOverlay.style.pointerEvents = 'none';

      } else {

        introOverlay.style.pointerEvents = 'auto';

        const p1 = smoothProgress / introEnd;

        const scale = 1 + Math.pow(p1, 2.15) * 16;

        const opacity = p1 < 0.56 ? 1 : Math.max(0, 1 - (p1 - 0.56) / 0.44);



        zoomStage.style.transform = `scale(${scale})`;

        zoomStage.style.opacity = opacity;

        introOverlay.style.opacity = opacity;



        if (p1 > 0.04) hint.style.opacity = '0';

      }



      /* STAGE 2 & 3 TOP-LEFT WORDMARK (0.34 -> 0.72) */

      if (smoothProgress >= 0.34 && smoothProgress < 0.72) {

        brandHeader.style.opacity = '1';

      } else {

        brandHeader.style.opacity = '0';

      }



      /* STAGE 3: HORIZONTAL LOOKBOOK GLIDE (0.42 -> 0.72) */

      const galleryStart = 0.42;

      const galleryEnd = 0.72;

      if (smoothProgress <= galleryStart || smoothProgress >= galleryEnd + 0.06) {

        galleryStage.style.opacity = '0';

        galleryStage.style.pointerEvents = 'none';

        if (smoothProgress <= galleryStart) {

          galleryTrack.style.transform = 'translate3d(0px, 0px, 0px)';

        }

      } else {

        galleryStage.style.pointerEvents = smoothProgress < galleryEnd ? 'auto' : 'none';

        const p3 = Math.min(Math.max((smoothProgress - galleryStart) / (galleryEnd - galleryStart), 0), 1);

        const fadeIn = Math.min(p3 / 0.12, 1);

        const fadeOut = smoothProgress > galleryEnd ? Math.max(0, 1 - (smoothProgress - galleryEnd) / 0.06) : 1;

        const maxShift = Math.max(galleryTrack.scrollWidth - window.innerWidth, 0);

        const shiftX = p3 * maxShift;



        galleryStage.style.opacity = fadeIn * fadeOut;

        galleryTrack.style.transform = `translate3d(-${shiftX}px, 0px, 0px)`;

      }



      /* STAGE 4: PAKISTANI SUITS BORDERLESS CARDS REVEAL (0.72 -> 1.00) */

      const cardsStart = 0.72;

      if (smoothProgress <= cardsStart) {

        cardsStage.style.opacity = '0';

        cardsStage.style.pointerEvents = 'none';

        cardsStage.style.transform = 'translate3d(0px, 36px, 0px)';

      } else {

        const p4 = Math.min((smoothProgress - cardsStart) / 0.10, 1);

        const easeOut = 1 - Math.pow(1 - p4, 3);

        cardsStage.style.opacity = easeOut;

        cardsStage.style.pointerEvents = p4 > 0.35 ? 'auto' : 'none';

        cardsStage.style.transform = `translate3d(0px, ${(1 - easeOut) * 36}px, 0px)`;

      }



      requestAnimationFrame(animate);

    }



    window.addEventListener('scroll', updateTarget, { passive: true });

    window.addEventListener('resize', updateTarget);

    updateTarget();

    animate();

  
