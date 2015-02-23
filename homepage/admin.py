from django.db import models
from django.contrib import admin

from homepage.models import Organisation, Event, Sponsorship

import datetime

class OrganisationAdmin(admin.ModelAdmin):
  readonly_fields = [
    'created',
    'modified'
  ]

  fieldsets = [
    ('Details',     {'fields': ['name', 'status']}),
  ]

  list_display = ('name', 'status')
  list_filter = ('status',)

admin.site.register(Organisation, OrganisationAdmin)



class EventAdmin(admin.ModelAdmin):
  readonly_fields = [
    'created',
    'modified'
  ]

  fieldsets = [
    ('Details',     {'fields': ['name', 'organiser', 'event_date', 'event_time', 'description']})
  ]

  list_display = ('event_date', 'event_time', 'name', 'status')
  list_filter = ('event_date', 'status')

admin.site.register(Event, EventAdmin)



class SponsorshipAdmin(admin.ModelAdmin):
  readonly_fields = [
    'created',
    'modified'
  ]

  fieldsets = [
    ('Details',     {'fields': ['organisation', 'description']})
  ]

  list_display = ('organisation',)
  list_filter = ('status',)

admin.site.register(Sponsorship, SponsorshipAdmin)
