import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRight, TrendingUp, Star, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

// ── Inline SVG icons for categories ──────────────────────────────────────────
const MenIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <circle cx="24" cy="12" r="7" fill="white" fillOpacity="0.9"/>
    <path d="M10 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <rect x="18" y="24" width="12" height="16" rx="2" fill="white" fillOpacity="0.7"/>
    <path d="M18 28h12M21 24v16M27 24v16" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
  </svg>
);

const WomenIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <circle cx="24" cy="11" r="7" fill="white" fillOpacity="0.9"/>
    <path d="M14 48l4-20h12l4 20" fill="white" fillOpacity="0.7"/>
    <path d="M13 26c0 0 3-4 11-4s11 4 11 4l2 6H11l2-6z" fill="white" fillOpacity="0.9"/>
    <path d="M20 48l4-22 4 22" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
  </svg>
);

const KidsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <circle cx="24" cy="13" r="8" fill="white" fillOpacity="0.9"/>
    <path d="M16 13c0 0 2-4 8-4s8 4 8 4" stroke="white" strokeOpacity="0.4" strokeWidth="1.5"/>
    <circle cx="21" cy="12" r="1.5" fill="white" fillOpacity="0.5"/>
    <circle cx="27" cy="12" r="1.5" fill="white" fillOpacity="0.5"/>
    <path d="M21 17c0 0 1 2 3 2s3-2 3-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="17" y="24" width="14" height="18" rx="3" fill="white" fillOpacity="0.8"/>
    <circle cx="16" cy="30" r="3.5" fill="white" fillOpacity="0.6"/>
    <circle cx="32" cy="30" r="3.5" fill="white" fillOpacity="0.6"/>
    <path d="M20 24v18M28 24v18" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
  </svg>
);

const AccessoriesIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <rect x="8" y="16" width="32" height="20" rx="10" stroke="white" strokeWidth="3" fill="none"/>
    <rect x="8" y="20" width="32" height="12" rx="6" fill="white" fillOpacity="0.2"/>
    <rect x="16" y="10" width="4" height="8" rx="2" fill="white" fillOpacity="0.8"/>
    <rect x="28" y="10" width="4" height="8" rx="2" fill="white" fillOpacity="0.8"/>
    <circle cx="24" cy="26" r="4" fill="white" fillOpacity="0.9"/>
    <circle cx="24" cy="26" r="2" fill="white" fillOpacity="0.4"/>
    <path d="M14 26h6M28 26h6" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
  </svg>
);

const FootwearIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M6 34c0 0 4-2 8-2l10-14h6l4 6c0 0 8 2 8 8v2H6v-0z" fill="white" fillOpacity="0.9"/>
    <path d="M6 34h36v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z" fill="white" fillOpacity="0.6"/>
    <path d="M20 20l-6 12" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
    <path d="M28 24c2 0 8 2 10 8" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="12" cy="30" rx="2" ry="1.5" fill="white" fillOpacity="0.3"/>
  </svg>
);

// ── Inline SVG / text logos for brands ────────────────────────────────────────
const NikeLogo = () => (
  <svg viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-8">
    <path d="M5 22L60 5c3-1 6 0 7 2s-1 5-4 6L20 22c-3 1-6-1-6-3s3-4 6-4l30-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const AdidasLogo = () => (
  <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-10">
    <path d="M30 5L8 35h44L30 5z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
    <path d="M18 25h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M13 32h34" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const PumaLogo = () => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <path d="M10 40C10 40 15 10 25 8c8-2 18 6 16 14-1 5-7 8-12 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M25 8C20 20 18 35 20 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M29 28c-2 4-5 8-9 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const LeviLogo = () => (
  <div className="flex items-center justify-center w-full h-full">
    <span style={{fontFamily:"serif", fontWeight:900, fontSize:"22px", letterSpacing:"-1px", color:"currentColor", lineHeight:1}}>
      LEVI'S
    </span>
  </div>
);

const ZaraLogo = () => (
  <div className="flex items-center justify-center w-full h-full">
    <span style={{fontFamily:"serif", fontWeight:700, fontSize:"24px", letterSpacing:"6px", color:"currentColor", lineHeight:1}}>
      ZARA
    </span>
  </div>
);

const HMLogo = () => (
  <div className="flex items-center justify-center w-full h-full">
    <span style={{fontFamily:"sans-serif", fontWeight:900, fontSize:"22px", letterSpacing:"1px", color:"currentColor", lineHeight:1}}>
      H&amp;M
    </span>
  </div>
);

const categoriesWithIcon = [
  { id: "men",         label: "Men",         Icon: MenIcon,         gradient: "linear-gradient(135deg,#3b82f6,#1d4ed8)", shadow: "0 8px 24px rgba(59,130,246,0.4)", text: "shirts, pants & more" },
  { id: "women",       label: "Women",       Icon: WomenIcon,       gradient: "linear-gradient(135deg,#ec4899,#be185d)", shadow: "0 8px 24px rgba(236,72,153,0.4)", text: "dresses, tops & more" },
  { id: "kids",        label: "Kids",        Icon: KidsIcon,        gradient: "linear-gradient(135deg,#f59e0b,#d97706)", shadow: "0 8px 24px rgba(245,158,11,0.4)", text: "fun styles for all ages" },
  { id: "accessories", label: "Accessories", Icon: AccessoriesIcon, gradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)", shadow: "0 8px 24px rgba(139,92,246,0.4)", text: "watches, bags & more" },
  { id: "footwear",    label: "Footwear",    Icon: FootwearIcon,    gradient: "linear-gradient(135deg,#10b981,#065f46)", shadow: "0 8px 24px rgba(16,185,129,0.4)", text: "sneakers, sandals & more" },
];

const brandsData = [
  { id: "nike",  label: "Nike",   Logo: NikeLogo,   bg: "#f5f5f5", color: "#111", accent: "#111",    tagline: "Just Do It" },
  { id: "adidas",label: "Adidas", Logo: AdidasLogo, bg: "#000",    color: "#fff", accent: "#fff",    tagline: "Impossible Is Nothing" },
  { id: "puma",  label: "Puma",   Logo: PumaLogo,   bg: "#e8f5e9", color: "#1b5e20", accent:"#2e7d32", tagline: "Forever Faster" },
  { id: "levi",  label: "Levi's", Logo: LeviLogo,   bg: "#e3f2fd", color: "#0d47a1", accent:"#1565c0", tagline: "Live in Levi's" },
  { id: "zara",  label: "Zara",   Logo: ZaraLogo,   bg: "#fafafa", color: "#111",    accent:"#111",    tagline: "Modern Essentials" },
  { id: "h&m",   label: "H&M",    Logo: HMLogo,     bg: "#fce4ec", color: "#c62828", accent:"#b71c1c", tagline: "Style & Quality" },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("filters", JSON.stringify({ [section]: [getCurrentItem.id] }));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(id) { dispatch(fetchProductDetails(id)); }

  function handleAddtoCart(id) {
    dispatch(addToCart({ userId: user?.id, productId: id, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart!" });
      }
    });
  }

  useEffect(() => { if (productDetails !== null) setOpenDetailsDialog(true); }, [productDetails]);

  useEffect(() => {
    if (!featureImageList?.length) return;
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % featureImageList.length), 5000);
    return () => clearInterval(t);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
    dispatch(getFeatureImages());
  }, [dispatch]);

  const slides = featureImageList?.length > 0
    ? featureImageList
    : [{ image: bannerOne }, { image: bannerTwo }, { image: bannerThree }];

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── HERO ── */}
      <div className="relative w-full h-[480px] md:h-[580px] overflow-hidden bg-gray-900">
        {slides.map((slide, i) => (
          <img key={i} src={slide?.image} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-3">
            <TrendingUp className="w-3.5 h-3.5" /> New Season
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
            Discover Your<br /><span className="text-indigo-400">Perfect Style</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-7 max-w-sm">Shop the latest trends — fast delivery, best prices.</p>
          <button onClick={() => navigate("/shop/listing")} className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-7 py-3 rounded-full w-fit hover:bg-indigo-50 transition shadow-xl text-sm">
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-7 h-2.5" : "bg-white/40 w-2.5 h-2.5"}`} />
          ))}
        </div>
        <button onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full p-2.5 transition">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full p-2.5 transition">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-400 text-sm">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {categoriesWithIcon.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavigateToListingPage(cat, "category")}
                className="group flex flex-col items-center gap-4 cursor-pointer"
              >
                {/* Icon circle */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                  style={{ background: cat.gradient, boxShadow: cat.shadow }}
                >
                  <cat.Icon />
                </div>
                {/* Label */}
                <div className="text-center">
                  <p className="font-bold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">{cat.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden sm:block">{cat.text}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY BRAND ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Top Brands</h2>
            <p className="text-gray-400 text-sm">Authentic products from world's best brands</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsData.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleNavigateToListingPage(brand, "brand")}
                className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: brand.bg }}
              >
                {/* Logo area */}
                <div className="w-full h-20 flex items-center justify-center px-3" style={{ color: brand.color }}>
                  <brand.Logo />
                </div>
                {/* Tagline */}
                <div className="pb-3 px-2 text-center">
                  <p className="text-[10px] font-medium opacity-60" style={{ color: brand.color }}>{brand.tagline}</p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl"
                  style={{ background: `${brand.accent}15` }}>
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: brand.accent }}>
                    Shop →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">Featured Products</h2>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Handpicked favourites
              </p>
            </div>
            <button onClick={() => navigate("/shop/listing")} className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition border border-indigo-100 px-4 py-2 rounded-full hover:bg-indigo-50">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {productList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList.map((p) => (
                <ShoppingProductTile key={p._id} handleGetProductDetails={handleGetProductDetails} product={p} handleAddtoCart={handleAddtoCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-300">
              <ShoppingBasket className="w-14 h-14 mx-auto mb-4 opacity-40" />
              <p className="font-semibold text-gray-400">No products yet — add from admin panel</p>
            </div>
          )}
          <div className="flex sm:hidden justify-center mt-8">
            <button onClick={() => navigate("/shop/listing")} className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 border border-indigo-200 px-6 py-2.5 rounded-full hover:bg-indigo-50 transition">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to shop?</h2>
          <p className="text-indigo-200 mb-7 text-sm">Hundreds of products. Cash on delivery. No hidden charges.</p>
          <button onClick={() => navigate("/shop/listing")} className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-9 py-3.5 rounded-full hover:bg-indigo-50 transition shadow-2xl text-sm">
            Browse All Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  );
}

export default ShoppingHome;
