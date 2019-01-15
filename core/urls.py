from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from .apiviews import UserViewSet, TokenView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('users', UserViewSet, base_name='users')

urlpatterns = [
    # path("users/", UserViewSet.as_view(), name="user_create"),
    # path("login/", LoginView.as_view(), name="login"),
    path("login/", obtain_jwt_token),
    path("im/", TokenView.as_view(), name="im"),
    # path("im/", TokenView.as_view())
]

urlpatterns += router.urls