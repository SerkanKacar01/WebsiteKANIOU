import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const DuoRolgordijnen = () => {
  return (
    <ProductDetailTemplate
      productName="Duo Rolgordijnen"
      productDescription="Innovative dual-layer roller blinds that combine sheer and blackout fabrics for versatile light control throughout the day."
      imageUrl="https://images.unsplash.com/photo-1592492152545-9695d3f473f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
      startingPrice={85}
      priceUnit="per window"
      features={[
        "Dual fabric layers for versatile light control",
        "Alternating sheer and opaque stripes",
        "Modern contemporary design",
        "Child-safe cordless operation available",
        "Wide variety of colors and textures",
        "Made to measure for a perfect fit"
      ]}
      categoryName="Sunblinds"
      categoryPath="duo-rolgordijnen"
    />
  );
};

export default DuoRolgordijnen;