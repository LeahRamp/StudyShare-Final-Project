from rest_framework import generics, permissions, status, filters

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, PostReport
from .serializers import PostSerializer, PostReportSerializer

# Create your views here.

# Create a new post
class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# List all posts 
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['subject', 'title']


# List all posts by logged in user 
class MyPostsAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user).order_by('created_at')


# Like and unlike a post
class PostLikeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'status' : 'unliked'})
        else: 
            post.likes.add(user)
            return Response({'status' : 'liked'})
        

# List of posts liked by a user 
class UserLikedPostAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.liked_posts.all()
    

# User reports a post 
class CreatePostReportAPIView(generics.CreateAPIView):
    serializer_class = PostReportSerializer
    permission_classes = [permissions.IsAuthenticated]


# Admin report review
class AdminReportListAPIView(generics.ListAPIView):
    serializer_class = PostReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = PostReport.objects.all().order_by('created_at')


# Admin approve or delete reported post
class AdminReviewReportAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            report = PostReport.objects.get(pk=pk)
        except PostReport.DoesNotExist:
            return Response({'error' : 'Report not found'}, status=status.HTTP_404_NOT_FOUND)
        
        action = request.data.get('action')
        if action == 'approve':
            report.is_approved = True
            report.save()
            return Response({'message': 'Report approved successfully'}, status=status.HTTP_200_OK)
        elif action == 'delete':
            post = report.post
            post.delete()
            report.delete()
            return Response({'message' : 'Post and report deleted'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid action. Use "approve" or "delete"'}, status=status.HTTP_400_BAD_REQUEST)