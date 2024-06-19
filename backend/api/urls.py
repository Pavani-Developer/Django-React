from django.urls import path
from . import views
from .views import CreateUserView,NoteRetrieveUpdate

urlpatterns = [
    path("user/register/",CreateUserView.as_view(),name = 'register'),
    path("notes/",views.NoteListCreate.as_view(),name = 'note-list'),
    path("notes/delete/<int:pk>/",views.NoteDelete.as_view(),name = 'delete-note'),
    path('notes/update/<int:pk>/', NoteRetrieveUpdate.as_view(), name='note-retrieve-update'),
] 