from rest_framework import permissions


class IsAuthor(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     return True         

    def has_object_permission(self, request, view, obj):
        if (request.user):
            return obj.author == request.user
        return False


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS
        )
