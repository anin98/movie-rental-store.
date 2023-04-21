from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.auth.models import AbstractUser



# class CustomUser(AbstractUser):
#     name = models.CharField(max_length=100) 
    
# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=100) 
    genre = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='movie_images/')
    release = models.DateField()
    
     
    def __str__(self):
        return self.title
class StarRatingField(models.PositiveIntegerField):
    def from_rating(self, rating):
        return {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
            5: 10,
        }[rating]

    def to_rating(self, value):
        return {
           
        2: 1,
        4: 2,
        6: 3,
        8: 4,
        10: 5,
    
        }[value]

    def from_db_value(self, value, expression, connection):
        if value is None:
            return None
        return self.to_rating(value)

    def to_python(self, value):
        if isinstance(value, int):
            return self.to_rating(value)
        return value

    def get_prep_value(self, value):
        if isinstance(value, int):
            return self.from_rating(value)
        return value

class Review(models.Model):
    author = models.CharField(max_length=40, default="anonymous")
    stars = StarRatingField()
    comment = models.TextField(max_length=4000)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    def __str__(self):
        return self.movie.title

    




        return self.movie.title


