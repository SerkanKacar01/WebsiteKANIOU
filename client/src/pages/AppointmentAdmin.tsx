import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, Ban, CheckCircle, XCircle, Plus, Trash2 } from "lucide-react";
import type { AppointmentBooking, BlockedDate } from "@shared/schema";

export default function AppointmentAdmin() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Available time slots
  const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  // Fetch appointments
  const { data: appointmentsResponse } = useQuery({
    queryKey: ["/api/admin/appointments"],
  });
  const appointments = appointmentsResponse?.appointments || [];

  // Fetch blocked dates
  const { data: blockedDatesResponse } = useQuery({
    queryKey: ["/api/admin/blocked-dates"],
  });
  const blockedDates = blockedDatesResponse?.blockedDates || [];

  // Block date mutation
  const blockDateMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/admin/blocked-dates", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Date blocked successfully",
        description: "The selected date and time slots have been blocked.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blocked-dates"] });
      // Reset form
      setSelectedDate("");
      setReason("");
      setIsRecurring(false);
      setRecurringType("");
      setSelectedSlots([]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to block date. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete blocked date mutation
  const deleteBlockedDateMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/blocked-dates/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Blocked date removed",
        description: "The blocked date has been removed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blocked-dates"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove blocked date.",
        variant: "destructive",
      });
    },
  });

  // Update appointment status mutation
  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: number; status: string; adminNotes?: string }) => {
      return apiRequest(`/api/admin/appointments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status, adminNotes }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Appointment updated",
        description: "The appointment status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/appointments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update appointment.",
        variant: "destructive",
      });
    },
  });

  const handleBlockDate = () => {
    if (!selectedDate || !reason) {
      toast({
        title: "Required fields missing",
        description: "Please select a date and provide a reason.",
        variant: "destructive",
      });
      return;
    }

    blockDateMutation.mutate({
      date: selectedDate,
      reason,
      isRecurring,
      recurringType: isRecurring ? recurringType : undefined,
      blockedSlots: selectedSlots.length > 0 ? selectedSlots : undefined,
    });
  };

  const handleSlotToggle = (slot: string) => {
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <p className="text-muted-foreground">Manage appointment bookings and availability</p>
        </div>
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="availability">Manage Availability</TabsTrigger>
          <TabsTrigger value="blocked-dates">Blocked Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>View and manage appointment bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No appointments found</p>
                ) : (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{appointment.fullName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.email}</p>
                          <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Type:</span> {appointment.appointmentType}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {formatDate(appointment.preferredDate)}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {appointment.preferredTime}
                        </div>
                        <div>
                          <span className="font-medium">Urgency:</span> {appointment.urgency}
                        </div>
                      </div>

                      {appointment.message && (
                        <div>
                          <span className="font-medium">Message:</span>
                          <p className="text-sm mt-1">{appointment.message}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateAppointmentMutation.mutate({
                            id: appointment.id,
                            status: 'confirmed'
                          })}
                          disabled={appointment.status === 'confirmed'}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAppointmentMutation.mutate({
                            id: appointment.id,
                            status: 'cancelled'
                          })}
                          disabled={appointment.status === 'cancelled'}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Block Date/Time Slots</CardTitle>
              <CardDescription>Block specific dates or time slots for vacation, holidays, or maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Select Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Input
                    id="reason"
                    placeholder="e.g., Holiday, Vacation, Maintenance"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Time Slots (leave empty to block entire day)</Label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <Checkbox
                        id={slot}
                        checked={selectedSlots.includes(slot)}
                        onCheckedChange={() => handleSlotToggle(slot)}
                      />
                      <Label htmlFor={slot} className="text-sm">{slot}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={isRecurring}
                    onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
                  />
                  <Label htmlFor="recurring">Make this recurring</Label>
                </div>

                {isRecurring && (
                  <Select value={recurringType} onValueChange={setRecurringType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recurring pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <Button
                onClick={handleBlockDate}
                disabled={blockDateMutation.isPending}
                className="w-full"
              >
                <Ban className="h-4 w-4 mr-2" />
                Block Selected Date/Time
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked-dates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently Blocked Dates</CardTitle>
              <CardDescription>View and manage blocked dates and time slots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockedDates.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No blocked dates</p>
                ) : (
                  blockedDates.map((blocked) => (
                    <div key={blocked.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{formatDate(blocked.date)}</h3>
                          <p className="text-sm text-muted-foreground">{blocked.reason}</p>
                          {blocked.blockedSlots && blocked.blockedSlots.length > 0 ? (
                            <p className="text-sm">
                              <span className="font-medium">Blocked slots:</span> {blocked.blockedSlots.join(', ')}
                            </p>
                          ) : (
                            <p className="text-sm text-red-600">Entire day blocked</p>
                          )}
                          {blocked.isRecurring && (
                            <Badge variant="outline" className="mt-1">
                              Recurring {blocked.recurringType}
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteBlockedDateMutation.mutate(blocked.id)}
                          disabled={deleteBlockedDateMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}