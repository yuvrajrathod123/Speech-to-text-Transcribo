

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

class Equipment(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Refreshment(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Participant(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

# class UserRegistration(models.Model):
#     username = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)  # You should consider using a secure password hashing library like 
    
#     last_login = None



class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class UserRegistration(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    # Add related_name to resolve clashes
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='user_registration_set',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='user_registration_set',
    )



class Reservation(models.Model):
    meeting_title = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    room_name = models.CharField(max_length=255, choices=[
        ("Board room1", "Board room1"),
        ("Board room2", "Board room2"),
        ("Board room3", "Board room3"),
        ("Board room4", "Board room4"),
    ])
    description = models.TextField(default='Default Description')
    equipment_needed = models.ManyToManyField('Equipment', blank=True)
    refreshments = models.ManyToManyField('Refreshment', blank=True)
    additional_equipment = models.TextField(blank=True)
    additional_refreshments = models.TextField(blank=True)
    # user = models.ForeignKey(UserRegistration, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.meeting_title





class Transcript(models.Model):
    room_name = models.CharField(max_length=255)
    file = models.FileField(upload_to='transcripts/')
    meeting_details = models.ForeignKey(Reservation, on_delete=models.CASCADE)
