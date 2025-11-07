from rest_framework import serializers
from .models import Post, PostReport


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.display_name', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'subject', 'title', 'text', 'created_at', 'link', 'image', 'document', 'likes_count', 'is_liked']
        read_only_fields = ['id', 'author', 'created_at', 'likes_count', 'is_liked']

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        return user in obj.likes.all() if user.is_authenticated else False

class PostReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReport
        fields = ['id', 'post', 'reason', 'description', 'created_at', 'is_approved']
        read_only_fields = ['created_at', 'is_approved']