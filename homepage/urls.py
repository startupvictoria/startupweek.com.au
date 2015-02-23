from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from homepage import views

urlpatterns = patterns('',
  #url('^$', TemplateView.as_view(template_name='index.html')),
  url('^$', views.index, name='index'),
)
