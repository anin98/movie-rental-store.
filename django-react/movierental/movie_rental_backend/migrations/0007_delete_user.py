# Generated by Django 4.2 on 2023-04-16 04:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movie_rental_backend', '0006_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
