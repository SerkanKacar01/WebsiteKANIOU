import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const TextielRaamfolie = () => {
  return (
    <ProductDetailTemplate
      productName="Textiel Raamfolie"
      productDescription="Premium decorative window film that offers privacy and UV protection while enhancing your interior design with elegant patterns."
      imageUrl="https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
      startingPrice={65}
      priceUnit="per m²"
      features={[
        "UV protection (blocks up to 95% of harmful rays)",
        "Maintains daytime privacy",
        "Easy to install and remove",
        "No adhesives - attaches with static cling",
        "Various decorative patterns available",
        "Helps with temperature control"
      ]}
      categoryName="Window Films"
      categoryPath="textiel-raamfolie"
    />
  );
};

export default TextielRaamfolie;