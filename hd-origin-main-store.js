(() => {
  // src/data/brands.js
  function createBrands() {
    return [
      {
        id: "sungenova",
        name: "SUNGENOVA",
        short: "NATURAL COMFORT",
        background: "#eee7da",
        accent: "#76634a",
        colors: ["#d3b58e", "#ae875a", "#e8dcca"],
        description: "自然体で、心地よい毎日を。"
      },
      {
        id: "lunafit",
        name: "LUNA FIT",
        short: "ACTIVE MOVEMENT",
        background: "#0960d5",
        accent: "#0877ef",
        colors: ["#82e6fa", "#236be9", "#152947"],
        description: "自由な一歩を、もっと軽快に。"
      },
      {
        id: "reina",
        name: "REINA",
        short: "TIMELESS ELEGANCE",
        background: "#472638",
        accent: "#95536f",
        colors: ["#dfb3c4", "#79394f", "#e7d9d4"],
        description: "日常に、優雅さを。"
      },
      {
        id: "moca",
        name: "MOCA WALK",
        short: "SLOW LIVING",
        background: "#d6d0b9",
        accent: "#66704c",
        colors: ["#bba67e", "#6c7650", "#ebe1c6"],
        description: "自然体で楽しむ、日々の暮らし。"
      },
      {
        id: "urban",
        name: "URBAN STEP",
        short: "CITY CULTURE",
        background: "#171717",
        accent: "#f26441",
        colors: ["#e3e3e3", "#585858", "#fc6a43"],
        description: "都市を、自分のスタイルで。"
      }
    ];
  }

  // src/data/mock-products.js
  function createMockProducts(brands) {
    const names = {
      sungenova: [
        "Natural Comfort",
        "Daily Soft",
        "Relax Walk"
      ],
      lunafit: [
        "Motion Air",
        "Velocity",
        "Active Flex"
      ],
      reina: [
        "Grace",
        "Elegant Mary Jane",
        "Royal Classic"
      ],
      moca: [
        "Craft Walker",
        "Soft Loafer",
        "Natural Step"
      ],
      urban: [
        "City Motion",
        "Mono Runner",
        "Street Form"
      ]
    };
    const products = [];
    brands.forEach((brand, bi) => {
      Array.from({ length: 20 }, (_, i) => {
        const name = names[brand.id][i % names[brand.id].length] + " " + String(i + 1).padStart(2, "0");
        products.push({
          id: String((bi + 1) * 100 + i + 1),
          brand: brand.id,
          name,
          category: [
            "コンフォート",
            "カジュアル",
            "ウォーキング"
          ][i % 3],
          price: 5900 + bi * 550 + i * 400,
          colors: [
            "ブラック",
            "キャメル",
            "ライトグレー"
          ],
          sizes: [
            "22.5",
            "23.0",
            "23.5",
            "24.0",
            "24.5"
          ],
          shape: i,
          description: `${name}は、${brand.description}毎日の装いに合わせやすいデザインをイメージした模擬商品です。`,
          material: "未設定（模擬商品）",
          origin: "未設定（模擬商品）",
          care: "素材に応じたお手入れ方法を掲載予定です。"
        });
      });
    });
    return products;
  }

  // src/state/initial-state.js
  function createInitialState() {
    const state = {};
    state.current = "sungenova";
    state.category = "すべて";
    state.filterColor = "すべて";
    state.filterSize = "すべて";
    state.catalogLevel = "items";
    state.selectedItemId = null;
    state.catalogTransition = "";
    state.catalogIsTransitioning = false;
    state.catalogAnimationTimer = null;
    state.catalogOutgoingMarkup = "";
    state.cart = [];
    state.activeProduct = null;
    state.selectedColor = 0;
    state.selectedProductView = 0;
    state.productImageZoomOpen = false;
    state.productGalleryOpen = false;
    state.productGalleryIndex = 0;
    state.selectedSize = "23.5";
    state.quantity = 1;
    state.detailTab = "buy";
    state.menuOpen = false;
    state.modalOpen = false;
    state.modalAnimationTimer = null;
    state.sideCartOpen = false;
    return state;
  }

  // src/shared/format.js
  function money(app, value) {
    return "¥" + value.toLocaleString("ja-JP");
  }

  // src/shared/artwork.js
  function colorCode(app, color) {
    return {
      "ブラック": "#292929",
      "キャメル": "#bd8953",
      "ライトグレー": "#b8b8b8"
    }[color] || "#888";
  }
  function shoe(app, color, shape = 0, viewIndex = 0) {
    const c = app.colorCode(color);
    const sole = shape === 1 ? "#fff" : "#e7e0d7";
    const viewTransform = viewIndex === 1 ? "translate(600 0) scale(-1 1)" : "";
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 600 400">
      <rect width="600" height="400"
            fill="#f2f0ed"/>
      <g transform="${viewTransform}">
        <ellipse cx="300" cy="326"
                 rx="220" ry="15"
                 fill="#d8d4cd"/>
        <path d="
          M70 267
          Q110 218 177 220
          L242 135
          Q272 111 315 145
          L391 219
          Q447 249 512 270
          Q544 283 524 310
          L115 323
          Q66 315 70 267Z"
          fill="${c}"
          stroke="#666"
          stroke-width="3"/>
        <path d="M77 306 Q281 346 525 298"
          fill="none"
          stroke="${sole}"
          stroke-width="${shape === 1 ? 23 : 15}"/>
        <path d="M217 223 L389 223"
          stroke="#ddd"
          stroke-width="7"/>
        <path d="M251 152 L363 219"
          stroke="#ddd"
          stroke-width="5"/>
      </g>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function productDetailImage(app, product, color, viewIndex = 0) {
    const productImages = product.productImages || product.detailImages;
    const colorViews = productImages && !Array.isArray(productImages) ? productImages[color] : null;
    const configuredView = Array.isArray(colorViews) ? colorViews[viewIndex] : Array.isArray(productImages) ? productImages[viewIndex] : null;
    const source = configuredView && typeof configuredView === "object" ? configuredView[color] || configuredView.default : configuredView;
    if (typeof source === "function") {
      return source({ app, product, color, viewIndex });
    }
    if (typeof source === "string") return source;
    return shoe(app, color, product.shape, viewIndex);
  }
  function productGalleryImages(app, product) {
    const configured = Array.isArray(product.galleryImages) ? product.galleryImages.filter((image) => image && typeof image.src === "string") : [];
    if (configured.length) return configured;
    const brand = app.data.brands.find((item) => item.id === product.brand);
    return [0, 1, 2].map((index) => ({
      src: bannerArt(app, brand, index),
      type: ["campaign", "style", "detail"][index],
      alt: `${product.name} ${["Campaign visual", "Style image", "Detail image"][index]}`
    }));
  }
  function bannerArt(app, brand, index) {
    const [a, c, d] = brand.colors;
    const patterns = [
      `<circle cx="260" cy="105" r="115"
        fill="${d}" opacity=".8"/>
       <path d="M30 270 Q130 80 350 210"
        stroke="${c}" stroke-width="20"
        fill="none" opacity=".35"/>`,
      `<path d="M-80 290 L260 -50
        L430 30 L90 370Z"
        fill="${a}" opacity=".8"/>
       <path d="M130 350 L440 40"
        stroke="white" stroke-width="28"
        opacity=".25"/>`,
      `<circle cx="180" cy="170" r="125"
        fill="none" stroke="${a}"
        stroke-width="2"/>
       <path d="M60 265 Q190 10 340 260"
        fill="none" stroke="${a}"
        stroke-width="3"/>`,
      `<path d="M0 270 L350 60
        L350 350 L0 350Z"
        fill="${d}" opacity=".6"/>
       <circle cx="260" cy="95" r="70"
        fill="${a}" opacity=".6"/>`,
      `<path d="M0 0 L120 0
        L350 350 L230 350Z"
        fill="${c}"/>
       <path d="M260 0 L350 0
        L90 350 L0 350Z"
        fill="${d}" opacity=".7"/>`
    ];
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 350 350">
      <rect width="350" height="350"
        fill="${brand.background}"/>
      ${patterns[index]}
      <text x="175" y="190"
        text-anchor="middle"
        fill="${index === 1 || index === 4 ? "white" : brand.accent}"
        font-family="Arial"
        font-size="35"
        font-weight="bold"
        opacity=".4">
        ${String(index + 1).padStart(2, "0")}
      </text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // src/features/catalog/selectors.js
  function filtered(app) {
    return app.data.products.filter(
      (p) => p.brand === app.state.current && (app.state.category === "すべて" || p.category === app.state.category) && (app.state.filterColor === "すべて" || p.colors.includes(app.state.filterColor)) && (app.state.filterSize === "すべて" || p.sizes.includes(app.state.filterSize))
    );
  }
  function selectedItem(app) {
    return app.data.products.find(
      (p) => p.id === app.state.selectedItemId && p.brand === app.state.current
    );
  }

  // src/features/catalog/view.js
  function catalogNavigation(app) {
    const item = app.selectedItem();
    if (!item || app.state.catalogLevel !== "colors") return "";
    return `
      <button class="catalog-back"
              id="catalogBack"
              type="button">
        ← アイテム一覧へ戻る
      </button>
      <p class="catalog-current-item">
        ${item.name} / COLOR VARIATIONS
      </p>
    `;
  }
  function catalogClass(app) {
    return app.state.catalogTransition ? `catalog ${app.state.catalogTransition}` : "catalog";
  }

  // src/features/sidebar/catalog-menu.js
  function catalogMenu(app) {
    const item = app.selectedItem();
    const items = app.filtered();
    if (app.state.catalogLevel === "colors" && item) {
      return `
        <div class="catalog-menu catalog-menu-colors">
          <div class="menu-path">${app.brand.name} / ${item.name}</div>
          <button class="menu-back"
                  data-catalog-menu-back
                  type="button">← アイテム一覧</button>
          <div class="menu-items">
            ${item.colors.map((color, index) => `
              <button class="menu-item
                ${app.state.selectedColor === index ? "active" : ""}"
                data-product="${item.id}"
                style="--menu-index:${index}"
                data-color-index="${index}"
                type="button">
                <span class="menu-swatch"
                      style="background:${app.colorCode(color)}"></span>
                ${color}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }
    return `
      <div class="catalog-menu catalog-menu-items">
        <div class="menu-path">${app.brand.name} / ${app.state.category}</div>
        <div class="menu-items">
          ${items.map((p, index) => `
            <button class="menu-item"
                    style="--menu-index:${Math.min(index, 4)}"
                    data-item="${p.id}"
                    type="button">
              ${p.name}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  // src/animations/timing.js
  var timing = Object.freeze({
    "catalogStartDelay": 560,
    "catalogCleanup": 1700,
    "modalOpenCleanup": 1450,
    "modalCloseCleanup": 650,
    "cartSlide": 350,
    "worldEnter": 450,
    "menuEnter": 720,
    "menuDelay": 70,
    "menuStep": 45,
    "catalogLeave": 700,
    "catalogOutgoing": 500,
    "catalogTitle": 700,
    "catalogCard": 800,
    "catalogCardDelay": 180,
    "modalOpen": 1350,
    "modalContent": 800,
    "modalContentDelay": 350,
    "modalClose": 620,
    "bannerZoom": 600,
    "bannerFilter": 500,
    "cardHover": 250,
    "imageHover": 350,
    "detailImage": 500,
    "tabHover": 200,
    "headerNavTextIn": 540,
    "headerNavTextOut": 700,
    "headerNavLineIn": 720,
    "headerNavLineOut": 820,
    "headerNavAccentIn": 900,
    "headerNavAccentOut": 960
  });
  var timingStyles = ":host {" + Object.entries(timing).map(([key, value]) => "--hd-time-" + key + ":" + value + "ms;").join("") + "}";

  // src/animations/catalog/controller.js
  function mountOutgoingCatalogLayer(app) {
    if (!app.state.catalogOutgoingMarkup) return;
    const catalog = app.shadowRoot.querySelector(".catalog");
    if (!catalog) return;
    const documentRef = app.shadowRoot.ownerDocument;
    const outgoing = documentRef.createElement("div");
    const incoming = documentRef.createElement("div");
    outgoing.className = "catalog-outgoing";
    incoming.className = "catalog-incoming";
    outgoing.innerHTML = app.state.catalogOutgoingMarkup;
    outgoing.querySelectorAll(".catalog-incoming").forEach((layer) => {
      layer.classList.remove("catalog-incoming");
    });
    while (catalog.firstChild) {
      incoming.appendChild(catalog.firstChild);
    }
    catalog.append(outgoing, incoming);
  }
  function transitionCatalog(app, nextLevel, itemId, trigger) {
    if (app.state.catalogIsTransitioning) return;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const direction = nextLevel === "colors" ? "forward" : "back";
    if (isReducedMotion) {
      app.state.catalogLevel = nextLevel;
      app.state.selectedItemId = itemId;
      app.render();
      return;
    }
    app.state.catalogIsTransitioning = true;
    app.state.catalogOutgoingMarkup = "";
    if (trigger) trigger.classList.add("is-selected");
    const catalog = app.shadowRoot.querySelector(".catalog");
    if (catalog) catalog.classList.add(
      `catalog-leave-${direction}`
    );
    window.setTimeout(() => {
      app.state.catalogOutgoingMarkup = catalog ? catalog.innerHTML : "";
      app.state.catalogLevel = nextLevel;
      app.state.selectedItemId = itemId;
      app.state.catalogTransition = `catalog-enter-${direction}`;
      app.render();
      app.mountOutgoingCatalogLayer();
      app.state.catalogAnimationTimer = window.setTimeout(() => {
        const activeCatalog = app.shadowRoot.querySelector(".catalog");
        if (activeCatalog) {
          const outgoing = activeCatalog.querySelector(
            ".catalog-outgoing"
          );
          const incoming = activeCatalog.querySelector(
            ".catalog-incoming"
          );
          if (outgoing) outgoing.remove();
          activeCatalog.classList.remove(
            "catalog-enter-forward",
            "catalog-enter-back"
          );
        }
        app.state.catalogTransition = "";
        app.state.catalogOutgoingMarkup = "";
        app.state.catalogIsTransitioning = false;
      }, timing.catalogCleanup);
    }, timing.catalogStartDelay);
  }

  // src/components/product-card/view.js
  function productCards(app) {
    const item = app.selectedItem();
    if (app.state.catalogLevel === "colors" && item) {
      return item.colors.filter(
        (color) => app.state.filterColor === "すべて" || color === app.state.filterColor
      ).map((color) => ({
        color,
        colorIndex: item.colors.indexOf(color)
      })).map(({ color, colorIndex }, index) => `
          <button class="product-card"
                  style="--catalog-card-index:${Math.min(index, 3)}"
                  data-product="${item.id}"
                  data-color-index="${colorIndex}">
            <div class="product-photo">
              <img
                src="${app.shoe(color, item.shape)}"
                alt="${item.name} / ${color}">
            </div>

            <div class="product-text">
              <small>NO. ${item.id} / ${color}</small>
              <h3>${item.name}</h3>
              <p>${app.money(item.price)}</p>
              <span>VIEW PRODUCT →</span>
            </div>
          </button>
        `).join("") || `<p class="empty">
           該当するカラーの商品はありません。
         </p>`;
    }
    return app.filtered().map((p, index) => `
      <button class="product-card"
              style="--catalog-card-index:${Math.min(index, 3)}"
              data-item="${p.id}">
        <div class="product-photo">
          <img
            src="${app.shoe(p.colors[0], p.shape)}"
            alt="${p.name}">
        </div>

        <div class="product-text">
          <small>NO. ${p.id}</small>
          <h3>${p.name}</h3>
          <p>${app.money(p.price)}</p>
          <span>VIEW COLORS →</span>
        </div>
      </button>
    `).join("") || `<p class="empty">
       該当する商品はありません。
     </p>`;
  }

  // src/animations/modal/controller.js
  function openModal(app, html) {
    const overlay = app.shadowRoot.getElementById("overlay");
    const modalBody = app.shadowRoot.getElementById("modalBody");
    if (app.state.modalAnimationTimer) window.clearTimeout(app.state.modalAnimationTimer);
    modalBody.innerHTML = html;
    overlay.hidden = false;
    overlay.classList.remove("modal-closing", "modal-opening");
    void overlay.offsetWidth;
    overlay.classList.add("modal-opening");
    app.state.modalOpen = true;
    app.state.modalAnimationTimer = window.setTimeout(() => {
      overlay.classList.remove("modal-opening");
      app.state.modalAnimationTimer = null;
    }, timing.modalOpenCleanup);
  }
  function closeModal(app) {
    const overlay = app.shadowRoot.getElementById("overlay");
    if (!overlay || overlay.hidden) return;
    if (app.state.modalAnimationTimer) window.clearTimeout(app.state.modalAnimationTimer);
    overlay.classList.remove("modal-opening");
    void overlay.offsetWidth;
    overlay.classList.add("modal-closing");
    app.state.modalOpen = false;
    app.state.modalAnimationTimer = window.setTimeout(() => {
      overlay.classList.remove("modal-closing");
      overlay.hidden = true;
      app.state.modalAnimationTimer = null;
    }, timing.modalCloseCleanup);
  }

  // src/animations/cart/controller.js
  function closeCart(app) {
    const o = app.shadowRoot.getElementById("sideCartOverlay");
    if (!o || o.hidden) return;
    o.classList.remove("is-open");
    app.state.sideCartOpen = false;
    window.setTimeout(() => {
      if (!app.state.sideCartOpen) o.hidden = true;
    }, timing.cartSlide);
  }
  function showCart(app, o) {
    o.hidden = false;
    void o.offsetWidth;
    o.classList.add("is-open");
    app.state.sideCartOpen = true;
  }

  // src/data/mock-inventory.js
  function detailSizes(app, p) {
    return p.sizes.some((s) => /^[A-Za-z]+$/.test(s)) ? p.sizes : ["21.5", "22.0", "22.5", "23.0", "23.5", "24.0", "24.5", "25.0"].filter((s) => p.sizes.includes(s));
  }
  function detailStock(app, p, colorIndex, size) {
    const index = app.detailSizes(p).indexOf(size);
    return (index + colorIndex) % 5 === 0 ? 0 : (index + colorIndex) % 3 + 1;
  }

  // src/features/product-detail/controller.js
  function openProduct(app, id, colorIndex = 0) {
    app.state.activeProduct = app.data.products.find(
      (p) => p.id === id
    );
    if (!app.state.activeProduct) return;
    app.state.selectedColor = Number.isInteger(colorIndex) && colorIndex >= 0 && colorIndex < app.state.activeProduct.colors.length ? colorIndex : 0;
    app.state.selectedProductView = 0;
    app.state.productImageZoomOpen = false;
    app.state.productGalleryOpen = false;
    app.state.productGalleryIndex = 0;
    app.state.selectedSize = app.detailSizes(app.state.activeProduct).find(
      (size) => app.detailStock(app.state.activeProduct, app.state.selectedColor, size) > 0
    );
    app.state.quantity = 1;
    app.state.detailTab = "buy";
    app.renderDetail();
  }
  function validQty(app, value, max = 99) {
    return Math.max(
      1,
      Math.min(
        99,
        Math.floor(Number(value) || 1)
      )
    );
  }

  // src/features/product-detail/selection.js
  function chooseColor(app, colorIndex) {
    const root = app.shadowRoot;
    app.state.selectedSize = root.getElementById("detailSize").value;
    app.state.quantity = app.validQty(
      root.getElementById("detailQty").value,
      app.detailStock(app.state.activeProduct, app.state.selectedColor, app.state.selectedSize)
    );
    app.state.selectedColor = colorIndex;
    if (!app.detailStock(app.state.activeProduct, app.state.selectedColor, app.state.selectedSize)) {
      app.state.selectedSize = app.detailSizes(app.state.activeProduct).find((size) => app.detailStock(app.state.activeProduct, app.state.selectedColor, size) > 0);
      app.state.quantity = 1;
    } else {
      app.state.quantity = app.validQty(
        app.state.quantity,
        app.detailStock(app.state.activeProduct, app.state.selectedColor, app.state.selectedSize)
      );
    }
    app.renderDetail();
  }
  function chooseProductView(app, viewIndex) {
    const selectedProductView = viewIndex === 1 ? 1 : 0;
    app.state.selectedProductView = selectedProductView;
    const root = app.shadowRoot;
    const product = app.state.activeProduct;
    root.getElementById("detailImage").src = app.productDetailImage(
      product,
      product.colors[app.state.selectedColor],
      selectedProductView
    );
    root.querySelectorAll("[data-product-view]").forEach((button) => {
      const isActive = Number(button.dataset.productView) === selectedProductView;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }
  function chooseSize(app, size) {
    app.state.selectedSize = size;
    app.state.quantity = 1;
    app.renderDetail();
  }
  function stepQuantity(app, delta) {
    const stock = app.detailStock(app.state.activeProduct, app.state.selectedColor, app.state.selectedSize);
    app.state.quantity = Math.max(1, Math.min(stock, app.state.quantity + delta));
    app.shadowRoot.getElementById("detailQty").value = app.state.quantity;
  }
  function submitSelection(app) {
    const root = app.shadowRoot;
    app.state.selectedSize = root.getElementById("detailSize").value;
    app.state.quantity = app.validQty(
      root.getElementById("detailQty").value,
      app.detailStock(app.state.activeProduct, app.state.selectedColor, app.state.selectedSize)
    );
    app.addToCart();
  }

  // src/features/product-detail/events.js
  function bindDetailEvents(app) {
    const root = app.shadowRoot;
    root.querySelectorAll("[data-color]").forEach((button) => {
      button.onclick = () => chooseColor(app, Number(button.dataset.color));
    });
    root.querySelectorAll("[data-product-view]").forEach((button) => {
      button.onclick = () => chooseProductView(app, Number(button.dataset.productView));
    });
    root.getElementById("detailImageZoomButton").onclick = () => app.openProductImageZoom();
    root.getElementById("productGalleryButton").onclick = () => app.openProductGallery();
    root.querySelectorAll("[data-size-choice]").forEach((button) => {
      button.onclick = () => chooseSize(app, button.dataset.sizeChoice);
    });
    root.getElementById("detailSize").onchange = (event) => chooseSize(app, event.target.value);
    root.querySelectorAll("[data-qty-step]").forEach((button) => {
      button.onclick = () => stepQuantity(app, Number(button.dataset.qtyStep));
    });
    root.getElementById("detailCartButton").onclick = () => app.openCart();
    root.getElementById("addCart").onclick = () => submitSelection(app);
  }
  function bindProductImageZoomEvents(app) {
    const root = app.shadowRoot;
    const zoom = root.getElementById("productImageZoom");
    if (!zoom) return;
    root.getElementById("closeProductImageZoom").onclick = () => app.closeProductImageZoom();
    zoom.onclick = (event) => {
      if (event.target === zoom) app.closeProductImageZoom();
    };
  }

  // src/components/color-selector/view.js
  function colorSelector(app, p) {
    return `<div class="detail-color-thumbnails">
            ${p.colors.map((c, i) => `
              <button class="detail-color-thumb ${i === app.state.selectedColor ? "active" : ""}" data-color="${i}" type="button">
                <img src="${app.shoe(c, p.shape)}" alt=""><small>${c}</small>
              </button>
            `).join("")}
          </div>`;
  }

  // src/components/size-selector/view.js
  function sizeSelector(app, p) {
    return `<div class="detail-inventory"><div class="detail-section-label">サイズ別在庫（模擬）</div><div class="detail-size-table">
            ${app.detailSizes(p).map((size) => {
      const stock = app.detailStock(p, app.state.selectedColor, size);
      return `<button class="detail-size-cell ${size === app.state.selectedSize ? "selected" : ""} ${stock ? "" : "sold-out"}" data-size-choice="${size}" ${stock ? "" : "disabled"} type="button"><strong>${size}</strong><small>${stock ? "あり" : "なし"}</small></button>`;
    }).join("")}
          </div></div>`;
  }

  // src/features/product-detail/view.js
  function detailView(app, p, brand) {
    return `
      <div class="detail-grid">

        <!-- 左側：画像・カラーサムネイル・在庫 -->
        <div class="detail-left-panel">
          <div class="detail-image-frame">
            <button id="detailImageZoomButton" class="detail-image-zoom-button" type="button" aria-label="商品画像を拡大">⛶ 拡大</button>
            <img id="detailImage" class="detail-image" src="${app.productDetailImage(p, p.colors[app.state.selectedColor], app.state.selectedProductView)}" alt="${p.name}">
          </div>
          <div class="detail-view-selector" aria-label="商品画像のビュー切り替え">
            ${[0, 1].map((viewIndex) => `<button class="detail-view-button ${viewIndex === app.state.selectedProductView ? "active" : ""}" data-product-view="${viewIndex}" type="button" aria-pressed="${viewIndex === app.state.selectedProductView}">VIEW ${viewIndex + 1}</button>`).join("")}
          </div>
          ${colorSelector(app, p)}
          ${sizeSelector(app, p)}
          <!-- 購入モード -->
          <div id="purchasePanel">
            <div class="detail-purchase-group">
              <div class="purchase-field purchase-size"><label for="detailSize">サイズ</label><select id="detailSize">${app.detailSizes(p).filter((s) => app.detailStock(p, app.state.selectedColor, s) > 0).map((s) => `<option value="${s}" ${s === app.state.selectedSize ? "selected" : ""}>${s}</option>`).join("")}</select></div>
              <div class="purchase-field purchase-quantity"><label for="detailQty">数量</label><div class="detail-quantity"><input type="number" id="detailQty" min="1" max="${app.detailStock(p, app.state.selectedColor, app.state.selectedSize) || 1}" value="${app.state.quantity}"><button type="button" data-qty-step="1">▲</button><button type="button" data-qty-step="-1">▼</button></div></div>
              <button class="detail-add" id="addCart" type="button">追加</button><button class="detail-cart-view" id="detailCartButton" type="button">🛒 カートを見る (${app.state.cart.reduce((sum, item) => sum + item.qty, 0)})</button>
            </div>
          </div>
        </div>
        <!-- 商品情報 -->
        <div class="detail-info">
          <small>
            ${brand.name} / NO. ${p.id}
          </small>

          <h2>${p.name}</h2>

          <div class="detail-price">
            ${app.money(p.price)}
          </div>

          <button id="productGalleryButton" class="detail-gallery-navigation" type="button">
            <span class="detail-gallery-label">GALLERY</span><span class="detail-gallery-arrow">→</span>
            <small>商品イメージ・スタイルを見る</small>
          </button>

          <!-- 商品説明モード -->
          <div id="descriptionPanel"
            >

            <div class="description-content">

              <div class="description-brand">
                ${brand.name}
              </div>

              <p>${p.description}</p>

              <h4>商品の特徴</h4>
              <p>${brand.description}</p>

              <h4>カラー展開</h4>
              <p>${p.colors.join(" / ")}</p>

              <h4>素材</h4>
              <p>${p.material}</p>

              <h4>原産国</h4>
              <p>${p.origin}</p>

              <h4>お手入れ方法</h4>
              <p>${p.care}</p>

              <div class="description-note">
                ※現在は模擬商品情報です。
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
  function productImageZoomView(app, p) {
    const color = p.colors[app.state.selectedColor];
    const selectedView = app.state.selectedProductView;
    return `
    <section id="productImageZoom" class="product-image-zoom" role="dialog" aria-modal="true" aria-label="${p.name}の商品画像を拡大">
      <button id="closeProductImageZoom" class="product-image-zoom-close" type="button" aria-label="拡大表示を閉じる">×</button>
      <img class="product-image-zoom-image" src="${app.productDetailImage(p, color, selectedView)}" alt="${p.name} VIEW ${selectedView + 1}">
    </section>`;
  }

  // src/features/product-detail/image-zoom-controller.js
  function openProductImageZoom(app) {
    if (app.state.productImageZoomOpen || !app.state.activeProduct) return;
    app.state.productImageZoomOpen = true;
    app.shadowRoot.getElementById("modalBody").insertAdjacentHTML(
      "beforeend",
      productImageZoomView(app, app.state.activeProduct)
    );
    bindProductImageZoomEvents(app);
  }
  function closeProductImageZoom(app) {
    const zoom = app.shadowRoot.getElementById("productImageZoom");
    if (zoom) zoom.remove();
    app.state.productImageZoomOpen = false;
  }

  // src/features/product-gallery/events.js
  function bindProductGalleryEvents(app) {
    const root = app.shadowRoot;
    const gallery = root.getElementById("productGallery");
    if (!gallery) return;
    root.getElementById("closeProductGallery").onclick = () => app.closeProductGallery();
    gallery.onclick = (event) => {
      if (event.target === gallery) app.closeProductGallery();
    };
    gallery.querySelectorAll("[data-gallery-step]").forEach((button) => {
      button.onclick = () => app.selectProductGalleryImage(
        app.state.productGalleryIndex + Number(button.dataset.galleryStep)
      );
    });
    gallery.querySelectorAll("[data-gallery-index]").forEach((button) => {
      button.onclick = () => app.selectProductGalleryImage(Number(button.dataset.galleryIndex));
    });
  }

  // src/features/product-gallery/view.js
  function productGalleryView(app, product) {
    const images = app.productGalleryImages(product);
    const index = app.state.productGalleryIndex;
    const image = images[index];
    return `
    <section id="productGallery" class="product-gallery" role="dialog" aria-modal="true" aria-label="${product.name}のイメージギャラリー">
      <button id="closeProductGallery" class="product-gallery-close" type="button" aria-label="ギャラリーを閉じる">×</button>
      <div class="product-gallery-stage">
        <button class="product-gallery-arrow product-gallery-arrow-prev" data-gallery-step="-1" type="button" aria-label="前の画像">←</button>
        <img id="galleryImage" class="product-gallery-image" src="${image.src}" alt="${image.alt || product.name}">
        <button class="product-gallery-arrow product-gallery-arrow-next" data-gallery-step="1" type="button" aria-label="次の画像">→</button>
      </div>
      <div class="product-gallery-footer">
        <p id="galleryImageCount" class="product-gallery-count">${index + 1} / ${images.length}</p>
        <div class="product-gallery-thumbnails" aria-label="ギャラリー画像を選択">
          ${images.map((item, imageIndex2) => `<button class="product-gallery-thumbnail ${imageIndex2 === index ? "active" : ""}" data-gallery-index="${imageIndex2}" type="button" aria-pressed="${imageIndex2 === index}"><img src="${item.src}" alt="${item.alt || product.name}"><span>${item.type || `IMAGE ${imageIndex2 + 1}`}</span></button>`).join("")}
        </div>
      </div>
    </section>`;
  }

  // src/features/product-gallery/controller.js
  function imageIndex(index, length) {
    return (index % length + length) % length;
  }
  function openProductGallery(app) {
    if (app.state.productGalleryOpen || !app.state.activeProduct) return;
    app.state.productGalleryIndex = 0;
    app.state.productGalleryOpen = true;
    app.shadowRoot.getElementById("modalBody").insertAdjacentHTML(
      "beforeend",
      productGalleryView(app, app.state.activeProduct)
    );
    bindProductGalleryEvents(app);
  }
  function closeProductGallery(app) {
    const gallery = app.shadowRoot.getElementById("productGallery");
    if (gallery) gallery.remove();
    app.state.productGalleryOpen = false;
  }
  function selectProductGalleryImage(app, index) {
    const images = app.productGalleryImages(app.state.activeProduct);
    if (!images.length) return;
    const selectedIndex = imageIndex(index, images.length);
    app.state.productGalleryIndex = selectedIndex;
    const image = images[selectedIndex];
    const root = app.shadowRoot;
    root.getElementById("galleryImage").src = image.src;
    root.getElementById("galleryImage").alt = image.alt || app.state.activeProduct.name;
    root.getElementById("galleryImageCount").textContent = `${selectedIndex + 1} / ${images.length}`;
    root.querySelectorAll("[data-gallery-index]").forEach((button) => {
      const isActive = Number(button.dataset.galleryIndex) === selectedIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  // src/features/cart/model.js
  function addToCart(app) {
    const p = app.state.activeProduct;
    const item = {
      id: p.id,
      brand: p.brand,
      name: p.name,
      price: p.price,
      color: p.colors[app.state.selectedColor],
      size: app.state.selectedSize,
      qty: app.state.quantity
    };
    const existing = app.state.cart.find(
      (x) => x.id === item.id && x.color === item.color && x.size === item.size
    );
    if (existing) {
      existing.qty += item.qty;
    } else {
      app.state.cart.push(item);
    }
    app.refreshCartCount();
  }
  function cartTotal(app) {
    return app.state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
  function changeLineQuantity(app, index, delta) {
    const item = app.state.cart[index];
    if (!item) return false;
    item.qty = Math.max(1, item.qty + delta);
    return true;
  }
  function removeLine(app, index) {
    app.state.cart.splice(index, 1);
  }

  // src/features/cart/view.js
  function cartView(app) {
    return `<header class="side-cart-header"><h2>SHOPPING CART</h2><button id="closeCart" type="button">×</button></header><div class="side-cart-items">${app.state.cart.map((item, i) => {
      const product = app.data.products.find((p) => p.id === item.id);
      return `<article class="side-cart-line"><img src="${product ? app.shoe(item.color, product.shape) : ""}" alt="${item.name}"><div><strong>${item.name}</strong><small>${item.color} / ${item.size} cm</small><small>単価 ${app.money(item.price)}</small><div class="side-cart-actions"><button data-qty="-1" data-index="${i}" type="button">−</button><span>${item.qty}</span><button data-qty="1" data-index="${i}" type="button">＋</button><button class="remove" data-remove="${i}" type="button">削除</button></div></div><strong>${app.money(item.price * item.qty)}</strong></article>`;
    }).join("") || '<p class="side-cart-empty">カートは空です。</p>'}</div><footer class="side-cart-footer"><div>合計 <strong>${app.money(app.cartTotal())}</strong></div><button class="primary" id="checkout" type="button">購入手続きへ</button></footer>`;
  }

  // src/features/cart/controller.js
  function refreshCartCount(app) {
    const count = app.state.cart.reduce((sum, item) => sum + item.qty, 0);
    const root = app.shadowRoot;
    const headerCart = root.getElementById("cartButton");
    const detailCart = root.getElementById("detailCartButton");
    if (headerCart) headerCart.textContent = `CART (${count})`;
    if (detailCart) detailCart.textContent = `🛒 カートを見る (${count})`;
  }
  function openCart(app) {
    const o = app.shadowRoot.getElementById("sideCartOverlay"), panel = app.shadowRoot.getElementById("sideCart");
    if (!o || !panel) return;
    panel.innerHTML = cartView(app);
    showCart(app, o);
    panel.querySelector("#closeCart").onclick = () => app.closeCart();
    panel.querySelectorAll("[data-remove]").forEach((button) => {
      button.onclick = () => {
        removeLine(app, Number(button.dataset.remove));
        app.refreshCartCount();
        app.openCart();
      };
    });
    panel.querySelectorAll("[data-qty]").forEach((button) => {
      button.onclick = () => {
        if (!changeLineQuantity(app, Number(button.dataset.index), Number(button.dataset.qty))) return;
        app.refreshCartCount();
        app.openCart();
      };
    });
    panel.querySelector("#checkout").onclick = () => alert("購入手続きへ進む機能はデモです。");
  }

  // src/features/brands/sungenova/view.js
  function sungenovaView(app, cards, navigation, catalogClass2) {
    return `
        <div class="world natural">
          <section class="natural-hero">
            <div>
              <small>THE COMFORT COLLECTION</small>
              <h1>Natural<br>Comfort.</h1>
              <p>心地よさを、日常に。</p>
              <div class="line"></div>
              <span>
                静かに、やさしく、
                毎日に寄り添う。
              </span>
            </div>

            <div class="natural-feature">
              <div class="natural-sun"></div>
              <img src="${app.shoe("キャメル")}">
            </div>
          </section>

          <section class="${catalogClass2}">
            ${navigation}
            <div class="natural-heading">
              <small>01 / OUR COLLECTION</small>
              <h2>Everyday Essentials</h2>
            </div>
            <div class="product-grid">
              ${cards}
            </div>
          </section>
        </div>`;
  }

  // src/features/brands/lunafit/view.js
  function lunafitView(app, cards, navigation, catalogClass2) {
    return `
        <div class="world sport">
          <section class="sport-hero">
            <div class="speed-lines"></div>
            <small>
              PERFORMANCE / COLLECTION 026
            </small>
            <h1>MOVE<br><em>BEYOND.</em></h1>
            <img class="sport-shoe"
              src="${app.shoe("ライトグレー", 1)}">
            <strong>
              YOUR NEXT STEP STARTS HERE →
            </strong>
          </section>

          <section class="${catalogClass2}">
            ${navigation}
            <h2>GEAR / 01</h2>
            <div class="product-grid">
              ${cards}
            </div>
          </section>
        </div>`;
  }

  // src/features/brands/reina/view.js
  function reinaView(app, cards, navigation, catalogClass2) {
    return `
        <div class="world elegant">
          <section class="elegant-hero">
            <small>
              MAISON REINA — 2026 COLLECTION
            </small>

            <div class="elegant-frame">
              <div class="ornament">✦</div>
              <h1>REINA</h1>
              <p>Elegance is timeless.</p>
              <img src="${app.shoe("ブラック")}">
            </div>

            <span>
              A quiet expression of beauty
            </span>
          </section>

          <section class="${catalogClass2}">
            ${navigation}
            <div class="elegant-heading">
              <small>THE EDITION</small>
              <h2>Objects of Desire</h2>
              <div class="fine-line"></div>
            </div>
            <div class="product-grid">
              ${cards}
            </div>
          </section>
        </div>`;
  }

  // src/features/brands/moca/view.js
  function mocaView(app, cards, navigation, catalogClass2) {
    return `
        <div class="world craft">
          <section class="craft-hero">
            <div class="craft-stamp">
              NATURAL GOODS<br>EST. 2026
            </div>

            <div class="craft-title">
              <small>
                THE DAILY GOODS / MOCA WALK
              </small>
              <h1>
                Slow down.<br>Walk more.
              </h1>
              <p>歩くことを、楽しむ。</p>
            </div>

            <div class="craft-photo">
              <img src="${app.shoe("キャメル")}">
            </div>
          </section>

          <section class="${catalogClass2}">
            ${navigation}
            <h2>Our favorite things.</h2>
            <p>
              日常に溶け込む、
              自然体のシューズ。
            </p>
            <div class="product-grid">
              ${cards}
            </div>
          </section>
        </div>`;
  }

  // src/features/brands/urban/view.js
  function urbanView(app, cards, navigation, catalogClass2) {
    return `
        <div class="world urban">
          <section class="urban-hero">
            <div class="urban-meta">
              <span>URBAN STEP®</span>
              <span>TOKYO / 2026</span>
            </div>

            <h1>
              NO<br>LIMITS<span>.</span>
            </h1>

            <div class="urban-graphic">
              <img src="${app.shoe("ブラック", 1)}">
            </div>

            <div class="urban-caption">
              <strong>THE CITY EDIT</strong>
              <small>
                FORM FOLLOWS MOVEMENT.
              </small>
            </div>
          </section>

          <section class="${catalogClass2}">
            ${navigation}
            <h2>01 / SELECTED OBJECTS</h2>
            <div class="product-grid">
              ${cards}
            </div>
          </section>
        </div>`;
  }

  // src/features/brands/view.js
  function brandPage(app) {
    const cards = app.productCards(), navigation = app.catalogNavigation(), catalogClass2 = app.catalogClass();
    const views = { sungenova: sungenovaView, lunafit: lunafitView, reina: reinaView, moca: mocaView, urban: urbanView };
    return (views[app.state.current] || urbanView)(app, cards, navigation, catalogClass2);
  }

  // src/styles/tokens.css
  var tokens_default = ':host {\n  --hd-ink: #222;\n  --hd-paper: #fff;\n  --hd-body-font: Arial,"Noto Sans JP",sans-serif;\n}\n';

  // src/styles/base.css
  var base_default = "* {\n  box-sizing: border-box;\n}\n\n:host {\n  width: 100%;\n  font-family: var(--hd-body-font);\n  color: var(--hd-ink);\n  height: 100dvh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\nbutton {\n  font: inherit;\n  cursor: pointer;\n}\n\nimg {\n  max-width: 100%;\n}\n\n[hidden] {\n  display: none !important;\n}\n\nbutton:focus-visible {\n  outline: 3px solid #478ada;\n  outline-offset: 3px;\n}\n\nselect:focus-visible {\n  outline: 3px solid #478ada;\n  outline-offset: 3px;\n}\n\ninput:focus-visible {\n  outline: 3px solid #478ada;\n  outline-offset: 3px;\n}\n";

  // src/layouts/styles.css
  var styles_default = "input {\n  font: inherit;\n}\n\nselect {\n  font: inherit;\n}\n\n.layout {\n  display: grid;\n  grid-template-columns: 225px minmax(0,1fr);\n  flex: 1;\n  min-height: 0;\n  height: auto;\n  overflow: hidden;\n  align-items: stretch;\n}\n\n.stage {\n  min-width: 0;\n  scrollbar-gutter: stable;\n  height: 100%;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.line {\n  width: 90px;\n  height: 1px;\n  background: #aa9981;\n  margin: 30px 0;\n}\n\n.speed-lines {\n  position: absolute;\n  top: -30%;\n  left: 60%;\n  width: 140px;\n  height: 160%;\n  background: #fff2;\n}\n\n.ornament {\n  font-size: 30px;\n  color: #d3a9bd;\n}\n\n.fine-line {\n  width: 110px;\n  height: 1px;\n  background: #ac8499;\n  margin: auto;\n}\n\n.cart-line {\n  padding: 18px 0;\n  border-bottom: 1px solid #ddd;\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n}\n\n.cart-total {\n  text-align: right;\n  font-size: 22px;\n  margin: 30px 0;\n}\n\n@media (max-width:1100px) {\n  .layout {\n    grid-template-columns: 185px minmax(0,1fr);\n  }\n}\n\n@media (max-width:700px) {\n  .layout {\n    display: flex;\n    flex-direction: column;\n  }\n  .stage {\n    flex: 1;\n    height: auto;\n    min-height: 0;\n  }\n}\n";

  // src/features/header/styles.css
  var styles_default2 = '.topbar {\n  background: rgba(255,255,254,.94);\n  backdrop-filter: blur(10px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 clamp(22px,4vw,64px);\n  border-bottom: 1px solid rgba(40,40,40,.14);\n  height: 82px;\n  flex: 0 0 82px;\n  position: relative;\n  top: auto;\n  z-index: 102;\n}\n\n.brand-lockup {\n  display: grid;\n  align-content: center;\n  gap: 5px;\n  min-width: max-content;\n}\n\n.logo {\n  font-size: 17px;\n  line-height: 1;\n  letter-spacing: .2em;\n  font-weight: 600;\n}\n\n.logo-subtitle {\n  color: #777;\n  font-size: 9px;\n  line-height: 1;\n  letter-spacing: .2em;\n}\n\n.header-right,\n.head-actions,\n.primary-nav {\n  display: flex;\n  align-items: center;\n}\n\n.header-right {\n  gap: clamp(24px,3.4vw,56px);\n}\n\n.primary-nav {\n  height: 82px;\n  gap: clamp(28px,2.7vw,40px);\n}\n\n.primary-nav-link {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n  isolation: isolate;\n  color: #6e6e6e;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: .12em;\n  text-decoration: none;\n  transform: translateY(0);\n  transition: color var(--hd-time-headerNavTextOut) cubic-bezier(.22,1,.36,1), opacity var(--hd-time-headerNavTextOut) cubic-bezier(.22,1,.36,1), transform var(--hd-time-headerNavTextOut) cubic-bezier(.22,1,.36,1);\n}\n\n.primary-nav-link::before {\n  position: absolute;\n  right: -8px;\n  bottom: 13px;\n  left: -8px;\n  z-index: -1;\n  height: 18px;\n  background: rgba(40,40,40,.035);\n  content: "";\n  opacity: 0;\n  pointer-events: none;\n  transform: scaleX(.72) translateY(2px);\n  transform-origin: center;\n  transition: transform var(--hd-time-headerNavAccentOut) cubic-bezier(.22,1,.36,1), opacity var(--hd-time-headerNavAccentOut) cubic-bezier(.22,1,.36,1);\n}\n\n.primary-nav-link::after {\n  position: absolute;\n  right: 0;\n  bottom: 19px;\n  left: -2px;\n  height: 1px;\n  background: var(--hd-ink);\n  content: "";\n  opacity: 0;\n  transform: scaleX(0);\n  transform-origin: center;\n  transition: transform var(--hd-time-headerNavLineOut) cubic-bezier(.22,1,.36,1), opacity var(--hd-time-headerNavLineOut) cubic-bezier(.22,1,.36,1);\n}\n\n.primary-nav-link:hover {\n  color: var(--hd-ink);\n  opacity: .9;\n  transform: translateY(-2px);\n  transition-duration: var(--hd-time-headerNavTextIn), var(--hd-time-headerNavTextIn), var(--hd-time-headerNavTextIn);\n}\n\n.primary-nav-link:hover::before {\n  opacity: 1;\n  transform: scaleX(1) translateY(0);\n  transition-duration: var(--hd-time-headerNavAccentIn), var(--hd-time-headerNavAccentIn);\n  transition-delay: 140ms, 140ms;\n}\n\n.primary-nav-link:hover::after {\n  opacity: 1;\n  transform: scaleX(1);\n  transition-duration: var(--hd-time-headerNavLineIn), var(--hd-time-headerNavLineIn);\n  transition-delay: 80ms, 80ms;\n}\n\n.primary-nav-link.active {\n  color: var(--hd-ink);\n  opacity: .92;\n}\n\n.primary-nav-link.active::after {\n  opacity: .72;\n  transform: scaleX(.62);\n}\n\n.primary-nav-link.active:hover::after {\n  opacity: 1;\n  transform: scaleX(1);\n}\n\n.head-actions {\n  gap: 15px;\n}\n\n#menuToggle {\n  display: none;\n}\n\n.header-utility,\n.header-cart {\n  border: 0;\n  background: transparent;\n  color: #555;\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: .12em;\n  white-space: nowrap;\n}\n\n.header-cart {\n  color: var(--hd-ink);\n}\n\n.header-cart span {\n  color: #777;\n  font-size: 10px;\n}\n\n@media (max-width:700px) {\n  .topbar {\n    padding: 0 13px;\n    flex: 0 0 62px;\n    height: 62px;\n  }\n  .logo {\n    font-size: 13px;\n  }\n  .primary-nav {\n    display: none;\n  }\n  #menuToggle {\n    display: block;\n  }\n}\n';

  // src/components/buttons/header.css
  var header_default = ".outline {\n  border: 1px solid #ddd;\n  background: white;\n  padding: 10px 16px;\n}\n";

  // src/features/brands/navigation.css
  var navigation_default = '.banner-menu {\n  display: grid;\n  grid-template-columns: repeat(5,minmax(0,1fr));\n  gap: 3px;\n  background: #171717;\n  padding: 3px;\n  flex: 0 0 76px;\n  position: relative;\n  top: auto;\n  z-index: 100;\n}\n\n.banner {\n  position: relative;\n  min-width: 0;\n  height: 70px;\n  overflow: hidden;\n  border: 0;\n  padding: 0;\n  background: var(--hd-ink);\n  color: white;\n  isolation: isolate;\n}\n\n.banner img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  filter: brightness(.78);\n}\n\n.banner:hover img {\n  filter: brightness(.55);\n}\n\n.banner:after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: linear-gradient( transparent 20%,#0009 );\n  pointer-events: none;\n}\n\n.banner-label {\n  position: absolute;\n  bottom: 18px;\n  left: 10px;\n  right: 10px;\n  z-index: 1;\n  text-align: center;\n  font-size: clamp(10px,1.4vw,18px);\n  font-weight: bold;\n  letter-spacing: 2px;\n  text-shadow: 0 2px 8px #0008;\n}\n\n.banner-label small {\n  display: block;\n  font-size: 9px;\n  letter-spacing: 1px;\n  margin-top: 7px;\n}\n\n.banner.active {\n  outline: 4px solid #fff;\n  outline-offset: -4px;\n}\n\n.banner.active:before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 5px;\n  background: var(--hd-paper);\n  z-index: 2;\n}\n\n@media (max-width:1100px) {\n  .banner {\n    height: 70px;\n  }\n}\n\n@media (max-width:700px) {\n  .banner-menu {\n    display: flex;\n    overflow-x: auto;\n    scroll-snap-type: x mandatory;\n    flex: 0 0 71px;\n    position: relative;\n    top: auto;\n  }\n  .banner {\n    flex: 0 0 45%;\n    height: 65px;\n    scroll-snap-align: start;\n  }\n  .banner-label {\n    font-size: 12px;\n  }\n}\n';

  // src/animations/hover/styles.css
  var styles_default3 = ".banner img {\n  transition: transform var(--hd-time-bannerZoom) ease, filter var(--hd-time-bannerFilter);\n}\n\n.banner:hover img {\n  transform: scale(1.15);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .product-card {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n\n.product-card {\n  transition: transform var(--hd-time-cardHover), box-shadow var(--hd-time-cardHover);\n}\n\n.product-card:hover {\n  transform: translateY(-5px);\n}\n\n.product-photo img {\n  transition: transform var(--hd-time-imageHover);\n}\n\n.product-card:hover img {\n  transform: scale(1.045);\n}\n\n.craft .product-card:nth-child(2) {\n  transform: rotate(2deg);\n}\n\n.craft .product-card:nth-child(3) {\n  transform: rotate(-2deg);\n}\n\n.craft .product-card:hover {\n  transform: translateY(-5px) rotate(0);\n}\n\n@media (prefers-reduced-motion:reduce) {\n  .banner img {\n    animation: none;\n    transition: none;\n  }\n  .product-card {\n    animation: none;\n    transition: none;\n  }\n  .product-photo img {\n    animation: none;\n    transition: none;\n  }\n}\n";

  // src/features/sidebar/styles.css
  var styles_default4 = ".sidebar {\n  background: #fafafa;\n  border-right: 1px solid #ddd;\n  padding: 32px 19px;\n  height: 100%;\n  min-height: 0;\n  position: relative;\n  top: auto;\n  overflow-y: scroll;\n}\n\n.sidebar-title {\n  font-size: 12px;\n  letter-spacing: 2px;\n  font-weight: bold;\n  margin: 0 0 20px;\n}\n\n.category {\n  display: block;\n  width: 100%;\n  text-align: left;\n  border: 0;\n  background: none;\n  padding: 13px 7px;\n  border-left: 3px solid transparent;\n  font-size: 13px;\n  color: #666;\n}\n\n.category.active {\n  border-left-color: var(--hd-ink);\n  color: var(--hd-ink);\n  background: #ececec;\n  font-weight: bold;\n}\n\n.catalog-menu {\n  margin-top: 25px;\n  padding-top: 20px;\n  border-top: 1px solid #ddd;\n}\n\n.menu-path {\n  margin-bottom: 10px;\n  font-size: 11px;\n  font-weight: bold;\n  letter-spacing: .6px;\n  color: #777;\n}\n\n.menu-items {\n  display: grid;\n  gap: 4px;\n  max-height: 260px;\n  overflow: auto;\n  scrollbar-gutter: stable;\n}\n\n.menu-item {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  width: 100%;\n  padding: 8px 7px;\n  border: 0;\n  border-left: 3px solid transparent;\n  background: transparent;\n  color: #666;\n  text-align: left;\n  font-size: 11px;\n}\n\n.menu-back {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  width: 100%;\n  padding: 8px 7px;\n  border: 0;\n  border-left: 3px solid transparent;\n  background: transparent;\n  text-align: left;\n  font-size: 11px;\n  color: inherit;\n  margin-bottom: 5px;\n}\n\n.menu-item:hover {\n  border-left-color: var(--hd-ink);\n  background: #ececec;\n  color: var(--hd-ink);\n}\n\n.menu-item.active {\n  border-left-color: var(--hd-ink);\n  background: #ececec;\n  color: var(--hd-ink);\n}\n\n.menu-back:hover {\n  border-left-color: var(--hd-ink);\n  background: #ececec;\n  color: var(--hd-ink);\n}\n\n.menu-swatch {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  flex: 0 0 12px;\n}\n\n.filter-section {\n  margin-top: 30px;\n  padding-top: 25px;\n  border-top: 1px solid #ddd;\n}\n\n.filter-section label {\n  display: block;\n  font-size: 12px;\n  margin: 15px 0 8px;\n}\n\n.filter-section select {\n  width: 100%;\n  padding: 11px;\n  background: var(--hd-paper);\n  border: 1px solid #ccc;\n}\n\n.side-note {\n  font-size: 10px;\n  line-height: 2;\n  color: #999;\n  margin-top: 40px;\n}\n\n@media (max-width:700px) {\n  .sidebar {\n    display: none;\n    height: auto;\n    max-height: 40vh;\n    flex-shrink: 0;\n    overflow-y: scroll;\n  }\n  .sidebar.show {\n    display: block;\n  }\n}\n";

  // src/animations/shared/styles.css
  var styles_default5 = ".menu-item {\n  opacity: 0;\n  transform: translateX(-8px);\n  animation: menuItemEnter var(--hd-time-menuEnter) cubic-bezier(.16,1,.3,1) both;\n  animation-delay: calc(var(--hd-time-menuDelay) + (var(--menu-index,0) * var(--hd-time-menuStep)));\n}\n\n.menu-back {\n  animation-delay: calc(var(--hd-time-menuDelay) + (var(--menu-index,0) * var(--hd-time-menuStep)));\n  opacity: 1;\n  transform: none;\n  animation: none;\n}\n\n@keyframes menuItemEnter {\n  from {\n    opacity: 0;\n    transform: translateX(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n.world {\n  animation: worldIn var(--hd-time-worldEnter) ease both;\n}\n\n@keyframes worldIn {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.natural-feature img {\n  transform: rotate(-10deg);\n}\n\n.sport-shoe {\n  transform: rotate(-18deg);\n}\n\n.speed-lines {\n  transform: rotate(30deg);\n}\n\n.craft-stamp {\n  transform: rotate(15deg);\n}\n\n.craft-title h1 {\n  transform: rotate(-2deg);\n}\n\n.craft-photo {\n  transform: rotate(4deg);\n}\n\n.urban-graphic {\n  transform: rotate(-15deg);\n}\n\n.detail-tabs button {\n  transition: var(--hd-time-tabHover);\n}\n\n.detail-image {\n  transition: opacity var(--hd-time-detailImage) ease, transform var(--hd-time-detailImage) ease;\n}\n\n@media (prefers-reduced-motion:reduce) {\n  .world {\n    animation: none;\n    transition: none;\n  }\n}\n";

  // src/features/catalog/styles.css
  var styles_default6 = ".catalog {\n  padding: 55px 5%;\n  min-height: 350px;\n  overflow-anchor: none;\n}\n\n.catalog-back {\n  display: inline-flex;\n  align-items: center;\n  margin: 0 0 10px;\n  padding: 9px 0;\n  border: 0;\n  border-bottom: 1px solid currentColor;\n  background: transparent;\n  color: inherit;\n  font-size: 13px;\n  font-weight: bold;\n}\n\n.catalog-current-item {\n  margin: 0 0 22px;\n  font-size: 12px;\n  letter-spacing: 1.4px;\n}\n\n.catalog-leave-forward {\n  pointer-events: none;\n}\n\n.catalog-leave-back {\n  pointer-events: none;\n}\n\n.catalog-layers {\n  position: relative;\n  isolation: isolate;\n}\n\n.catalog-incoming {\n  position: relative;\n  z-index: 1;\n}\n\n.catalog-outgoing {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  pointer-events: none;\n}\n\n.catalog-enter-forward {\n  overflow: visible;\n}\n\n.catalog-enter-back {\n  overflow: visible;\n}\n\n.product-grid {\n  display: grid;\n  grid-template-columns: repeat(4,minmax(0,1fr));\n  gap: 22px;\n  margin-top: 30px;\n}\n\n.empty {\n  grid-column: 1/-1;\n}\n\n@media (max-width:1100px) {\n  .product-grid {\n    grid-template-columns: repeat(2,minmax(0,1fr));\n  }\n}\n\n@media (max-width:700px) {\n  .catalog {\n    padding: 35px 12px;\n  }\n  .product-grid {\n    gap: 12px;\n  }\n}\n";

  // src/animations/catalog/styles.css
  var styles_default7 = ".catalog-current-item {\n  opacity: .7;\n}\n\n.catalog-leave-forward > * {\n  animation: catalogLeaveForward var(--hd-time-catalogLeave) cubic-bezier(.45,0,.2,1) both;\n}\n\n.catalog-leave-back > * {\n  animation: catalogLeaveBack var(--hd-time-catalogLeave) cubic-bezier(.45,0,.2,1) both;\n}\n\n.catalog-enter-forward .catalog-outgoing {\n  animation: catalogOutgoingForward var(--hd-time-catalogOutgoing) cubic-bezier(.4,0,.2,1) both;\n}\n\n.catalog-enter-back .catalog-outgoing {\n  animation: catalogOutgoingBack var(--hd-time-catalogOutgoing) cubic-bezier(.4,0,.2,1) both;\n}\n\n.catalog-enter-forward .catalog-incoming > :not(.product-grid) {\n  animation: catalogTitleEnter var(--hd-time-catalogTitle) cubic-bezier(.16,1,.3,1) both;\n}\n\n.catalog-enter-back .catalog-incoming > :not(.product-grid) {\n  animation: catalogTitleEnter var(--hd-time-catalogTitle) cubic-bezier(.16,1,.3,1) both;\n}\n\n.catalog-enter-forward .catalog-incoming .product-card {\n  animation: catalogCardEnter var(--hd-time-catalogCard) cubic-bezier(.16,1,.3,1) both;\n  animation-delay: calc(var(--hd-time-catalogCardDelay) + (var(--catalog-card-index,0) * var(--hd-time-catalogCardDelay)));\n}\n\n.catalog-enter-back .catalog-incoming .product-card {\n  animation: catalogCardEnter var(--hd-time-catalogCard) cubic-bezier(.16,1,.3,1) both;\n  animation-delay: calc(var(--hd-time-catalogCardDelay) + (var(--catalog-card-index,0) * var(--hd-time-catalogCardDelay)));\n  animation-name: catalogCardEnterBack;\n}\n\n.product-card.is-selected {\n  transform: scale(1.025);\n}\n\n@keyframes catalogLeaveForward {\n  to {\n    opacity: 0;\n    transform: translateX(-24px);\n  }\n}\n\n@keyframes catalogLeaveBack {\n  to {\n    opacity: 0;\n    transform: translateX(24px);\n  }\n}\n\n@keyframes catalogOutgoingForward {\n  from {\n    opacity: .16;\n    transform: translateX(-10px);\n  }\n  to {\n    opacity: 0;\n    transform: translateX(-28px);\n  }\n}\n\n@keyframes catalogOutgoingBack {\n  from {\n    opacity: .16;\n    transform: translateX(10px);\n  }\n  to {\n    opacity: 0;\n    transform: translateX(28px);\n  }\n}\n\n@keyframes catalogTitleEnter {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes catalogCardEnter {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes catalogCardEnterBack {\n  from {\n    opacity: 0;\n    transform: translateX(-20px) translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0) translateY(0);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .catalog-menu * {\n    animation: none !important;\n    transition: none !important;\n  }\n  .catalog * {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n";

  // src/components/product-card/styles.css
  var styles_default8 = ".product-card.is-selected {\n  box-shadow: 0 12px 28px #0002;\n}\n\n.product-card {\n  border: 0;\n  padding: 0;\n  background: var(--hd-paper);\n  text-align: left;\n  min-width: 0;\n  width: 100%;\n}\n\n.product-card:hover {\n  box-shadow: 0 10px 25px #0002;\n}\n\n.product-photo {\n  overflow: hidden;\n}\n\n.product-photo img {\n  display: block;\n  width: 100%;\n}\n\n.product-text {\n  padding: 17px;\n}\n\n.product-text small {\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n\n.product-text h3 {\n  font-size: 16px;\n  font-weight: 500;\n  margin: 10px 0;\n}\n\n.product-text p {\n  font-size: 14px;\n}\n\n.product-text span {\n  font-size: 10px;\n  letter-spacing: 1px;\n}\n\n@media (max-width:700px) {\n  .product-text {\n    padding: 11px;\n  }\n  .product-text h3 {\n    font-size: 14px;\n  }\n}\n";

  // src/features/brands/sungenova/styles.css
  var styles_default9 = '.natural {\n  background: #f3eee6;\n  color: #534533;\n  font-family: Georgia,"Yu Mincho",serif;\n}\n\n.natural-hero {\n  grid-template-columns: 1fr 1fr;\n  gap: 30px;\n  align-items: center;\n  padding: 70px 7%;\n  min-height: 520px;\n  display: none;\n}\n\n.natural-hero small {\n  letter-spacing: 3px;\n  font-size: 11px;\n}\n\n.natural-hero h1 {\n  font-size: clamp(45px,6vw,90px);\n  font-weight: 400;\n  line-height: 1.07;\n  margin: 32px 0;\n}\n\n.natural-hero p {\n  font-size: 20px;\n}\n\n.natural-hero span {\n  font-size: 12px;\n}\n\n.natural-feature {\n  position: relative;\n  overflow: hidden;\n  background: #d6c6ad;\n  aspect-ratio: 4/5;\n  display: grid;\n  place-items: center;\n}\n\n.natural-sun {\n  position: absolute;\n  width: 55%;\n  aspect-ratio: 1;\n  background: #f5e7cc;\n  border-radius: 50%;\n  right: 10%;\n  top: 10%;\n}\n\n.natural-feature img {\n  position: relative;\n}\n\n.natural-heading {\n  text-align: center;\n}\n\n.natural-heading small {\n  letter-spacing: 3px;\n  font-size: 11px;\n}\n\n.natural-heading h2 {\n  font-size: 39px;\n  font-weight: 400;\n}\n\n.natural .product-card {\n  background: #faf8f5;\n}\n\n.natural .product-text {\n  text-align: center;\n}\n\n@media (max-width:700px) {\n  .natural-hero {\n    grid-template-columns: 1fr;\n    min-height: 0;\n    padding: 40px 6%;\n  }\n  .natural-feature {\n    aspect-ratio: 5/3;\n  }\n}\n';

  // src/features/brands/lunafit/styles.css
  var styles_default10 = ".sport {\n  background: #d9eefb;\n  color: #102b4b;\n  font-family: Arial,sans-serif;\n}\n\n.sport-hero {\n  position: relative;\n  overflow: hidden;\n  min-height: 540px;\n  padding: 55px 6%;\n  color: white;\n  background: linear-gradient( 125deg, #092b6b, #166cef 65%, #32d6f3 );\n  display: none;\n}\n\n.sport-hero small {\n  letter-spacing: 3px;\n}\n\n.sport-hero h1 {\n  position: relative;\n  z-index: 2;\n  font-size: clamp(62px,10vw,155px);\n  font-weight: 900;\n  font-style: italic;\n  line-height: .85;\n  letter-spacing: -6px;\n  margin: 90px 0 40px;\n}\n\n.sport-hero h1 em {\n  font-style: inherit;\n  color: #8af3ff;\n}\n\n.sport-hero strong {\n  position: relative;\n  z-index: 2;\n}\n\n.sport-shoe {\n  position: absolute;\n  width: 68%;\n  top: 17%;\n  right: -17%;\n  filter: drop-shadow( 0 20px 20px #0018 );\n}\n\n.sport .catalog h2 {\n  font-size: 32px;\n  font-weight: 900;\n}\n\n.sport .product-grid {\n  gap: 14px;\n}\n\n.sport .product-card {\n  border: 2px solid #193b63;\n  box-shadow: 7px 7px 0 #193b63;\n}\n\n.sport .product-text h3 {\n  font-weight: 900;\n  text-transform: uppercase;\n}\n\n@media (max-width:700px) {\n  .sport-hero {\n    min-height: 400px;\n  }\n  .sport-hero h1 {\n    letter-spacing: -3px;\n  }\n  .sport-shoe {\n    width: 82%;\n    top: 29%;\n    right: -26%;\n  }\n}\n";

  // src/features/brands/reina/styles.css
  var styles_default11 = '.elegant {\n  background: #f5eeec;\n  color: #4b2c3b;\n  font-family: Georgia,"Yu Mincho",serif;\n}\n\n.elegant-hero {\n  padding: 45px 8% 60px;\n  background: #3d2432;\n  color: #f3e4de;\n  text-align: center;\n  display: none;\n}\n\n.elegant-hero>small {\n  font-size: 10px;\n  letter-spacing: 4px;\n}\n\n.elegant-frame {\n  max-width: 780px;\n  margin: 40px auto 25px;\n  padding: 40px 8% 15px;\n  border: 1px solid #ad8497;\n}\n\n.elegant-frame h1 {\n  font-size: clamp(65px,11vw,145px);\n  font-weight: 400;\n  letter-spacing: 9px;\n  margin: 15px 0;\n}\n\n.elegant-frame p {\n  font-style: italic;\n  letter-spacing: 3px;\n}\n\n.elegant-frame img {\n  width: 75%;\n  max-width: 470px;\n  margin-top: 25px;\n}\n\n.elegant-hero>span {\n  font-size: 12px;\n  font-style: italic;\n}\n\n.elegant-heading {\n  text-align: center;\n}\n\n.elegant-heading small {\n  letter-spacing: 4px;\n}\n\n.elegant-heading h2 {\n  font-size: 45px;\n  font-weight: 400;\n  font-style: italic;\n}\n\n.elegant .product-card {\n  background: transparent;\n  border-bottom: 1px solid #b99ca8;\n}\n\n.elegant .product-text {\n  text-align: center;\n}\n\n@media (max-width:700px) {\n  .elegant-frame h1 {\n    letter-spacing: 3px;\n  }\n}\n';

  // src/features/brands/moca/styles.css
  var styles_default12 = '.craft {\n  background: #e7dfca;\n  color: #505a3b;\n  font-family: Georgia,"Yu Mincho",serif;\n}\n\n.craft-hero {\n  position: relative;\n  overflow: hidden;\n  min-height: 510px;\n  padding: 65px 7%;\n  grid-template-columns: 1fr 1fr;\n  gap: 30px;\n  align-items: center;\n  background: repeating-linear-gradient( 0deg, #e8e0cc, #e8e0cc 3px, #e5dcc6 4px );\n  display: none;\n}\n\n.craft-stamp {\n  position: absolute;\n  right: 30px;\n  top: 24px;\n  width: 105px;\n  height: 105px;\n  border: 2px dashed #65704e;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  text-align: center;\n  font: 10px Arial;\n}\n\n.craft-title small {\n  font: 11px Arial;\n  letter-spacing: 2px;\n}\n\n.craft-title h1 {\n  font-size: clamp(42px,6vw,80px);\n  line-height: 1.12;\n}\n\n.craft-title p {\n  font-size: 20px;\n}\n\n.craft-photo {\n  padding: 18px;\n  background: #d0c5aa;\n  border: 12px solid #faf4e6;\n  box-shadow: 13px 13px 0 #c3b59a;\n}\n\n.craft .catalog h2 {\n  font-size: 42px;\n  font-weight: 400;\n}\n\n.craft .product-card {\n  background: #f8f1df;\n}\n\n@media (max-width:700px) {\n  .craft-hero {\n    grid-template-columns: 1fr;\n    min-height: 0;\n    padding: 40px 6%;\n  }\n}\n';

  // src/features/brands/urban/styles.css
  var styles_default13 = ".urban {\n  background: #111;\n  color: var(--hd-paper);\n  font-family: Arial,sans-serif;\n}\n\n.urban-hero {\n  position: relative;\n  min-height: 620px;\n  padding: 40px 5%;\n  overflow: hidden;\n  display: none;\n}\n\n.urban-meta {\n  display: flex;\n  justify-content: space-between;\n  font-size: 11px;\n  letter-spacing: 3px;\n  gap: 15px;\n}\n\n.urban-hero h1 {\n  position: relative;\n  z-index: 2;\n  font-size: clamp(95px,17vw,250px);\n  font-weight: 900;\n  line-height: .74;\n  letter-spacing: -11px;\n  margin: 95px 0 0;\n}\n\n.urban-hero h1 span {\n  color: #f26441;\n}\n\n.urban-graphic {\n  position: absolute;\n  width: 55%;\n  right: -7%;\n  top: 21%;\n}\n\n.urban-graphic img {\n  filter: grayscale(1) contrast(1.1);\n}\n\n.urban-caption {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 75px;\n  gap: 15px;\n}\n\n.urban-caption strong {\n  font-size: 29px;\n  color: #f26441;\n}\n\n.urban-caption small {\n  letter-spacing: 2px;\n}\n\n.urban .catalog {\n  background: #eee;\n  color: #111;\n}\n\n.urban .catalog h2 {\n  font-size: 31px;\n  font-weight: 900;\n  padding-bottom: 15px;\n  border-bottom: 5px solid #111;\n}\n\n.urban .product-grid {\n  gap: 8px;\n}\n\n.urban .product-card {\n  border: 2px solid #111;\n}\n\n.urban .product-text h3 {\n  font-weight: 900;\n  text-transform: uppercase;\n}\n\n@media (max-width:700px) {\n  .urban-hero {\n    min-height: 400px;\n  }\n  .urban-hero h1 {\n    letter-spacing: -6px;\n    margin-top: 85px;\n  }\n  .urban-graphic {\n    width: 65%;\n    top: 28%;\n    right: -12%;\n  }\n}\n";

  // src/features/product-detail/styles.css
  var styles_default14 = '.overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 99999;\n  background: #000a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 15px;\n}\n\n.modal {\n  position: relative;\n  width: min(940px,100%);\n  max-height: 92vh;\n  overflow: auto;\n  background: white;\n  color: var(--hd-ink);\n  padding: 30px;\n  font-family: var(--hd-body-font);\n}\n\n.modal-close {\n  position: absolute;\n  right: 13px;\n  top: 10px;\n  border: 0;\n  background: none;\n  font-size: 32px;\n  z-index: 2;\n}\n\n.detail-tabs {\n  display: flex;\n  border-bottom: 1px solid #ddd;\n  margin: 0 35px 20px 0;\n}\n\n.detail-tabs button {\n  flex: 1;\n  padding: 16px 10px;\n  border: 0;\n  border-bottom: 3px solid transparent;\n  background: transparent;\n  color: #777;\n  cursor: pointer;\n}\n\n.detail-tabs button:hover {\n  color: var(--hd-ink);\n  background: #f8f8f8;\n}\n\n.detail-tabs button.active {\n  border-bottom-color: var(--hd-ink);\n  color: var(--hd-ink);\n  font-weight: bold;\n}\n\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 35px;\n  margin-top: 25px;\n}\n\n.detail-left-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  min-width: 0;\n}\n\n.detail-info h2 {\n  font-size: 26px;\n  font-weight: 500;\n}\n\n.detail-price {\n  font-size: 23px;\n  margin: 24px 0;\n}\n\n.detail-info label {\n  display: block;\n  font-size: 13px;\n  margin: 18px 0 9px;\n}\n\n.detail-info select {\n  width: 100%;\n  padding: 13px;\n  border: 1px solid #ccc;\n}\n\n.detail-info input {\n  width: 100%;\n  padding: 13px;\n  border: 1px solid #ccc;\n}\n\n.description-content {\n  padding: 12px 0;\n  line-height: 1.9;\n}\n\n.description-content h3 {\n  font-size: 20px;\n  font-weight: 500;\n  margin: 0 0 18px;\n}\n\n.description-content h4 {\n  font-size: 13px;\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 9px;\n  margin: 25px 0 10px;\n}\n\n.description-content p {\n  font-size: 14px;\n  color: #555;\n  white-space: pre-line;\n}\n\n.description-brand {\n  font-size: 11px;\n  letter-spacing: 2px;\n  color: #888;\n  margin-bottom: 15px;\n}\n\n.description-note {\n  padding: 15px;\n  margin-top: 22px;\n  background: #f6f6f6;\n  color: #777;\n  font-size: 12px;\n}\n\n@media (max-width:700px) {\n  .detail-grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .modal {\n    padding: 20px;\n  }\n  .detail-tabs button {\n    padding: 13px 8px;\n    font-size: 13px;\n  }\n}\n\n.modal:has(.detail-grid) {\n  width: min(1100px,96vw);\n  height: min(760px,92dvh);\n  max-height: 92dvh;\n  padding: 20px;\n  overflow: hidden;\n}\n\n.modal:has(.detail-grid) #modalBody {\n  position: relative;\n  height: 100%;\n  min-height: 0;\n  overflow: hidden;\n}\n\n.modal:has(.detail-grid) .detail-tabs {\n  display: none;\n}\n\n.modal:has(.detail-grid) .detail-grid {\n  display: grid;\n  grid-template-columns: minmax(0,46%) minmax(0,54%);\n  gap: 0;\n  height: 100%;\n  min-height: 0;\n  margin-top: 0;\n}\n\n.modal:has(.detail-grid) .detail-grid > div:first-child {\n  height: 100%;\n  min-height: 0;\n  padding: 8px 22px 8px 4px;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  border-right: 1px solid #ddd;\n}\n\n.modal:has(.detail-grid) .detail-info {\n  height: 100%;\n  min-height: 0;\n  padding: 10px 18px 15px 26px;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n}\n\n.modal:has(.detail-grid) .detail-info h2 {\n  margin: 10px 0 20px;\n}\n\n.modal:has(.detail-grid) .detail-gallery-navigation {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  align-items: center;\n  width: 100%;\n  margin: 0 0 22px;\n  padding: 13px 15px 11px;\n  border: 1px solid #bdbdbd;\n  background: #f8f8f7;\n  color: var(--hd-ink);\n  text-align: left;\n  cursor: pointer;\n}\n\n.modal:has(.detail-grid) .detail-gallery-label {\n  font: 600 12px/1 var(--hd-body-font);\n  letter-spacing: .14em;\n}\n\n.modal:has(.detail-grid) .detail-gallery-arrow {\n  grid-column: 2;\n  grid-row: 1 / span 2;\n  font-size: 18px;\n}\n\n.modal:has(.detail-grid) .detail-gallery-navigation small {\n  display: block;\n  margin-top: 6px;\n  color: #777;\n  font: 400 10px/1.2 var(--hd-body-font);\n  letter-spacing: .03em;\n}\n\n.modal:has(.detail-grid) .detail-gallery-navigation:hover {\n  border-color: var(--hd-ink);\n  background: #f1f1ef;\n}\n\n.modal:has(.detail-grid) #descriptionPanel {\n  display: block;\n}\n\n.product-image-zoom {\n  position: absolute;\n  inset: 0;\n  z-index: 6;\n  display: grid;\n  min-height: 0;\n  place-items: center;\n  padding: 42px 28px 24px;\n  background: rgba(250,250,249,.98);\n}\n\n.product-image-zoom-close {\n  position: absolute;\n  top: 9px;\n  right: 11px;\n  z-index: 1;\n  width: 32px;\n  height: 32px;\n  border: 0;\n  background: transparent;\n  color: var(--hd-ink);\n  font-size: 27px;\n  line-height: 1;\n  cursor: pointer;\n}\n\n.product-image-zoom-image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  object-fit: contain;\n  background: #f4f2ef;\n}\n\n@media (max-width:700px) {\n  .modal:has(.detail-grid) {\n    width: 100%;\n    height: 94dvh;\n    max-height: 94dvh;\n    padding: 12px;\n  }\n  .modal:has(.detail-grid) .detail-grid {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(0,56%) minmax(0,44%);\n  }\n  .modal:has(.detail-grid) .detail-grid > div:first-child {\n    padding: 4px 8px;\n    border-right: 0;\n    border-bottom: 1px solid #ddd;\n  }\n  .modal:has(.detail-grid) .detail-info {\n    padding: 14px 8px;\n  }\n  .product-image-zoom {\n    padding: 38px 12px 14px;\n  }\n}\n\n.modal:has(.detail-grid) .detail-left-panel {\n  min-width: 0;\n  height: 100%;\n  padding: 10px 16px 14px 6px;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 12px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  overscroll-behavior: contain;\n  box-sizing: border-box;\n  border-right: 1px solid #ddd;\n}\n\n.modal:has(.detail-grid) #purchasePanel {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  flex: 0 0 auto;\n  container-type: inline-size;\n}\n\n.modal:has(.detail-grid) .detail-purchase-group {\n  display: grid;\n  grid-template-columns: 90px 70px 52px minmax(0,1fr);\n  align-items: end;\n  gap: 6px;\n  width: 100%;\n  min-width: 0;\n}\n\n.modal:has(.detail-grid) .purchase-field {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  gap: 5px;\n  min-width: 0;\n}\n\n.modal:has(.detail-grid) #purchasePanel .purchase-field label {\n  display: block;\n  margin: 0;\n  padding: 0;\n  font-size: 11px;\n  line-height: 14px;\n  color: #666;\n}\n\n@container (max-width:350px) {\n  .modal:has(.detail-grid) .detail-purchase-group {\n    grid-template-columns: 90px 70px minmax(52px,1fr);\n    row-gap: 8px;\n  }\n}\n\n.modal:has(.detail-grid) .purchase-size {\n  flex: 0 0 90px;\n  width: 90px;\n}\n\n.modal:has(.detail-grid) #detailSize {\n  width: 100%;\n  height: 36px;\n  padding: 4px;\n  border: 1px solid #ccc;\n  background: var(--hd-paper);\n  font-size: 12px;\n}\n\n.modal:has(.detail-grid) .purchase-quantity {\n  flex: 0 0 70px;\n  width: 70px;\n}\n\n.modal:has(.detail-grid) .detail-quantity {\n  position: relative;\n  width: 70px;\n  height: 36px;\n}\n\n.modal:has(.detail-grid) #detailQty {\n  width: 100%;\n  height: 36px;\n  padding: 5px 22px 5px 6px;\n  font-size: 12px;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  appearance: textfield;\n  -moz-appearance: textfield;\n}\n\n.modal:has(.detail-grid) #detailQty::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.modal:has(.detail-grid) #detailQty::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.modal:has(.detail-grid) .detail-quantity button {\n  position: absolute;\n  right: 2px;\n  width: 18px;\n  height: 16px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  font-size: 10px;\n  line-height: 16px;\n}\n\n.modal:has(.detail-grid) .detail-quantity button[data-qty-step="1"] {\n  top: 1px;\n}\n\n.modal:has(.detail-grid) .detail-quantity button[data-qty-step="-1"] {\n  bottom: 1px;\n}\n\n@media (max-width:700px) {\n  .modal:has(.detail-grid) .detail-left-panel {\n    padding: 4px 8px;\n    border-right: 0;\n    border-bottom: 1px solid #ddd;\n  }\n}\n';

  // src/animations/modal/styles.css
  var styles_default15 = ".overlay.modal-opening {\n  animation: modalBackdropIn var(--hd-time-modalOpen) cubic-bezier(.16,1,.3,1) both;\n}\n\n.overlay.modal-opening .modal {\n  animation: modalExpandIn var(--hd-time-modalOpen) cubic-bezier(.16,1,.3,1) both;\n  transform-origin: center center;\n  will-change: transform,opacity;\n}\n\n.overlay.modal-opening #modalBody {\n  animation: modalContentsIn var(--hd-time-modalContent) cubic-bezier(.16,1,.3,1) var(--hd-time-modalContentDelay) both;\n}\n\n.overlay.modal-closing {\n  animation: modalBackdropOut var(--hd-time-modalClose) cubic-bezier(.7,0,.84,0) both;\n}\n\n.overlay.modal-closing .modal {\n  animation: modalShrinkOut var(--hd-time-modalClose) cubic-bezier(.7,0,.84,0) both;\n  transform-origin: center center;\n  will-change: transform,opacity;\n}\n\n@keyframes modalBackdropIn {\n  from {\n    opacity: 0;\n    background: rgba(0,0,0,0);\n  }\n  to {\n    opacity: 1;\n    background: #000a;\n  }\n}\n\n@keyframes modalExpandIn {\n  from {\n    opacity: 0;\n    transform: scale(.65);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n@keyframes modalContentsIn {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes modalBackdropOut {\n  from {\n    opacity: 1;\n    background: #000a;\n  }\n  to {\n    opacity: 0;\n    background: rgba(0,0,0,0);\n  }\n}\n\n@keyframes modalShrinkOut {\n  from {\n    opacity: 1;\n    transform: scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: scale(.65);\n  }\n}\n";

  // src/components/product-image/styles.css
  var styles_default16 = ".detail-image {\n  width: 100%;\n  display: block;\n  object-fit: contain;\n}\n\n.detail-image-frame {\n  width: min(100%,360px);\n  aspect-ratio: 1;\n  margin: 0 auto;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  background: #fafafa;\n}\n\n.detail-image-frame .detail-image {\n  width: 100%;\n  height: 100%;\n}\n\n.modal:has(.detail-grid) .detail-image-frame {\n  position: relative;\n  width: min(100%,400px,48dvh);\n  aspect-ratio: 1 / 1;\n  height: auto;\n  flex: 0 0 auto;\n  margin: 0 auto;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  background: #fafafa;\n  cursor: zoom-in;\n}\n\n.modal:has(.detail-grid) .detail-view-selector {\n  display: flex;\n  justify-content: center;\n  gap: 6px;\n  flex: 0 0 auto;\n}\n\n.modal:has(.detail-grid) .detail-view-button {\n  padding: 6px 10px;\n  border: 1px solid #c9c9c9;\n  background: transparent;\n  color: #666;\n  font: 500 10px/1 var(--hd-body-font);\n  letter-spacing: .09em;\n  cursor: pointer;\n}\n\n.modal:has(.detail-grid) .detail-view-button:hover,\n.modal:has(.detail-grid) .detail-view-button.active {\n  border-color: var(--hd-ink);\n  background: var(--hd-ink);\n  color: var(--hd-paper);\n}\n\n.modal:has(.detail-grid) .detail-image-zoom-button {\n  position: absolute;\n  top: 9px;\n  right: 9px;\n  z-index: 1;\n  padding: 5px 7px;\n  border: 1px solid rgba(60,60,60,.24);\n  background: rgba(255,255,255,.8);\n  color: #555;\n  font: 500 10px/1 var(--hd-body-font);\n  letter-spacing: .06em;\n  cursor: pointer;\n}\n\n.modal:has(.detail-grid) .detail-image-zoom-button:hover {\n  border-color: rgba(30,30,30,.6);\n  color: var(--hd-ink);\n}\n\n.modal:has(.detail-grid) .detail-image-frame .detail-image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  max-height: none;\n  object-fit: contain;\n}\n\n@media (max-width:700px) {\n  .modal:has(.detail-grid) .detail-image-frame {\n    width: min(100%,280px);\n  }\n}\n";

  // src/components/color-selector/styles.css
  var styles_default17 = ".detail-color-thumbnails {\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n  padding: 2px 1px 5px;\n  scrollbar-gutter: stable;\n}\n\n.detail-color-thumb {\n  flex: 0 0 60px;\n  padding: 2px;\n  border: 1px solid #ddd;\n  background: var(--hd-paper);\n  color: #555;\n  text-align: center;\n}\n\n.detail-color-thumb.active {\n  border: 2px solid #222;\n  padding: 1px;\n}\n\n.detail-color-thumb img {\n  display: block;\n  width: 54px;\n  height: 54px;\n  object-fit: contain;\n}\n\n.detail-color-thumb small {\n  display: block;\n  font-size: 9px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.swatches {\n  display: flex;\n  gap: 13px;\n  flex-wrap: wrap;\n}\n\n.swatch {\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n}\n\n.swatch.active {\n  outline: 2px solid #333;\n  outline-offset: 3px;\n}\n\n.modal:has(.detail-grid) .swatch {\n  width: 28px;\n  height: 28px;\n}\n\n.modal:has(.detail-grid) .swatches {\n  gap: 9px;\n}\n\n.modal:has(.detail-grid) .detail-color-thumbnails {\n  display: flex;\n  flex: 0 0 auto;\n  align-items: flex-start;\n  gap: 8px;\n  min-width: 0;\n  overflow-x: auto;\n  overflow-y: hidden;\n  padding: 3px 2px 7px;\n}\n\n.modal:has(.detail-grid) .detail-color-thumb {\n  flex: 0 0 60px;\n  width: 60px;\n  min-width: 60px;\n  padding: 2px;\n  border: 1px solid #ddd;\n  background: var(--hd-paper);\n  text-align: center;\n}\n\n.modal:has(.detail-grid) .detail-color-thumb.active {\n  border: 2px solid #222;\n  padding: 1px;\n}\n\n.modal:has(.detail-grid) .detail-color-thumb img {\n  display: block;\n  width: 54px;\n  height: 54px;\n  object-fit: contain;\n}\n\n.modal:has(.detail-grid) .detail-color-thumb small {\n  display: block;\n  font-size: 9px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n";

  // src/components/size-selector/styles.css
  var styles_default18 = ".detail-section-label {\n  font-size: 11px;\n  color: #777;\n  margin-bottom: 5px;\n}\n\n.detail-size-table {\n  display: flex;\n  gap: 5px;\n  overflow-x: auto;\n  scrollbar-gutter: stable;\n}\n\n.detail-size-cell {\n  flex: 0 0 54px;\n  padding: 6px 3px;\n  border: 1px solid #ccc;\n  background: var(--hd-paper);\n  color: #333;\n}\n\n.detail-size-cell strong {\n  display: block;\n  font-size: 11px;\n}\n\n.detail-size-cell small {\n  display: block;\n  margin-top: 3px;\n  font-size: 9px;\n  color: #52734d;\n}\n\n.detail-size-cell.selected {\n  border: 2px solid #222;\n  padding: 5px 2px;\n}\n\n.detail-size-cell.sold-out {\n  color: #aaa;\n  background: #f2f2f2;\n}\n\n.detail-size-cell.sold-out small {\n  color: #999;\n}\n\n.modal:has(.detail-grid) .detail-inventory {\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.modal:has(.detail-grid) .detail-section-label {\n  margin-bottom: 7px;\n  font-size: 11px;\n  color: #666;\n}\n\n.modal:has(.detail-grid) .detail-size-table {\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 5px;\n  overflow-x: auto;\n  overflow-y: hidden;\n  padding: 2px 1px 7px;\n}\n\n.modal:has(.detail-grid) .detail-size-cell {\n  flex: 0 0 54px;\n  width: 54px;\n  min-width: 54px;\n  min-height: 48px;\n  padding: 6px 2px;\n  border: 1px solid #ccc;\n  background: var(--hd-paper);\n  text-align: center;\n}\n\n.modal:has(.detail-grid) .detail-size-cell.selected {\n  border: 2px solid #222;\n  padding: 5px 1px;\n}\n\n.modal:has(.detail-grid) .detail-size-cell.sold-out {\n  background: #f3f3f3;\n  color: #aaa;\n  cursor: not-allowed;\n}\n";

  // src/components/buttons/cart-actions.css
  var cart_actions_default = ".primary {\n  width: 100%;\n  padding: 16px;\n  background: var(--hd-ink);\n  color: white;\n  border: 0;\n  margin-top: 22px;\n}\n\n.remove {\n  border: 0;\n  background: none;\n  text-decoration: underline;\n}\n";

  // src/components/buttons/add-to-cart.css
  var add_to_cart_default = ".modal:has(.detail-grid) #addCart {\n  flex: 0 0 52px;\n  width: 52px;\n  height: 36px;\n  margin: 0;\n  padding: 0 4px;\n  border: 0;\n  background: var(--hd-ink);\n  color: var(--hd-paper);\n  font-size: 12px;\n  white-space: nowrap;\n}\n\n.modal:has(.detail-grid) .detail-add {\n  width: 52px;\n  min-width: 0;\n  height: 36px;\n  margin: 0;\n  padding: 0 4px;\n  border: 0;\n  border-radius: 4px;\n  background: var(--hd-ink);\n  color: var(--hd-paper);\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.modal:has(.detail-grid) .detail-add:disabled {\n  background: #bbb;\n  cursor: not-allowed;\n}\n";

  // src/components/buttons/cart-view.css
  var cart_view_default = "@container (max-width:350px) {\n  .modal:has(.detail-grid) .detail-cart-view {\n    grid-column: 1 / -1;\n  }\n}\n\n.modal:has(.detail-grid) .detail-cart-view {\n  width: 100%;\n  min-width: 0;\n  height: 36px;\n  margin: 0;\n  padding: 0 4px;\n  border: 1px solid #222;\n  border-radius: 4px;\n  background: var(--hd-paper);\n  color: var(--hd-ink);\n  font-size: 10px;\n  font-weight: 500;\n  white-space: nowrap;\n  cursor: pointer;\n}\n";

  // src/features/cart/styles.css
  var styles_default19 = ".side-cart-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100000;\n  background: #0009;\n  pointer-events: none;\n}\n\n.side-cart-overlay.is-open {\n  pointer-events: auto;\n}\n\n.side-cart {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: min(400px,100vw);\n  height: 100%;\n  display: grid;\n  grid-template-rows: auto minmax(0,1fr) auto;\n  background: var(--hd-paper);\n  box-shadow: -10px 0 30px #0004;\n}\n\n.side-cart-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #ddd;\n}\n\n.side-cart-header h2 {\n  margin: 0;\n  font-size: 18px;\n}\n\n.side-cart-header button {\n  width: 36px;\n  height: 36px;\n  border: 0;\n  background: transparent;\n  font-size: 28px;\n}\n\n.side-cart-items {\n  min-height: 0;\n  overflow-y: auto;\n  padding: 0 20px;\n}\n\n.side-cart-line {\n  display: grid;\n  grid-template-columns: 72px minmax(0,1fr) auto;\n  gap: 12px;\n  padding: 16px 0;\n  border-bottom: 1px solid #ddd;\n  font-size: 12px;\n}\n\n.side-cart-line img {\n  width: 72px;\n  height: 72px;\n  object-fit: contain;\n  background: #fafafa;\n}\n\n.side-cart-line div {\n  min-width: 0;\n}\n\n.side-cart-line small {\n  display: block;\n  color: #666;\n  margin-top: 3px;\n}\n\n.side-cart-line>strong {\n  white-space: nowrap;\n}\n\n.side-cart-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 6px;\n}\n\n.side-cart-actions button:not(.remove) {\n  width: 26px;\n  height: 26px;\n  border: 1px solid #ccc;\n  background: var(--hd-paper);\n}\n\n.side-cart-actions span {\n  min-width: 20px;\n  text-align: center;\n}\n\n.side-cart-actions .remove {\n  margin-left: auto;\n  border: 0;\n  background: transparent;\n  text-decoration: underline;\n}\n\n.side-cart-empty {\n  padding: 24px;\n  text-align: center;\n  color: #666;\n}\n\n.side-cart-footer {\n  padding: 16px 20px 20px;\n  border-top: 1px solid #ddd;\n}\n\n.side-cart-footer>div {\n  display: flex;\n  justify-content: space-between;\n  font-size: 18px;\n  margin-bottom: 14px;\n}\n\n.side-cart-footer .primary {\n  width: 100%;\n  margin: 0;\n  padding: 13px;\n}\n\n@media (max-width:700px) {\n  .side-cart {\n    width: 100vw;\n  }\n  .side-cart-items {\n    padding: 0 16px;\n  }\n  .side-cart-footer {\n    padding: 14px 16px 16px;\n  }\n}\n";

  // src/animations/cart/styles.css
  var styles_default20 = ".side-cart-overlay {\n  opacity: 0;\n  transition: opacity var(--hd-time-cartSlide) ease;\n}\n\n.side-cart-overlay.is-open {\n  opacity: 1;\n}\n\n.side-cart {\n  transform: translateX(100%);\n  transition: transform var(--hd-time-cartSlide) cubic-bezier(.22,1,.36,1);\n}\n\n.side-cart-overlay.is-open .side-cart {\n  transform: translateX(0);\n}\n";

  // src/features/product-gallery/styles.css
  var styles_default21 = ".product-gallery {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  display: grid;\n  grid-template-rows: minmax(0,1fr) auto;\n  gap: 12px;\n  padding: 40px 28px 22px;\n  background: rgba(250,250,249,.98);\n}\n\n.product-gallery-close {\n  position: absolute;\n  top: 9px;\n  right: 11px;\n  z-index: 1;\n  width: 32px;\n  height: 32px;\n  border: 0;\n  background: transparent;\n  color: var(--hd-ink);\n  font-size: 27px;\n  line-height: 1;\n  cursor: pointer;\n}\n\n.product-gallery-stage {\n  position: relative;\n  display: grid;\n  min-height: 0;\n  place-items: center;\n  background: #f4f2ef;\n}\n\n.product-gallery-image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  object-fit: contain;\n}\n\n.product-gallery-arrow {\n  position: absolute;\n  top: 50%;\n  z-index: 1;\n  width: 34px;\n  height: 34px;\n  border: 1px solid #bbb;\n  border-radius: 50%;\n  background: rgba(255,255,255,.86);\n  color: var(--hd-ink);\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n  transform: translateY(-50%);\n}\n\n.product-gallery-arrow-prev { left: 14px; }\n.product-gallery-arrow-next { right: 14px; }\n\n.product-gallery-footer {\n  display: grid;\n  justify-items: center;\n  gap: 7px;\n}\n\n.product-gallery-count {\n  margin: 0;\n  color: #666;\n  font-size: 11px;\n  letter-spacing: .12em;\n}\n\n.product-gallery-thumbnails {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  max-width: 100%;\n  overflow-x: auto;\n}\n\n.product-gallery-thumbnail {\n  display: grid;\n  grid-template-columns: 45px auto;\n  align-items: center;\n  gap: 7px;\n  flex: 0 0 auto;\n  padding: 3px 8px 3px 3px;\n  border: 1px solid #d0d0d0;\n  background: transparent;\n  color: #666;\n  font: 500 10px/1 var(--hd-body-font);\n  letter-spacing: .06em;\n  cursor: pointer;\n}\n\n.product-gallery-thumbnail img {\n  display: block;\n  width: 45px;\n  height: 34px;\n  object-fit: contain;\n  background: #f4f2ef;\n}\n\n.product-gallery-thumbnail.active {\n  border-color: var(--hd-ink);\n  color: var(--hd-ink);\n}\n\n@media (max-width:700px) {\n  .product-gallery {\n    padding: 38px 12px 14px;\n  }\n}\n";

  // src/styles/index.js
  var styles = [tokens_default, base_default, styles_default, styles_default2, header_default, styles_default3, styles_default4, styles_default5, styles_default6, styles_default7, navigation_default, styles_default8, styles_default9, styles_default10, styles_default11, styles_default12, styles_default13, styles_default14, styles_default15, styles_default16, styles_default17, styles_default18, cart_actions_default, add_to_cart_default, cart_view_default, styles_default19, styles_default20, styles_default21, timingStyles].join("\n");

  // src/features/header/view.js
  function headerView(cartCount) {
    return `<header class="topbar">
      <div class="brand-lockup">
        <div class="logo">HD ORIGIN STYLE</div>
        <div class="logo-subtitle">ONLINE STORE</div>
      </div>

      <div class="header-right">
        <nav class="primary-nav" aria-label="Primary navigation">
          <a class="primary-nav-link active" href="#home" aria-current="page">HOME</a>
          <a class="primary-nav-link" href="#store">STORE</a>
          <a class="primary-nav-link" href="#collection">COLLECTION</a>
          <a class="primary-nav-link" href="#about">ABOUT</a>
          <a class="primary-nav-link" href="#contact">CONTACT</a>
        </nav>

        <div class="head-actions">
          <button class="header-utility"
                  id="menuToggle">
            ☰ MENU
          </button>

          <button class="header-cart"
                  id="cartButton">
            CART <span>(${cartCount})</span>
          </button>
        </div>
      </div>
    </header>`;
  }

  // src/features/brands/navigation.js
  function brandNavigation(app) {
    return `<nav class="banner-menu"
         aria-label="ブランドを選ぶ">

      ${app.data.brands.map((b, i) => `
        <button
          class="banner
          ${b.id === app.state.current ? "active" : ""}"
          data-brand="${b.id}"
          aria-pressed="${b.id === app.state.current}">

          <img src="${app.bannerArt(b, i)}"
               alt="">

          <div class="banner-label">
            ${b.name}
            <small>${b.short}</small>
          </div>
        </button>
      `).join("")}
    </nav>`;
  }

  // src/features/sidebar/view.js
  function sidebarView(app) {
    return `<aside
        class="sidebar
        ${app.state.menuOpen ? "show" : ""}"
        id="sidebar">

        <div class="sidebar-title">
          CATEGORY
        </div>

        ${[
      "すべて",
      "コンフォート",
      "カジュアル",
      "ウォーキング"
    ].map((c) => `
          <button
            class="category
            ${app.state.category === c ? "active" : ""}"
            data-category="${c}">
            ${c === "すべて" ? "すべての商品" : c}
          </button>
        `).join("")}

        ${app.catalogMenu()}

        <div class="filter-section">
          <div class="sidebar-title">
            FILTER
          </div>

          <label>COLOR</label>
          <select id="filterColor">
            ${[
      "すべて",
      "ブラック",
      "キャメル",
      "ライトグレー"
    ].map((c) => `
              <option
                ${c === app.state.filterColor ? "selected" : ""}>
                ${c}
              </option>
            `).join("")}
          </select>

          <label>SIZE</label>
          <select id="filterSize">
            ${[
      "すべて",
      "22.5",
      "23.0",
      "23.5",
      "24.0",
      "24.5"
    ].map((s) => `
              <option
                ${s === app.state.filterSize ? "selected" : ""}>
                ${s}
              </option>
            `).join("")}
          </select>
        </div>

        <div class="side-note">
          HD ORIGIN<br>
          MULTI BRAND COLLECTION<br>
          SPRING / SUMMER 2026
        </div>
      </aside>`;
  }

  // src/layouts/main-layout.js
  function mainLayout(app, cartCount) {
    return `

    <!-- ヘッダー -->
    ${headerView(cartCount)}

    <!-- ブランドバナーメニュー -->
    ${brandNavigation(app)}

    <!-- メイン画面 -->
    <div class="layout">

      <!-- 左サブメニュー -->
      ${sidebarView(app)}

      <!-- ブランド別ページ -->
      <main class="stage">
        ${app.brandPage()}
      </main>
    </div>

    <!-- 商品詳細・カートモーダル -->
    <div class="overlay"
         id="overlay" hidden>

      <div class="modal"
           role="dialog"
           aria-modal="true"
           aria-label="商品詳細またはカート">

        <button class="modal-close"
                id="closeModal"
                aria-label="閉じる">
          ×
        </button>

        <div id="modalBody"></div>
      </div>
    </div>
    <div class="side-cart-overlay" id="sideCartOverlay" hidden>
      <aside class="side-cart" id="sideCart" role="dialog" aria-modal="true" aria-label="ショッピングカート"></aside>
    </div>
    `;
  }

  // src/layouts/render.js
  function render(app) {
    const cartCount = app.state.cart.reduce((sum, p) => sum + p.qty, 0);
    app.shadowRoot.innerHTML = `<style>${styles}</style>${mainLayout(app, cartCount)}`;
    app.bindEvents();
  }

  // src/features/brands/controller.js
  function changeBrand(app, btn) {
    if (app.state.catalogIsTransitioning) return;
    app.state.current = btn.dataset.brand;
    app.state.category = "すべて";
    app.state.filterColor = "すべて";
    app.state.filterSize = "すべて";
    app.state.catalogLevel = "items";
    app.state.selectedItemId = null;
    app.state.menuOpen = false;
    app.render();
  }

  // src/layouts/events.js
  function bindEvents(app) {
    const root = app.shadowRoot;
    root.querySelectorAll(
      "[data-brand]"
    ).forEach((btn) => {
      btn.onclick = () => {
        changeBrand(app, btn);
      };
    });
    root.querySelectorAll(
      "[data-category]"
    ).forEach((btn) => {
      btn.onclick = () => {
        if (app.state.catalogIsTransitioning) return;
        app.state.category = btn.dataset.category;
        app.render();
      };
    });
    root.querySelectorAll(
      "[data-item]"
    ).forEach((btn) => {
      btn.onclick = () => {
        app.transitionCatalog(
          "colors",
          btn.dataset.item,
          btn
        );
      };
    });
    root.querySelectorAll(
      "[data-product]"
    ).forEach((btn) => {
      btn.onclick = () => {
        app.openProduct(
          btn.dataset.product,
          Number(btn.dataset.colorIndex)
        );
      };
    });
    const catalogBack = root.getElementById("catalogBack");
    const menuBacks = root.querySelectorAll("[data-catalog-menu-back]");
    [catalogBack, ...menuBacks].filter(Boolean).forEach((back) => {
      back.onclick = () => {
        app.transitionCatalog("items", null, back);
      };
    });
    root.getElementById(
      "filterColor"
    ).onchange = (e) => {
      if (app.state.catalogIsTransitioning) return;
      app.state.filterColor = e.target.value;
      app.render();
    };
    root.getElementById(
      "filterSize"
    ).onchange = (e) => {
      if (app.state.catalogIsTransitioning) return;
      app.state.filterSize = e.target.value;
      app.render();
    };
    root.getElementById(
      "menuToggle"
    ).onclick = () => {
      app.state.menuOpen = !app.state.menuOpen;
      root.getElementById(
        "sidebar"
      ).classList.toggle(
        "show",
        app.state.menuOpen
      );
    };
    root.getElementById(
      "cartButton"
    ).onclick = () => app.openCart();
    root.getElementById("sideCartOverlay").onclick = (e) => {
      if (e.target.id === "sideCartOverlay") app.closeCart();
    };
    root.getElementById(
      "closeModal"
    ).onclick = () => app.closeModal();
    root.getElementById(
      "overlay"
    ).onclick = (e) => {
      if (e.target.id === "overlay") {
        app.closeModal();
      }
    };
  }

  // src/features/product-detail/render.js
  function renderDetail(app) {
    const p = app.state.activeProduct;
    const brand = app.data.brands.find(
      (b) => b.id === p.brand
    );
    const detailAlreadyOpen = app.state.modalOpen && !!app.shadowRoot.querySelector("#modalBody .detail-grid");
    const detailHtml = detailView(app, p, brand);
    if (detailAlreadyOpen) {
      app.shadowRoot.getElementById("modalBody").innerHTML = detailHtml;
    } else {
      app.openModal(detailHtml);
    }
    bindDetailEvents(app);
  }

  // src/element/hd-brand-shop.js
  var HdBrandShop = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      const brands = createBrands();
      this.data = { brands, products: createMockProducts(brands) };
      this.state = createInitialState();
    }
    connectedCallback() {
      this.render();
      this.keyHandler = (e) => {
        if (e.key === "Escape" && this.state.productImageZoomOpen) {
          this.closeProductImageZoom();
        } else if (e.key === "Escape" && this.state.productGalleryOpen) {
          this.closeProductGallery();
        } else if (e.key === "Escape" && this.state.modalOpen) {
          this.closeModal();
        }
      };
      document.addEventListener(
        "keydown",
        this.keyHandler
      );
    }
    disconnectedCallback() {
      document.removeEventListener(
        "keydown",
        this.keyHandler
      );
    }
    get brand() {
      return this.data.brands.find((b) => b.id === this.state.current);
    }
    money(...args) {
      return money(this, ...args);
    }
    colorCode(...args) {
      return colorCode(this, ...args);
    }
    shoe(...args) {
      return shoe(this, ...args);
    }
    productDetailImage(...args) {
      return productDetailImage(this, ...args);
    }
    productGalleryImages(...args) {
      return productGalleryImages(this, ...args);
    }
    bannerArt(...args) {
      return bannerArt(this, ...args);
    }
    filtered(...args) {
      return filtered(this, ...args);
    }
    selectedItem(...args) {
      return selectedItem(this, ...args);
    }
    catalogNavigation(...args) {
      return catalogNavigation(this, ...args);
    }
    catalogClass(...args) {
      return catalogClass(this, ...args);
    }
    catalogMenu(...args) {
      return catalogMenu(this, ...args);
    }
    mountOutgoingCatalogLayer(...args) {
      return mountOutgoingCatalogLayer(this, ...args);
    }
    transitionCatalog(...args) {
      return transitionCatalog(this, ...args);
    }
    productCards(...args) {
      return productCards(this, ...args);
    }
    openModal(...args) {
      return openModal(this, ...args);
    }
    closeModal(...args) {
      return closeModal(this, ...args);
    }
    closeCart(...args) {
      return closeCart(this, ...args);
    }
    detailSizes(...args) {
      return detailSizes(this, ...args);
    }
    detailStock(...args) {
      return detailStock(this, ...args);
    }
    openProduct(...args) {
      return openProduct(this, ...args);
    }
    validQty(...args) {
      return validQty(this, ...args);
    }
    openProductImageZoom(...args) {
      return openProductImageZoom(this, ...args);
    }
    closeProductImageZoom(...args) {
      return closeProductImageZoom(this, ...args);
    }
    openProductGallery(...args) {
      return openProductGallery(this, ...args);
    }
    closeProductGallery(...args) {
      return closeProductGallery(this, ...args);
    }
    selectProductGalleryImage(...args) {
      return selectProductGalleryImage(this, ...args);
    }
    addToCart(...args) {
      return addToCart(this, ...args);
    }
    cartTotal(...args) {
      return cartTotal(this, ...args);
    }
    refreshCartCount(...args) {
      return refreshCartCount(this, ...args);
    }
    brandPage(...args) {
      return brandPage(this, ...args);
    }
    render(...args) {
      return render(this, ...args);
    }
    bindEvents(...args) {
      return bindEvents(this, ...args);
    }
    renderDetail(...args) {
      return renderDetail(this, ...args);
    }
    openCart(...args) {
      return openCart(this, ...args);
    }
  };

  // src/entry.js
  customElements.define("hd-brand-shop", HdBrandShop);
})();
