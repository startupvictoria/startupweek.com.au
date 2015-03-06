from django.conf.urls import patterns, include, url
from startupweek import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'startupweek.views.home', name='home'),
    #url(r'', include('homepage.urls')),
    url(r'^$', 'django.contrib.staticfiles.views.serve', kwargs={
            'path': 'index.html'}),
    url(r'^(?P<path>.*)', 'django.contrib.staticfiles.views.serve'),
    #url(r'^assets/', 'django.contrib.staticfiles.views.serve'),#, 'document_root': settings.STATIC_ROOT}),
)
