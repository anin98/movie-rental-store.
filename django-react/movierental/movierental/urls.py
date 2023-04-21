"""
URL configuration for movierental project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from movie_rental_backend.views import movie_list , movie_id , review_list, review_details,RegisterView , MyObtainTokenPairView , movie_name , movie_genre , movie_release , avg_review
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
router = DefaultRouter()
from django.conf import settings
from django.conf.urls.static import static




urlpatterns = [
    path('admin/', admin.site.urls),
    path('movies/',movie_list),
    path ('movies/<int:pk>/', movie_id),
    path('movies/<str:title>/', movie_name),
    path('movie/<str:genre>/', movie_genre),
    path('reviews/', review_list),
    path ('reviews/<int:pk>/', review_details),
    path ('avg/<int:pk>/', avg_review),
    path('movies/release_date/<str:date>/', movie_release),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('api/',include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)