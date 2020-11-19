from django.urls import path

from .views import weather, menu, image, service, test

urlpatterns = [
    # path('', weather.helloworld)
    path('weather', weather.WeatherView.as_view()),
    # path('menu', menu.get_menu),
    path('menu/user', menu.UserMenu.as_view()),
    path('menu/list', menu.get_menu),
    path('image', image.ImageView.as_view()),
    path('image/list', image.ImageListView.as_view()),

    path('constellation', service.constellation),
    path('joke', service.joke),
    path('today', service.history_today),
    path('stock', service.stock),
    path('test', test.test)
]