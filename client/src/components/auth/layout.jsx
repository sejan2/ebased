import { Outlet } from "react-router-dom";
import { ShoppingBag, Zap, Shield, Truck } from "lucide-react";

const features = [
  { icon: Zap, text: "Lightning fast checkout" },
  { icon: Shield, text: "Secure & encrypted payments" },
  { icon: Truck, text: "Free delivery on orders over $50" },
];

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 px-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)" }}>
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-md space-y-8 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-2xl" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)" }}>
              <ShoppingBag className="w-8 h-8 text-indigo-400" />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">ShopZone</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Your one-stop<br />
              <span className="text-indigo-400">shopping destination</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Discover thousands of products from top brands, delivered right to your door.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-left">
                <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: "rgba(99,102,241,0.15)" }}>
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <ShoppingBag className="w-7 h-7 text-primary" />
            <span className="text-2xl font-extrabold">ShopZone</span>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
