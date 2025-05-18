import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const VitragesPage = () => {
  return (
    <ProductDetailTemplate
      productName="Vitrages"
      productDescription="Elegant sheer curtains that provide privacy while allowing natural light to filter through. Perfect for creating a bright, airy atmosphere."
      imageUrl="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
      startingPrice={65}
      priceUnit="per window"
      features={[
        "Light filtering and privacy",
        "Soft, flowing fabrics",
        "Made-to-measure in any size",
        "Multiple hanging options",
        "Wide range of subtle patterns and finishes"
      ]}
      categoryName="Sheer Drapes"
      categoryPath="vitrages"
    />
  );
};

export default VitragesPage;