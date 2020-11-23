"""login URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.views.generic.base import TemplateView
from django.conf import settings
from rest_framework import routers
from .views import SignUpView, signup 
from django.conf.urls.static import static
from comment import views
from django.conf.urls import url
from django.contrib.auth import views as auth_views


router = routers.DefaultRouter()
router.register(r'comment', views.CommentViewSet)

urlpatterns = [

    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')), 
    path('', TemplateView.as_view(template_name='home.html'), name='home'), 
    path('accounts/signup/', signup, name='signup'),
    path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'), 
    path('accounts/login/', TemplateView.as_view(template_name='registration/login.html'), name='login'),
    path('', include(router.urls)),
    # url(r"^search/", include(("commment.urls", "comment"), namespace = "search"))
    path('search/', views.CommentsListView.as_view()),
    path('profile/search/', views.CommentsListView.as_view()),
    
]   

