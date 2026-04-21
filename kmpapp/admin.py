from django.contrib import admin
from .models import Tag, Bookmark

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_filter = ('user', "created_at")
    search_fields = ('title', 'url')
    filter_horizontal = ('tags',)
    list_display = ('title', 'user', 'created_at')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')