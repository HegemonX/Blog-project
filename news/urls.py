from django.urls import path
from .apiviews import CommentList, NewsViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('news', NewsViewSet, base_name='news')


urlpatterns = [
    path('news/<int:pk>/comments/', CommentList.as_view(), name="comments_list"),
    # path('create_comment/', PostComment.as_view(), name="create_comment")
]

urlpatterns += router.urls