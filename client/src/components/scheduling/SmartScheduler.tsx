import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, User, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/context/LanguageContext";
import { format, addDays, isSameDay } from "date-fns";

interface AppointmentBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  appointmentType: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  postalCode: string;
  projectDescription: string;
  status: string;
  createdAt: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  technicianName?: string;
}

export default function SmartScheduler() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "measurement",
    address: "",
    city: "",
    postalCode: "",
    projectDescription: ""
  });

  // Fetch available time slots for selected date
  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['/api/appointments/slots', selectedDate?.toISOString().split('T')[0]],
    enabled: !!selectedDate,
  });

  // Fetch existing appointments
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['/api/appointments'],
  });

  // Create appointment mutation
  const createAppointmentMutation = useMutation({
    mutationFn: (appointmentData: any) => apiRequest('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),
    onSuccess: () => {
      toast({
        title: t('Appointment Scheduled'),
        description: t('Your appointment has been scheduled successfully. You will receive a confirmation email.'),
      });
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        appointmentType: "measurement",
        address: "",
        city: "",
        postalCode: "",
        projectDescription: ""
      });
      setSelectedDate(undefined);
      setSelectedTime("");
    },
    onError: (error: any) => {
      toast({
        title: t('Error'),
        description: error.message || t('Failed to schedule appointment'),
        variant: 'destructive',
      });
    }
  });

  const appointmentTypes = [
    { value: 'measurement', label: t('Measurement Visit') },
    { value: 'installation', label: t('Installation') },
    { value: 'consultation', label: t('Design Consultation') },
    { value: 'repair', label: t('Repair Service') },
    { value: 'maintenance', label: t('Maintenance Check') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast({
        title: t('Missing Information'),
        description: t('Please select a date and time for your appointment.'),
        variant: 'destructive',
      });
      return;
    }

    createAppointmentMutation.mutate({
      ...formData,
      preferredDate: selectedDate.toISOString().split('T')[0],
      preferredTime: selectedTime,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 30; i++) {
      const date = addDays(new Date(), i);
      // Exclude weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const getAppointmentTypeColor = (type: string) => {
    const colors = {
      measurement: 'bg-blue-100 text-blue-800',
      installation: 'bg-green-100 text-green-800',
      consultation: 'bg-purple-100 text-purple-800',
      repair: 'bg-red-100 text-red-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Appointment Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>{t('Schedule Appointment')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">{t('Personal Information')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('Full Name')}</Label>
                    <Input
                      id="name"
                      placeholder={t('Your full name')}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('Email Address')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('your@email.com')}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('Phone Number')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('+32 XXX XX XX XX')}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">{t('Appointment Type')}</Label>
                    <Select value={formData.appointmentType} onValueChange={(value) => handleInputChange('appointmentType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">{t('Address Information')}</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="address">{t('Street Address')}</Label>
                  <Input
                    id="address"
                    placeholder={t('Street name and number')}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">{t('City')}</Label>
                    <Input
                      id="city"
                      placeholder={t('City name')}
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">{t('Postal Code')}</Label>
                    <Input
                      id="postalCode"
                      placeholder={t('1000')}
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t('Project Description')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('Please describe your project, room dimensions, and any specific requirements...')}
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                disabled={createAppointmentMutation.isPending || !selectedDate || !selectedTime}
                className="w-full"
              >
                {createAppointmentMutation.isPending ? t('Scheduling...') : t('Schedule Appointment')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Time Selection */}
      <div className="space-y-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{t('Select Date & Time')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.getDay() === 0 || date.getDay() === 6;
              }}
              className="rounded-md border"
            />

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">
                  {t('Available Times for')} {format(selectedDate, 'EEEE, MMMM d')}
                </h4>
                {slotsLoading ? (
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots?.map((slot: TimeSlot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="text-xs"
                      >
                        {slot.time}
                      </Button>
                    )) || (
                      // Default time slots if no data
                      ['09:00', '10:30', '13:00', '14:30', '16:00'].map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{t('Upcoming Appointments')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : appointments?.length > 0 ? (
              <div className="space-y-3">
                {appointments.slice(0, 5).map((appointment: AppointmentBooking) => (
                  <div key={appointment.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{appointment.name}</div>
                      <Badge className={getAppointmentTypeColor(appointment.appointmentType)}>
                        {t(appointment.appointmentType)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-3 w-3" />
                        <span>{format(new Date(appointment.preferredDate), 'EEEE, MMMM d')} at {appointment.preferredTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{appointment.city}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('No upcoming appointments')}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}