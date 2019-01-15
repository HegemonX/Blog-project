from django.contrib import admin
from .models import News, Comment

class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'date')


admin.site.register(News, NewsAdmin)
admin.site.register(Comment, CommentAdmin)