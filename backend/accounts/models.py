from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.core.files.storage import default_storage


class UserManager(BaseUserManager):
  """
  Handles creating regular users and superusers
  """
  def create_user(self, email, password=None, **extra_fields):
    """
    Creation of a regular user with email password
    """
    if not email:
      raise ValueError('Email address is required')
    if not extra_fields.get('display_name'):
      raise ValueError('Display name is required')

    email = self.normalize_email(email).lower()
    display_name = extra_fields.get('display_name').strip()
    extra_fields['display_name'] = display_name

    user = self.model(email=email, **extra_fields)
    user.set_password(password) # Hash the password
    user.save(using=self._db)
    return user
  
  def create_superuser(self, email, password=None, **extra_fields):
    """
    creation of a superuser
    """
    extra_fields.setdefault('display_name', 'Admin')
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self.create_user(email, password, **extra_fields)

def upload_profile_picture(instance, filename):
  """
  Returns the path where profile pictures will be stored
  Uses user ID to name the file
  """
  extension = filename.split('.')[-1]
  path = f'profile_pictures/{instance.id}.{extension}'
  return path

class User(AbstractBaseUser, PermissionsMixin):
  """
  Custom user model using email as username
  """
  email = models.EmailField(unique=True)
  display_name = models.CharField(max_length=20)
  profile_picture = models.ImageField(upload_to=upload_profile_picture, null=True, blank=True)
  profile_description = models.TextField(max_length=200, blank=True)

  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = 'email' # Use Email for login instead of username
  REQUIRED_FIELDS = ['display_name']

  objects = UserManager()

  def __str__(self):
    return f'{self.display_name}: {self.email}'
  
  def save(self, *args, **kwargs):
    """
    Removes old profile_picture if exists and saves new profile_picture
    """
    try:
      old_profile = User.objects.get(pk=self.pk)
      if old_profile.profile_picture and self.profile_picture != old_profile.profile_picture:
        if default_storage.exists(old_profile.profile_picture.name):
          default_storage.delete(old_profile.profile_picture.name)
    except User.DoesNotExist:
      pass
    super().save(*args, **kwargs)