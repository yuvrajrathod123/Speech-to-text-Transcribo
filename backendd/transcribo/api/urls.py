
from django.urls import path
from . import views

urlpatterns = [
    path('reservations/', views.ReservationListView.as_view(), name='reservation-list'),
    path('reservations/create/', views.ReservationCreateView.as_view(), name='reservation-create'),
    path('reservations/<int:pk>/', views.ReservationRetrieveView.as_view(), name='reservation-detail'),
    path('reservations/<int:pk>/update/', views.ReservationUpdateView.as_view(), name='reservation-update'),
    path('reservations/<int:pk>/delete/', views.ReservationDeleteView.as_view(), name='reservation-delete'),
    path('equipment/', views.EquipmentListView.as_view(), name='equipment-list'),
    path('refreshments/', views.RefreshmentListView.as_view(), name='refreshment-list'),
    path('participants/create/', views.ParticipantCreateView.as_view(), name='create-participant'),
    path('register/', views.UserRegistrationView.as_view(), name='user-registration'),
    path('login/', views.LoginView.as_view(), name='user-login'),
    path('save_transcript/<str:room_name>/', views.SaveTranscriptView.as_view(), name='save_transcript'),
   
]


