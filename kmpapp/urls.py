from django.urls import path
from . import views
from .views import home, BookmarkListCreateView

urlpatterns = [
    path('', views.home),
    path("bookmarks/", BookmarkListCreateView.as_view(), name="bookmark_list"),
]