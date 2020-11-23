from .models import Comment
import django_filters

class CommentFilter(django_filters.FilterSet):
    class Meta:
            model = Comment
            fields = ['author', 'isbn', 'id', 'body']