from django.db import models

class Organisation(models.Model):
  name = models.CharField(max_length=250)

  status = models.IntegerField(default=1)
  image = models.ImageField(blank=True)

  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)

  def __unicode__(self):
    return "%s" % (self.name)


class Event(models.Model):
  name = models.CharField(max_length=250)

  organiser = models.ForeignKey(Organisation)
  description = models.TextField()

  event_date = models.DateField("Date")
  event_time = models.TimeField()

  status = models.IntegerField(default=1)

  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)
  

class Sponsorship(models.Model):
  organisation = models.ForeignKey(Organisation)

  description = models.TextField()

  status = models.IntegerField(default=1)

  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)

  def get_display_name(self):
    return self.organisation
