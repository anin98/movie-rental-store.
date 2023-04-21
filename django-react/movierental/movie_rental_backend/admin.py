from django.contrib import admin
from .models import Movie, Review
# from django.contrib.auth.admin import UserAdmin
# Register your models here.
admin.site.register(Movie)
admin.site.register(Review)
# class CustomUserAdmin(UserAdmin):
#     pass
# admin.site.register(CustomUser)
