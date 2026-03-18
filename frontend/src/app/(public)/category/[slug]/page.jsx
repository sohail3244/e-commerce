import ProductSection from "@/components/common/ProductSection";
import { products } from "@/lib/DummyData";

const categories = [
  {
    key: "skincare",
    title: "Skincare Products",
  },
  {
    key: "hair",
    title: "Hair Care",
  },
];

export default function CategoryProduct() {
  return (
    <div className="p-6">

      {categories.map((cat) => (
        <ProductSection
          key={cat.key}
          title={cat.title}
          products={products}
          category={cat.key}
        />
      ))}

    </div>
  );
}