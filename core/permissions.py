from rest_framework import permissions

class IsYourself(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if (request.user):
            return request.user == obj
        return False
