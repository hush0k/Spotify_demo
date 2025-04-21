from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'favourite_tracks', 'favourite_artists']

    def create(self, validated_data):
        favourite_tracks = validated_data.pop('favourite_tracks', [])
        favourite_artists = validated_data.pop('favourite_artists', [])
        password = validated_data.pop('password')

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        user.favourite_tracks.set(favourite_tracks)
        user.favourite_artists.set(favourite_artists)

        return user

# class ArtistSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(max_length=100)
#
#     def create(self, validated_data):
#         return Artist.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.save()
#         return instance
#
# class AlbumSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(max_length=100)
#     artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())  # <-- здесь
#     year = serializers.IntegerField()
#
#     def create(self, validated_data):
#         return Album.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.artist = validated_data.get('artist', instance.artist)
#         instance.year = validated_data.get('year', instance.year)
#         instance.save()
#         return instance
#
#     def to_representation(self, instance):
#         return {
#             'id': instance.id,
#             'title': instance.title,
#             'artist': instance.artist.id,  # если хочешь показывать только ID
#             'year': instance.year,
#         }


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = "__all__"

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = "__all__"

class ListeningHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ListeningHistory
        fields = "__all__"

