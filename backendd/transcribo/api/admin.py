# from django.contrib import admin

# # Register your models here.
# from .models import Reservation, Equipment, Refreshment

# admin.site.register(Reservation)


# from django.contrib import admin
# from .models import Reservation, Equipment, Refreshment

# @admin.register(Reservation)
# class ReservationAdmin(admin.ModelAdmin):
#     list_display = ('meeting_title', 'date', 'start_time', 'end_time', 'room_name')
#     list_filter = ('date', 'room_name')
#     search_fields = ('meeting_title', 'name', 'department')
#     filter_horizontal = ('equipment_needed', 'refreshments')

# @admin.register(Equipment)
# class EquipmentAdmin(admin.ModelAdmin):
#     list_display = ('name',)

# @admin.register(Refreshment)
# class RefreshmentAdmin(admin.ModelAdmin):
#     list_display = ('name',)

from django.contrib import admin
from .models import Reservation, Equipment, Refreshment, Participant, UserRegistration, Transcript


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('meeting_title', 'date', 'start_time', 'end_time', 'name', 'department', 'email', 'phone', 'room_name')
    list_filter = ('date', 'department', 'room_name')
    search_fields = ('meeting_title', 'name', 'email', 'phone')
    # You can customize the display and behavior of the Reservation model in the admin panel here.

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    # You can customize the display and behavior of the Equipment model in the admin panel here.

@admin.register(Refreshment)
class RefreshmentAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    # You can customize the display and behavior of the Refreshment model in the admin panel here.



class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'position')
    list_filter = ('position',)
    search_fields = ('name', 'email')

admin.site.register(Participant, ParticipantAdmin)


class UserRegistrationAdmin(admin.ModelAdmin):
    list_display = ('username', 'email',)  # Customize the fields to display in the admin list view
    search_fields = ('username', 'email',)  # Add fields to search by
    list_filter = ('username', 'email',)    # Add filters for fields

# Register the UserRegistration model with the UserRegistrationAdmin class
admin.site.register(UserRegistration, UserRegistrationAdmin)


class TranscriptAdmin(admin.ModelAdmin):
    list_display = ['room_name', 'file', 'meeting_details']
    list_filter = ['room_name']
    search_fields = ['room_name', 'meeting_details__meeting_title']

# Register the Transcript model with the admin site
admin.site.register(Transcript, TranscriptAdmin)