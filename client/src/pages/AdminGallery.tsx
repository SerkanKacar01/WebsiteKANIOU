import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/ui/container";
import { GalleryItem, Category } from "@shared/schema";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const AdminGallery = () => {
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    categoryId: "",
  });

  // Fetch gallery items
  const {
    data: galleryItems = [],
    isLoading: isLoadingGallery,
    error: galleryError,
  } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  // Fetch categories for the dropdown
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Set up update mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<GalleryItem>) =>
      apiRequest(`/api/gallery/${selectedItem?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
      setSelectedItem(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive",
      });
      console.error("Update error:", error);
    },
  });

  // Handle selecting an item to edit
  const handleSelectItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      categoryId: String(item.categoryId),
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle category select change
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const updatedData = {
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      categoryId: parseInt(formData.categoryId),
    };

    updateMutation.mutate(updatedData);
  };

  if (isLoadingGallery || isLoadingCategories) {
    return (
      <Container className="py-10">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  if (galleryError || categoriesError) {
    return (
      <Container className="py-10">
        <div className="text-center text-red-500">
          Error loading data. Please try refreshing the page.
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Gallery | KANIOU zilvernaald</title>
        <meta name="description" content="Admin panel for managing gallery images" />
      </Helmet>

      <Container className="py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery Items List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gallery Items</h2>
              <div className="space-y-4">
                {galleryItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`cursor-pointer hover:border-primary transition-colors ${
                      selectedItem?.id === item.id ? "border-primary" : ""
                    }`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-sm">
                        Category: {categories.find(c => c.id === item.categoryId)?.name || "Unknown"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-md overflow-hidden mb-2">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Edit Form */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {selectedItem ? "Edit Gallery Item" : "Select an item to edit"}
              </h2>
              {selectedItem ? (
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="imagePreview">Image Preview</Label>
                        <div className="aspect-video rounded-md overflow-hidden border">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Invalid+Image+URL";
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.categoryId}
                          onValueChange={handleCategoryChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-2 flex items-center justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedItem(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center p-6 text-gray-500">
                      Select a gallery item from the list to edit
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminGallery;