from django.shortcuts import render
from django.http import HttpResponse
from .models import Bookmark, Tag
from rest_framework import generics
from .serializers import BookmarkSerializer

class BookmarkListCreateView(generics.ListAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

def home(request):
    return HttpResponse("Hello, Django!")

