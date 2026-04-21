from django.http import HttpResponse
from .models import Bookmark
from rest_framework import generics
from .serializers import BookmarkSerializer

class BookmarkListCreateView(generics.ListCreateAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

def home(request):
    return HttpResponse("Hello, Django!")

