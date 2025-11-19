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
  class Meta:
    model = User
    fields = ['display_name', 'profile_picture', 'profile_description']

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
