from django.conf.urls.static import static
from django.urls import path
from .views import *

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('artists/', ArtistListCreate.as_view(), name='artist-list'),
    path('artists/<int:pk>/', ArtistDetail.as_view(), name='artist-detail'),
    path('albums/', AlbumListCreate.as_view(), name='album-list'),
    path('albums/<int:pk>/', AlbumDetail.as_view(), name='album-detail'),
    path('tracks/', TrackListCreate.as_view(), name='track-list'),
    path('tracks/<int:pk>/', TrackDetail.as_view(), name='track-detail'),

    path('albums/<int:pk>/tracks/', AlbumTrackView.as_view(), name='album-tracks'),

    path('playlists/', PlaylistListCreate.as_view(), name='playlist-list'),
    path('playlists/<int:pk>/', PlaylistDetail.as_view(), name='playlist-detail'),
    path('listening-history/', ListeningHistoryListCreate.as_view(), name='listening-history-list'),
    path('listening-history/<int:pk>/', ListeningHistoryDetail.as_view(), name='listening-history-detail'),
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)