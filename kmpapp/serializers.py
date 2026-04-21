from rest_framework import serializers
from .models import Bookmark, Tag

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'title', 'url', 'tags', 'created_at']