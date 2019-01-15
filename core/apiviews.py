from rest_framework import status, generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer, UserListSerializer, \
    UserDetailSerializer, TokenSerializer
from .permissions import IsYourself


class UserViewSet(ModelViewSet):
    # authentication_classes = []
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve', 'create', ):
            self.permission_classes = []
        elif self.action in ('update', 'partial_update', 'destroy', ):
            self.permission_classes = [IsYourself,]
        else:
            self.permission_classes = [IsAdminUser,]
        return [permission() for permission in self.permission_classes]
    
    def list(self, request):
        serializer = UserListSerializer(self.queryset, many=True)
        return Response(serializer.data)


class TokenView(APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = UserDetailSerializer

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
