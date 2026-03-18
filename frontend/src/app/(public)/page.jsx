import HeroSlider from "@/components/common/HeroSlider";
import ProductSection from "@/components/common/ProductSection";
import { products } from "@/lib/DummyData";

export default function Home() {
  return (
    <>
    <div className="space-y-6 ">
      <HeroSlider
        images={[
          {
            src:"https://images.unsplash.com/photo-1699158660219-bdc29c7a841e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "/cart"
          },
          {
            src:"https://images.unsplash.com/photo-1705155726520-e8338338e6cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            

          },
          {
            src:"https://images.unsplash.com/photo-1699158660257-60f53e7ed1f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

          },
        ]}
      />
</div>
<div>
      {/* Best Sellers */}
      <ProductSection
        title="Best Sellers"
        description="Explore best-selling safe, natural products"
        products={products}
        category="skincare"
      />

      {/* Only Sunscreen */}
      <ProductSection
        title="Sunscreen Products"
        description="Protect your skin from UV rays"
        products={products}
        subCategory="sunscreen"
      />
    </div>
    </>
  );
}
