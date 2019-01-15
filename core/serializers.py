from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', )
    
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    token = serializers.SerializerMethodField()

    def get_token(self):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(self.user)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = User
        fields = ('token', 'user')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_login', 'date_joined', )


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'