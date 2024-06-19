from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from  .serializers import *
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework.generics import CreateAPIView,ListCreateAPIView,DestroyAPIView
from .models import *
from rest_framework.generics import RetrieveUpdateAPIView

class NoteRetrieveUpdate(RetrieveUpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)



class NoteListCreate(ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
    
    # Overriding the create

    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)

        else:
            print(serializer.errors)


class NoteDelete(DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)



class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    print(queryset)
    serializer_class = UserSerializer
    Permission_classes = [AllowAny]
