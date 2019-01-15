from rest_framework import serializers
from news.models import News, Comment


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")

    def create(self, validated_data):
        comment = Comment(
            author=self.context['user'],
            text=validated_data['text'],
            news=validated_data['news']
        )
        comment.save()
        return comment
    
    class Meta:
        model = Comment
        fields = '__all__'

        
class NewsDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, required=False, )
    author = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = News
        fields = ('id', 'title', 'author', 'date', 'text', 'comments')


class NewsSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    author = serializers.ReadOnlyField(source="author.username")
    preview_comments = serializers.SerializerMethodField()

    def get_preview_comments(self, obj):
        queryset = Comment.objects.filter(news=obj)[:3]
        serializer = CommentSerializer(queryset, many=True, required=False)
        return serializer.data

    def get_comments(self, obj):
        return Comment.objects.filter(news=obj).count()

    class Meta:
        model = News
        fields = ('id', 'title', 'author', 'date', 'text', 
            'comments', 'preview_comments')
