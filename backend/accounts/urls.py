from django.urls import path
from .views import SignInView, SignUpView, UserView, PasswordChangeView, DeleteAccountView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
  path("signup/", SignUpView.as_view(), name="signup"),
  path("signin/", SignInView.as_view(), name="signin"),
  path("user/", UserView.as_view(), name="user"),
  path("user/change-password/", PasswordChangeView.as_view(), name="change-password"),
  path("user/delete/", DeleteAccountView.as_view(), name="delete-account"),
  path("token-refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]