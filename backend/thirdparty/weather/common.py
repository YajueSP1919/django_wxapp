#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-


import logging
import datetime

from thirdparty import juhe
from thirdparty.weather import heweather, CommonWeatherResult

logger = logging.getLogger('django')


class WeatherAPIProxy:
    @classmethod
    def ha_request(cls, cityname, timeout):
        try:
            data = juhe.weather(cityname, timeout)
        except Exception as e:
            logger.error("Request juhe weather API timeout. HARequest switch to hefeng weather.")
            data = heweather.HeWeather.get_weather(cityname, timeout)
        data = data.to_dict()
        return data


if __name__ == '__main__':
    print(WeatherAPIProxy.ha_request('北京', 1))
