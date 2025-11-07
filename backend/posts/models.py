from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Post(models.Model):
    SUBJECT_CHOICES= [
        ('biology', 'Biology'),
        ('chemistry', 'Chemistry'),
        ('physics', 'Physics'),
        ('mathematics', 'Mathematics'),
        ('computer_science', 'Computer Science'),
        ('information_technology', 'Information Technology'),
        ('engineering', 'Engineering'),
        ('environmental_science', 'Environmental Science'),
        ('history', 'History'),
        ('literature', 'Literature'),
        ('philosophy', 'Philosophy'),
        ('languages', 'Languages'),
        ('music', 'Music'),
        ('fine_arts', 'Fine Arts'),
        ('cultural_studies', 'Cultural Studies'),
        ('psychology', 'Psychology'),
        ('sociology', 'Sociology'),
        ('political_science', 'Political Science'),
        ('economics', 'Economics'),
        ('anthropology', 'Anthropology'),
        ('geography', 'Geography'),
        ('accounting', 'Accounting'),
        ('finance', 'Finance'),
        ('marketing', 'Marketing'),
        ('management', 'Management'),
        ('business_administration', 'Business Administration'),
        ('law', 'Law'),
        ('international_relations', 'International Relations'),
        ('medicine', 'Medicine'),
        ('nursing', 'Nursing'),
        ('pharmacy', 'Pharmacy'),
        ('public_health', 'Public Health'),
        ('physiotherapy', 'Physiotherapy'),
        ('education', 'Education'),
        ('media_communication', 'Media & Communication'),
        ('architecture', 'Architecture'),
        ('design', 'Design'),
        ('theology', 'Theology / Religious Studies'),
    ]

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    title = models.CharField(max_length=255, blank=True, null=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    document = models.FileField(upload_to='post_documents/', blank=True, null=True)

    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)

    def __str__(self):
        return self.title if self.title else f"Post by {self.author.username} on {self.created_at}"
    
    class Meta:
        ordering = ['-created_at']

class PostReport(models.Model):
    REPORT_REASONS = [
        ('inappropriate', 'Inappropriate Content'),
        ('copyright', 'Copyright Violation'),
        ('misleading', 'Incorrect / Misleading Content'),
        ('spam', 'Spam / Irrelevant Files'),
    ]

    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='reports')
    reason = models.CharField(max_length=50, choices=REPORT_REASONS)
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Report on '{self.post.title or self.post.text[:30]}'"

