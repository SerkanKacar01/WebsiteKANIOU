import React from 'react';
import BaseCalculator from './BaseCalculator';
import { getCalculatorConfig } from './productConfigs';

interface ProductCalculatorProps {
  productId: string;
}

const ProductCalculator: React.FC<ProductCalculatorProps> = ({ productId }) => {
  // Get the configuration for this product
  const config = getCalculatorConfig(productId);
  
  return (
    <div className="py-8">
      <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
        Bereken de prijs voor uw {config.productName}
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Vul uw afmetingen en voorkeuren in voor een persoonlijke prijsindicatie.
      </p>
      <BaseCalculator config={config} />
    </div>
  );
};

export default ProductCalculator;