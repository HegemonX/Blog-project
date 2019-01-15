from django.db import models
from django.conf import settings


class News(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='news'
    )
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = "News"


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    news = models.ForeignKey(
        'News',
        related_name='comments',
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ['date']
    
    def __str__(self):
        return self.text