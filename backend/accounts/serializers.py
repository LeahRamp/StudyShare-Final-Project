from rest_framework import serializers
from .models import User

# Serializer for Sign Up
class SignUpSerializer(serializers.ModelSerializer):
  """
  Handles creating new user with email, password and display name
  """
  password = serializers.CharField(write_only=True, min_length=8)

  class Meta:
    model = User
    fields = ['email', 'password', 'display_name']

  def create(self, validated_data):
    """
    Create a new user using the custom UserManager's create_user method
    """
    return User.objects.create_user(**validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
  """
  Serializer for updating user profile info
  profile_picture cannot be removed
  """
  profile_picture = serializers.ImageField(required=False)

  class Meta:
    model = User
    fields = ['display_name', 'profile_picture', 'profile_description']

  def validate_display_name(self, value):
    """
    Ensure display_name is not empty and doesn't exceed 20 characters
    """
    value = value.strip()
    if not value:
      raise serializers.ValidationError('Display name cannot be empty')
    if len(value) > 20:
      raise serializers.ValidationError('Display name cannot be exceed 20 characters')
    return value
  
  def validate_profile_description(self, value):
    """
    Ensure profile description does not exceed 200 characters
    """
    if value and len(value) > 100:
      raise serializers.ValidationError('Profile description cannot exceed 200 characters')
    return value


class PasswordChangeSerializer(serializers.Serializer):
  """
  Serializer for changing user password
  """
  old_password = serializers.CharField(write_only=True)
  new_password = serializers.CharField(write_only=True, min_length=8)

  def validate(self, data):
    """
    Verify that old password matches user's current password
    """
    user = self.context['request'].user
    if not user.check_password(data['old_password']):
      raise serializers.ValidationError('Old password is incorrect')
    return data
  
  def save(self):
    """
    Updates the user's password with new password
    """
    user = self.context['request'].user
    user.set_password(self.validated_data['new_password'])
    user.save()
    return user
