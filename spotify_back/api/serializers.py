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

class ArtistSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    image = serializers.ImageField()

    def create(self, validated_data):
        return Artist.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
#
class AlbumSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=100)
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    year = serializers.IntegerField()
    image = serializers.ImageField()
    isExplicit = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.artist = validated_data.get('artist', instance.artist)
        instance.year = validated_data.get('year', instance.year)
        instance.image = validated_data.get('image', instance.image)
        instance.isExplicit = validated_data.get('isExplicit', instance.isExplicit)
        instance.save()
        return instance

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title': instance.title,
            'artist': instance.artist.id,
            'year': instance.year,
            'image': instance.image.url if instance.image else None,
            'isExplicit': instance.isExplicit,
        }



# class ArtistSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Artist
#         fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)  # для отображения
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(), write_only=True, source='artist'  # для создания/обновления
    )

    class Meta:
        model = Album
        fields = '__all__'

# class AlbumSerializer(serializers.ModelSerializer):
#     artist = ArtistSerializer()
#     class Meta:
#         model = Album
#         fields = '__all__'


class TrackSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)
    album = AlbumSerializer(read_only=True)

    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(), write_only=True, source='artist'
    )
    album_id = serializers.PrimaryKeyRelatedField(
        queryset=Album.objects.all(), write_only=True, source='album'
    )

    class Meta:
        model = Track
        fields = "__all__"

# class TrackSerializer(serializers.ModelSerializer):
#     artist = ArtistSerializer()
#     album = AlbumSerializer()
#     class Meta:
#         model = Track
#         fields = "__all__"

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = "__all__"

# class ListeningHistorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ListeningHistory
#         fields = "__all__"


class ListeningHistorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    track = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())
    listened_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return ListeningHistory.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.track = validated_data.get('track', instance.track)
        instance.save()
        return instance

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'user': instance.user.id,
            'track': instance.track.id,
            'listened_at': instance.listened_at.isoformat(),
        }


