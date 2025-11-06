from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin
from .models import User

class UserAdmin(BaseUserAdmin):
  model = User
  list_display = ('email', 'display_name', 'is_staff', 'is_active')
  list_filter = ('is_staff', 'is_active')
  search_fields = ('email', 'display_name')
  ordering = ['email']

  fieldsets = (
    (None, {'fields': ('email', 'password')}),
    ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    ('Profile', {'fields': ('display_name', 'profile_picture', 'profile_description')}),
  )

admin.site.register(User, UserAdmin)