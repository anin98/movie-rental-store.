from datetime import datetime
from django.shortcuts import render, HttpResponse
from .models import Movie , Review
from .serializers import MovieSerializers , ReviewSerializers , RegisterSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status 
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import HttpResponse 
from django.shortcuts import get_object_or_404
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.db.models import Avg
# Create your views here.
@api_view(['GET'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializers(movies, many= True)
        return Response(serializer.data)
    


    
@api_view(['GET', 'POST'])
def review_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        serializer = ReviewSerializers(reviews, many= True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ReviewSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def avg_review(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    reviews = Review.objects.filter(movie=movie)
    num_reviews = reviews.count()

    if num_reviews == 0:
        return Response({'message': 'No reviews found for this movie.'})

    sum_ratings = 0
    for review in reviews:
        sum_ratings += review.stars

    avg_rating = sum_ratings / num_reviews

    return Response({'average_rating': avg_rating})

    
@api_view(['GET'])
def movie_id(request,pk):
    try:
        movie = Movie.objects.get(pk=pk)

    except Movie.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = MovieSerializers(movie)
        return Response(serializer.data)
    
@api_view(['GET'])
def movie_name(request, title):
    try:
        movie = Movie.objects.get(title=title)

    except Movie.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = MovieSerializers(movie)
        return Response(serializer.data)

@api_view(['GET'])
def movie_genre(request, genre):
    try:
        movies = Movie.objects.filter(genre__icontains=genre)
        serializer = MovieSerializers(movies, many=True)
        return Response(serializer.data)
    except Movie.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def movie_release(request, date):
    try:
        if date is None:
            # If no release date is specified, return a list of distinct release dates
            # that are present in the database
            release_dates = Movie.objects.order_by().values_list('release__year', flat=True).distinct()
            return Response(release_dates)
        else:
            # If a release date is specified, return a list of movies that have that
            # release year
            release_date = datetime.strptime(date, '%Y-%m-%d')
            movies = Movie.objects.filter(release__year=release_date.year)
            serializer = MovieSerializers(movies, many=True)
            return Response(serializer.data)
    except Movie.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def review_details(request,pk):
    try:
        review = Review.objects.get(pk=pk)

    except Review.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ReviewSerializers(review)
        return Response(serializer.data)
    


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

