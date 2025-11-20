from django.contrib import admin
from .models import Post, PostReport

# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'subject', 'created_at', 'number_of_likes')
    list_filter = ('subject', 'created_at')
    search_fields = ('title', 'text', 'author__username')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    def number_of_likes(self, obj):
        return obj.likes.count()
    number_of_likes.short_description = 'Likes'

    # Show all posts for superuser, only own posts for staff
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # show all posts to superuser
        return qs.filter(author=request.user)  # staff see only their own posts

# Customize how the PostReport model appears in the admin
@admin.register(PostReport)
class PostReportAdmin(admin.ModelAdmin):
    list_display = ('post', 'reason', 'created_at', 'is_approved')
    list_filter = ('reason', 'is_approved', 'created_at')
    search_fields = ('post__title', 'post__text')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)