import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Category } from "@shared/schema";
import { ProductFilterOptions } from "@/lib/types";

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilterOptions) => void;
  initialFilters?: ProductFilterOptions;
}

const ProductFilter = ({ onFilterChange, initialFilters = {} }: ProductFilterProps) => {
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const [filters, setFilters] = useState<ProductFilterOptions>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [searchInput, setSearchInput] = useState(initialFilters.searchQuery || "");

  const applyFilters = () => {
    onFilterChange({
      ...filters,
      priceRange,
      searchQuery: searchInput,
    });
  };

  const resetFilters = () => {
    setFilters({});
    setPriceRange([0, 300]);
    setSearchInput("");
    onFilterChange({});
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: checked ? categoryId : undefined,
    }));
  };

  const handleSpecialFilterChange = (key: "isFeatured" | "isBestSeller" | "isNewArrival", checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked ? true : undefined,
    }));
  };

  // Apply filters when they change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters, priceRange, searchInput]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-primary font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-text-medium hover:text-accent"
        >
          Reset <X className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-light" />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "special"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories?.map((category: Category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categoryId === category.id}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[0, 300]}
                min={0}
                max={300}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="special">
          <AccordionTrigger className="font-medium">Special Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="flex items-center">
                <Checkbox
                  id="featured"
                  checked={filters.isFeatured === true}
                  onCheckedChange={(checked) =>
                    handleSpecialFilterChange("isFeatured", checked as boolean)
                  }
                />
                <Label
                  htmlFor="featured"
                  className="ml-2 text-sm font-normal cursor-pointer"
                >
                  Featured Products
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="bestseller"
                  checked={filters.isBestSeller === true}
                  onCheckedChange={(checked) =>
                    handleSpecialFilterChange("isBestSeller", checked as boolean)
                  }
                />
                <Label
                  htmlFor="bestseller"
                  className="ml-2 text-sm font-normal cursor-pointer"
                >
                  Best Sellers
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="newarrival"
                  checked={filters.isNewArrival === true}
                  onCheckedChange={(checked) =>
                    handleSpecialFilterChange("isNewArrival", checked as boolean)
                  }
                />
                <Label
                  htmlFor="newarrival"
                  className="ml-2 text-sm font-normal cursor-pointer"
                >
                  New Arrivals
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilter;
