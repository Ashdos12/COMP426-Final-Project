from django.db import models


class Comment(models.Model):
    isbn = models.CharField(max_length=200)
    id = models.AutoField(primary_key=True)
    author = models.CharField(max_length=200)
    body = models.CharField(max_length=200)