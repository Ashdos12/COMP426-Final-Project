from .models import Comment
from .serializers import CommentSerializer
from rest_framework import viewsets, generics, filters
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from django.shortcuts import render
from .filters import CommentFilter
from django.http import JsonResponse
from django.db.models import Q # new
 
# def search(request):
#     comment_list = Comment.objects.all()
#     comment_filter = CommentFilter(request.GET, queryset = comment_list)
#     return render(request, 'search/comment_list.html', {'filter': comment_filter})

class CommentsListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields= ['isbn', 'author']
    authentication_classes = []
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    parser_classes = (FormParser, JSONParser, MultiPartParser)
    def get_comment(self):
            param = self.request.GET.get('q', None)
            return Comment.objects.filter( Q(isbn_icontains=param) | Q(author_icontains=param))
    # def make_comment(self):
    # null