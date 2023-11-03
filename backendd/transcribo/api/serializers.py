# from rest_framework import serializers
# from .models import Reservation  # Import the Reservation model from your app's models.py




from rest_framework import serializers
from .models import Reservation, Equipment, Refreshment, Participant, UserRegistration

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

class RefreshmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refreshment
        fields = '__all__'



class ReservationSerializer(serializers.ModelSerializer):
    equipment_needed = EquipmentSerializer(many=True)
    refreshments = RefreshmentSerializer(many=True)

    class Meta:
        model = Reservation
        fields = '__all__'

    def create(self, validated_data):
        # Extract and create related objects (equipment_needed and refreshments)
        equipment_data = validated_data.pop('equipment_needed')
        refreshment_data = validated_data.pop('refreshments')

        reservation = Reservation.objects.create(**validated_data)

        # Create related equipment_needed objects
        equipment_needed_list = []
        for equipment_item in equipment_data:
            equipment_needed_item = Equipment.objects.create(**equipment_item)
            equipment_needed_list.append(equipment_needed_item)
        reservation.equipment_needed.set(equipment_needed_list)

        # Create related refreshments objects
        refreshments_list = []
        for refreshment_item in refreshment_data:
            refreshment_item = Refreshment.objects.create(**refreshment_item)
            refreshments_list.append(refreshment_item)
        reservation.refreshments.set(refreshments_list)

        return reservation
    

    def update(self, instance, validated_data):
        equipment_data = validated_data.pop('equipment_needed', [])
        refreshment_data = validated_data.pop('refreshments', [])

        # Update the Reservation instance with the validated data
        instance = super().update(instance, validated_data)

        # Clear existing equipment and refreshments
        instance.equipment_needed.clear()
        instance.refreshments.clear()

        # Update Equipment and Refreshments
        equipment_instances = []
        refreshment_instances = []

        for equipment in equipment_data:
            equipment_instance, created = Equipment.objects.update_or_create(**equipment, defaults=equipment)
            equipment_instances.append(equipment_instance)

        for refreshment in refreshment_data:
            refreshment_instance, created = Refreshment.objects.update_or_create(**refreshment, defaults=refreshment)
            refreshment_instances.append(refreshment_instance)

        instance.equipment_needed.set(equipment_instances)
        instance.refreshments.set(refreshment_instances)

        return instance


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'





class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegistration
        fields = ('username', 'email', 'password')
