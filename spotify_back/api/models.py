from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    favourite_tracks = models.ManyToManyField('Track', blank=True, related_name='favourite_tracks')
    favourite_artists = models.ManyToManyField('Artist', blank=True, related_name='favourite_artists')

    def __str__(self):
        return self.username

class Artist(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums')
    year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title}({self.artist})"

class Track(models.Model):
    title = models.CharField(max_length=100)
    audio = models.FileField(upload_to='audio/')
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='tracks')
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='tracks', null=True, blank=True)
    duration = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title}"

class Playlist(models.Model):
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    tracks = models.ManyToManyField('Track', related_name='playlists')

    def __str__(self):
        return f"{self.title} - {self.user.username}"

class ListeningHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listening_history')
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    listened_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.track.title} - {self.listened_at}"

