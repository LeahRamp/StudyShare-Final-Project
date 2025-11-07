from django.urls import path
from .views import (PostCreateAPIView, PostListView, MyPostsAPIView, PostLikeAPIView, UserLikedPostAPIView, CreatePostReportAPIView, AdminReportListAPIView, AdminReviewReportAPIView)

urlpatterns = [ 
    # Searching posts
    path('', PostListView.as_view(), name='post-list'),
    
    # Posts
    path('create/', PostCreateAPIView.as_view(), name='create-post'),
    path('all/', PostListView.as_view(), name='all-posts'),
    path('my-posts/', MyPostsAPIView.as_view(), name='my-posts'),

    #likes
    path('<int:pk>/like/', PostLikeAPIView.as_view(), name='like-post'),
    path('liked/', UserLikedPostAPIView.as_view(), name='liked=posts'),

    # Reporting posts
    path('report/', CreatePostReportAPIView.as_view(), name='report-post'),

    #Admin actions
    path('admin/reports/', AdminReportListAPIView.as_view(), name='admin-reports'),
    path('admin/reports/<int:pk>/review/', AdminReviewReportAPIView.as_view(), name='admin-review-report'),
]