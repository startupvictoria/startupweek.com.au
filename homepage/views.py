from django.template.response import TemplateResponse
from django.contrib.auth.decorators import login_required

@login_required(login_url='/admin/login/')
def index(request):
  return TemplateResponse(request, 'index.html', {})
