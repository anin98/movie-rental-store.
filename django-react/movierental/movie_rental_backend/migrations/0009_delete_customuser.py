# Generated by Django 4.2 on 2023-04-16 05:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movie_rental_backend', '0008_customuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]
