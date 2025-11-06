from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserProfileSerializer, SignUpSerializer, PasswordChangeSerializer

# Helper function to generate tokens and user data
def get_user_auth_tokens(user):
  """
  Returns serialized user data and JWT tokens
  """
  refresh = RefreshToken.for_user(user)
  return {
    'user': UserProfileSerializer(user).data,
    'tokens': {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
    }
  }


# Sign Up View
class SignUpView(APIView):
  permission_classes = [AllowAny]

  def post(self, request):
    serializer = SignUpSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    user_data = get_user_auth_tokens(user)
    return Response({'message': 'Sign Up Successful', 'data': user_data}, status=status.HTTP_201_CREATED)

# Sign In View
class SignInView(APIView):
  permission_classes = [AllowAny]

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
      return Response({'message': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(email=email, password=password)
    if not user:
      return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user_data = get_user_auth_tokens(user)
    return Response({'message': 'Sign In Successful', 'data': user_data}, status=status.HTTP_200_OK)

# User Profile View
class UserView(RetrieveUpdateAPIView):
  serializer_class = UserProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user
  
  def patch(self, request, *args, **kwargs):
    """
    Allows partial updates of data
    """
    serializer = self.get_serializer(self.get_object(), data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'message': 'Profile updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

# Password change View
class PasswordChangeView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

# Delete Account View
class DeleteAccountView(APIView):
  permission_classes = [IsAuthenticated]

  def delete(self, request):
    request.user.delete()
    return Response({'message': 'Account deleted successfully'}, status=status.HTTP_200_OK)