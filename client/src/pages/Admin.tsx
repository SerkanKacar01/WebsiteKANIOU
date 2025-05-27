import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Brain, MessageSquare, DollarSign, Plus, Search, CheckCircle, Clock } from "lucide-react";
import type { ChatbotKnowledge, ChatbotConversation, ChatbotMessage, PriceRequestNotification } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Knowledge Base Management
  const { data: knowledge = [] } = useQuery<ChatbotKnowledge[]>({
    queryKey: ["/api/admin/chatbot/knowledge"],
  });

  // Recent Conversations
  const { data: conversations = [] } = useQuery<(ChatbotConversation & { messages: ChatbotMessage[] })[]>({
    queryKey: ["/api/admin/chatbot/conversations"],
  });

  // Price Request Notifications
  const { data: priceRequests = [] } = useQuery<PriceRequestNotification[]>({
    queryKey: ["/api/admin/chatbot/price-requests"],
  });

  // Add Knowledge Mutation
  const addKnowledgeMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/admin/chatbot/knowledge", "POST", data),
    onSuccess: () => {
      toast({ title: "Knowledge added successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chatbot/knowledge"] });
      setNewKnowledge({ category: "product", topic: "", content: "", language: "nl", priority: 5 });
    },
  });

  // Mark Price Request as Responded
  const markRespondedMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/chatbot/price-requests/${id}/respond`, "PATCH", {}),
    onSuccess: () => {
      toast({ title: "Price request marked as responded!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/chatbot/price-requests"] });
    },
  });

  const [newKnowledge, setNewKnowledge] = useState({
    category: "product",
    topic: "",
    content: "",
    language: "nl",
    priority: 5
  });

  const filteredKnowledge = knowledge.filter(item => {
    const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pendingPriceRequests = priceRequests.filter(req => !req.isResponded);
  const recentConversations = conversations.slice(0, 10);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Chatbot Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI assistant's knowledge and monitor conversations</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{knowledge.length}</p>
                <p className="text-sm text-muted-foreground">Knowledge Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{conversations.length}</p>
                <p className="text-sm text-muted-foreground">Total Conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{pendingPriceRequests.length}</p>
                <p className="text-sm text-muted-foreground">Pending Price Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{knowledge.filter(k => k.adminApproved).length}</p>
                <p className="text-sm text-muted-foreground">Approved Knowledge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="knowledge" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="pricing">Price Requests</TabsTrigger>
          <TabsTrigger value="add">Add Knowledge</TabsTrigger>
        </TabsList>

        {/* Knowledge Base Management */}
        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Management</CardTitle>
              <CardDescription>View and manage your chatbot's knowledge entries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search knowledge entries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="product">Products</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="pricing">Pricing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {filteredKnowledge.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={item.category === 'product' ? 'default' : 
                                        item.category === 'faq' ? 'secondary' : 'outline'}>
                            {item.category}
                          </Badge>
                          <Badge variant="outline">Priority: {item.priority}</Badge>
                          <Badge variant="outline">{item.language}</Badge>
                          {item.adminApproved && <Badge variant="default">Approved</Badge>}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{item.topic}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversations */}
        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Monitor customer interactions with your chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentConversations.map((conversation) => (
                  <Card key={conversation.id} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">Session: {conversation.sessionId.slice(-8)}</span>
                          <Badge variant="outline">{conversation.language}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {conversation.createdAt ? new Date(conversation.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm">
                        {conversation.messages?.length || 0} messages
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price Requests */}
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Request Notifications</CardTitle>
              <CardDescription>Manage customer pricing inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPriceRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">New Price Request</span>
                            <Badge variant="outline">
                              {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2"><strong>Message:</strong> {request.userMessage}</p>
                          {request.userEmail && (
                            <p className="text-sm mb-1"><strong>Email:</strong> {request.userEmail}</p>
                          )}
                          {request.userName && (
                            <p className="text-sm mb-1"><strong>Name:</strong> {request.userName}</p>
                          )}
                          {request.detectedKeywords && request.detectedKeywords.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {request.detectedKeywords.map((keyword, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => markRespondedMutation.mutate(request.id)}
                          disabled={markRespondedMutation.isPending}
                          size="sm"
                        >
                          Mark Responded
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {pendingPriceRequests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pending price requests</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Knowledge */}
        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Knowledge</CardTitle>
              <CardDescription>Expand your chatbot's knowledge base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select 
                    value={newKnowledge.category} 
                    onValueChange={(value) => setNewKnowledge(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product Information</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="general">General Advice</SelectItem>
                      <SelectItem value="pricing">Pricing Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select 
                    value={newKnowledge.language} 
                    onValueChange={(value) => setNewKnowledge(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nl">Nederlands</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="tr">Türkçe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Topic/Title</label>
                <Input
                  value={newKnowledge.topic}
                  onChange={(e) => setNewKnowledge(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g. Rolgordijnen - Installatie"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea
                  value={newKnowledge.content}
                  onChange={(e) => setNewKnowledge(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter detailed information that the chatbot should know..."
                  rows={6}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Priority (1-10)</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newKnowledge.priority}
                  onChange={(e) => setNewKnowledge(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                />
              </div>

              <Button 
                onClick={() => addKnowledgeMutation.mutate({ ...newKnowledge, adminApproved: true })}
                disabled={addKnowledgeMutation.isPending || !newKnowledge.topic || !newKnowledge.content}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Knowledge Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}