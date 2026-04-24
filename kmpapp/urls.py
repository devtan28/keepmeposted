from django.urls import path
from . import views
from .views import home, BookmarkListCreateView, TagListView

urlpatterns = [
    path('', views.home),
    path("bookmarks/", BookmarkListCreateView.as_view(), name="bookmark_list"),
    path("tags/", TagListView.as_view(), name="tag_list")
]