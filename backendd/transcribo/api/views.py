


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .models import Reservation, Equipment, Refreshment, UserRegistration, Participant
from .serializers import ReservationSerializer, EquipmentSerializer, RefreshmentSerializer,  ParticipantSerializer, UserRegistrationSerializer
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db.models import Q
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password 
import os  # Import the os module
from django.conf import settings
from rest_framework.permissions import IsAuthenticated




class ReservationListView(ListAPIView):
    # queryset = Reservation.objects.all()
    # serializer_class = ReservationSerializer
    
    def get(self, request):
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)


# class ReservationListView(ListAPIView):
#     serializer_class = ReservationSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Retrieve reservations for the currently logged-in user
#         return Reservation.objects.filter(user=self.request.user)


class ReservationCreateView(CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

# class ReservationCreateView(CreateAPIView):
#     serializer_class = ReservationSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         # Set the 'user' field to the currently logged-in user
#         serializer.save(user=self.request.user)


class ReservationRetrieveView(RetrieveAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationUpdateView(UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationDeleteView(DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class EquipmentListView(ListAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

class RefreshmentListView(ListAPIView):
    queryset = Refreshment.objects.all()
    serializer_class = RefreshmentSerializer



# taking input of participants email and all
class ParticipantCreateView(CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response({'message': 'Participants added successfully!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f'Error: {str(e)}')
            return Response({'error': 'An error occurred while processing the request.'}, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save user registration data to the database
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserRegistrationView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         email = request.data.get('email')
#         password = request.data.get('password')

#         # Hash the password using make_password
#         hashed_password = make_password(password)

#         # Create a new user with the hashed password
#         user = UserRegistration(username=username, email=email, password=hashed_password)
#         user.save()

#         # You can also authenticate and login the user here if needed

#         return Response({'message': 'User registration successful'}, status=201)
    

# # views.py
# from django.http import JsonResponse
# from rest_framework.views import APIView
# from rest_framework.response import Response

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = UserRegistration.objects.get(username=username, password=password)
        print(f"Received username: {username}")
        print(f"Received password: {password}")
        print(f"{user}")

        if user is not None:
            login(request, user)
            if user.username == 'admin' and user.password == '@Admin':
                return Response({'message': 'Admin login successful', 'isAdmin': True}, status=200)
            else:
                return Response({'message': 'User login successful', 'isAdmin': False}, status=200)
        else:
            return Response({'error': 'Invalid username or password'}, status=400)


# class SaveTranscriptView(APIView):
#     def post(self, request, room_name):
#         transcript = request.data.get('transcript')
#         meeting_details = request.data.get('meetingDetails')

#         # Create the folder if it doesn't exist
#         directory_path = os.path.join(settings.MEDIA_ROOT, room_name)
#         if not os.path.exists(directory_path):
#             os.makedirs(directory_path)

#         # Save the transcription to a text file in the specified folder
#         file_name = f"transcription_{meeting_details['id']}.txt"
#         file_path = os.path.join(directory_path, file_name)

#         with open(file_path, "w") as file:
#             # Save the meeting details at the top
#             file.write(f"Meeting Title: {meeting_details['meeting_title']}\n")
#             file.write(f"Date: {meeting_details['date']}\n")
#             file.write(f"Start Time: {meeting_details['start_time']}\n")
#             file.write(f"End Time: {meeting_details['end_time']}\n")
#             file.write(f"Department: {meeting_details['department']}\n")
#             file.write(f"Room: {meeting_details['room_name']}\n\n")
#             file.write(transcript)

#         return JsonResponse({"message": "Transcription saved successfully."})



from django.core.files.base import ContentFile
from .models import Transcript  # Import the Transcript model at the top of your views.py file
# from summarizer import Summarizer 
# from transformers import pipeline
from transformers import T5ForConditionalGeneration, T5Tokenizer


class SaveTranscriptView(APIView):
    def post(self, request, room_name):
        transcript_text = request.data.get('transcript')
        meeting_details = request.data.get('meetingDetails')
        metadata = request.data.get('metadata')
        meeting_title = meeting_details['meeting_title']
        meeting_date = meeting_details['date']

        # Load the T5 model and tokenizer
        model = T5ForConditionalGeneration.from_pretrained("t5-small")
        tokenizer = T5Tokenizer.from_pretrained("t5-small")

        # Tokenize and generate the summary
        input_text = f"summarize: {transcript_text}"
        inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=1024, truncation=True)
        summary_ids = model.generate(inputs, max_length=200, min_length=120, length_penalty=2.0, num_beams=4, early_stopping=True)

        # Decode the summary
        summarized_transcript = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        # Create a Transcript record
        transcript = Transcript(room_name=room_name, meeting_details_id=meeting_details['id'])

        # Append the summarized text to the transcript
        full_transcript = f"Meeting Details:\n{metadata}\n\nOriginal Transcript:\n{transcript_text}\n\n\nSummarized Transcript:\n{summarized_transcript}"

        # Create a text file and store the transcript
        transcript.file.save(f'transcription_{meeting_date}_{meeting_title}.txt', ContentFile(full_transcript))

        transcript.save()

        return JsonResponse({"message": "Transcript saved successfully."})