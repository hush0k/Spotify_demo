from django.db import models

# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='artists/', blank=True, null=True)

    def __str__(self):
        return self.name


class Album(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='albums/', blank=True, null=True)
    artists = models.ManyToManyField(Artist, related_name='albums')

    def __str__(self):
        return self.name


class Music(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='music_images/', blank=True, null=True)
    duration = models.PositiveIntegerField()  # in seconds
    audio = models.FileField(upload_to='music_files/')
    artists = models.ManyToManyField(Artist, related_name='musics')
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='tracks')

    def __str__(self):
        return f"{self.name} (from {self.album.name})"