from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from rest_framework import viewsets
from importlib import import_module
class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

def get_context_data(self, *args, **kwargs):
     ctx = super(class_name, self).get_context_data(*args, **kwargs)
     ctx["author_name"]=self.request.user
     return ctx 