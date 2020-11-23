from .models import Comment
from rest_framework_json_api import serializers

class CommentSerializer(serializers.HyperlinkedModelSerializer):
  class Meta: 
    model= Comment
    fields = ('author', 'body', 'isbn')
