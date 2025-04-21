from django.urls import path
from .views import *

urlpatterns = [
    path('albums/', AlbumList.as_view(), name='companies'),
]