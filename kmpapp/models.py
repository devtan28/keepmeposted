from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

class Tag(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, related_name="tags",on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.name = self.name.strip().lower()
        super(Tag, self).save(*args, **kwargs)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'user'], name='unique_user_tag')
        ]
        
class Bookmark(models.Model):
    title = models.CharField(null=False, max_length=100)
    url = models.URLField(blank=False, null=False)
    user = models.ForeignKey(User, related_name="bookmarks", on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name="bookmarks",blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        ordering = ['-created_at']

