from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *

# @api_view(['GET', 'POST'])
# def user_list_create(request):
#     if request.method == 'GET':
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(['GET', 'POST', 'PUT', 'DELETE'])
# def user_detail(request, pk):
#
#     try:
#         user = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
#
#
#     if request.method == 'PUT':
#         serializer = UserSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
# class ArtistListCreate(APIView):
#
#     def get(self, request):
#         artists = Artist.objects.all()
#         serializer = ArtistSerializer(artists, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = ArtistSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# class ArtistDetail(APIView):
#
#     def get_objects(self, pk):
#         try:
#             return Artist.objects.get(pk=pk)
#         except Artist.DoesNotExist:
#             return None
#
#     def get(self, request, pk):
#         artist = self.get_objects(pk)
#         if not artist:
#             return Response({'error': 'Artist not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = ArtistSerializer(artist)
#         return Response(serializer.data)
#
#     def put(self, request, pk):
#         artist = self.get_objects(pk)
#         if not artist:
#             return Response({'error': 'Artist not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = ArtistSerializer(artist, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk):
#         artist = self.get_objects(pk)
#         if not artist:
#             return Response({'error': 'Artist not found'}, status=status.HTTP_404_NOT_FOUND)
#         artist.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class MusicProtectedView(APIView):
    

    def get(self, request):
        return Response({"message": "Your music data here"})

class AlbumTracksView(generics.ListAPIView):
    serializer_class = TrackSerializer

    def get_queryset(self):
        album_id = self.kwargs['pk']
        return Track.objects.filter(album_id=album_id)

class AlbumTrackDetail(generics.RetrieveAPIView):
    serializer_class = TrackSerializer

    def get_object(self):
        album_id = self.kwargs['album_pk']
        track_id = self.kwargs['track_pk']
        return get_object_or_404(Track, id=track_id, album_id=album_id)


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ArtistListCreate(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class ArtistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class AlbumListCreate(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    # 

class AlbumDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    # 

class TrackListCreate(generics.ListCreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

class TrackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

class PlaylistListCreate(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

class PlaylistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

class ListeningHistoryListCreate(generics.ListCreateAPIView):
    queryset = ListeningHistory.objects.all()
    serializer_class = ListeningHistorySerializer

class ListeningHistoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListeningHistory.objects.all()
    serializer_class = ListeningHistorySerializer



