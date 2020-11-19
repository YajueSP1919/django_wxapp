#!/usr/bin/python
# -*- encoding=utf-8 -*-

import time
import random
from django.http import HttpResponse


def test(request):
    time.sleep(random.randint(1, 100) * 0.01 * 3.1415)
    return HttpResponse("Hello World")
