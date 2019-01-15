from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAdminUser, AllowAny, \
    IsAuthenticatedOrReadOnly
from rest_framework.views import APIView

from .models import News, Comment
from .serializers import CommentSerializer, NewsSerializer, \
    NewsDetailSerializer
from .permissions import ReadOnly, IsAuthor


class NewsViewSet(ModelViewSet):
    serializer_class = NewsSerializer
    # permission_classes = [ReadOnly]
    def get_queryset(self):
        return News.objects.all()
    
    def get_permissions(self):
        if self.action in ('list', 'retrieve', ):
            self.permission_classes = []
        elif self.action in ('update', 'destroy', 'partial_update', ):
            self.permission_classes = [IsAuthor, ]
        else:
            self.permission_classes = [IsAdminUser, ]

        return [permission() for permission in self.permission_classes]


    def retrieve(self, request, pk=None):
        news = get_object_or_404(News, pk=pk)
        serializer = NewsDetailSerializer(news)
        return Response(serializer.data)

        # self.check_object_permissions(request, news)
    


class CommentList(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CommentSerializer

    def get(self, request, pk):
        from_get = int(request.GET.get('from') or 1)
        to_get = int(request.GET.get('to') or 0)

        # array starts from 0
        from_number = max(from_get - 1, 0)
        to_number = to_get
        # if no 'to' in get or 'to' is 0 then query all comments
        # else get routine query
        if (to_number == 0):
            queryset = self.get_queryset()[from_number:]
        else:
            queryset = self.get_queryset()[from_number:to_number]

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        text = request.data.get("text")
        if request.user:
            data = {
                "text": text,
                "news": pk,
                "author": request.user.username,
            }
            context = {'user': request.user}
            serializer = CommentSerializer(data=data, context=context)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response({"detail": "data is not valid"})

        raise NotAuthenticated("You should be logged in to post a comment")

    def get_queryset(self):
        news = self.kwargs["pk"]
        queryset = Comment.objects.filter(news_id=news)
        return queryset
