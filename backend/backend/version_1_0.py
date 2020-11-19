from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('service/', include('apis.urls')),
    path('auth/', include('authorization.urls'))
]
