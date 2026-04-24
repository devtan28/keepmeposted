from django.http import HttpResponse
from .models import Bookmark, Tag
from rest_framework import generics
from .serializers import BookmarkSerializer, TagSerializer
from rest_framework.permissions import IsAuthenticated


class BookmarkListCreateView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tags']
    search_fields = ['title', 'url']

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

class TagListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TagSerializer
    search_fields = ['id', 'name', 'user']

    def get_queryset(self):
        return Tag.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    
def home(request):
    return HttpResponse("Hello, Django!")

