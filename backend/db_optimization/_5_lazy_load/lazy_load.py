import os
import time
import django
import random
import hashlib

from backend import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from authorization.models import User
from apis.models import App

def lazy_load():
    for user in User.objects.all()[:100]:
        print(user.menu.all())

def pre_load():
    for user in User.objects.all()[:100].prefetch_related('menu'):
        print(user.menu.all())


if __name__ == '__main__':
    pre_load()