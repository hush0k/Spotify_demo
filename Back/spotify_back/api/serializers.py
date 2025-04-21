# serializers.py
from rest_framework import serializers
from .models import Artist, Album, Music


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    tracks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['id', 'name', 'image', 'artists', 'tracks']


class MusicSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True, read_only=True)
    album = serializers.StringRelatedField()  # Shows album name

    class Meta:
        model = Music
        fields = '__all__'