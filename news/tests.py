from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from django.contrib.auth import get_user_model
from news import apiviews


class TestArticle(APITestCase):
    def setUp(self):
        self.factory = APIClient()
        self.view = apiviews.ArticleViewSet.as_view({"get": 'list'})
        self.url = '/api/articles/'
        self.user = self.setup_user()

    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        )
    
    # def test_list(self):
    #     request = self.factory.get(self.url)
    #     request.user = self.user
    #     response = self.view(request)
    #     self.assertEqual(response.status_code, 200,
    #         'Expected Response code 200, received {0} instead.'
    #         .format(response.status_code))
    
    def test_list2(self):
        self.client.login(username="test", password="test")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200,
            'Expected Response code 200, received {0} instead.'
            .format(response.status_code))
