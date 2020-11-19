#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-


"""
和风天气 http://www.heweather.com/
"""

import json
import requests

from utils import proxy



from thirdparty.weather import CommonWeatherResult

class HeWeather:
    key = '23141d14264444899475aa5f0267b8b1'
    weather_api = 'https://free-api.heweather.com/s6/weather/now'

    @classmethod
    def get_weather(cls, cityname, timeout=1):
        """
        接口返回示例
        {
            "HeWeather6": [
                {
                    "basic": {
                        "cid": "CN101280601",
                        "location": "深圳",
                        "parent_city": "深圳",
                        "admin_area": "广东",
                        "cnty": "中国",
                        "lat": "22.54700089",
                        "lon": "114.08594513",
                        "tz": "+8.00"
                    },
                    "update": {
                        "loc": "2020-09-21 10:45",
                        "utc": "2020-09-21 02:45"
                    },
                    "status": "ok",
                    "now": {
                        "cloud": "0",
                        "cond_code": "101",
                        "cond_txt": "多云",
                        "fl": "33",
                        "hum": "65",
                        "pcpn": "0.0",
                        "pres": "1013",
                        "tmp": "30",
                        "vis": "10",
                        "wind_deg": "255",
                        "wind_dir": "西南风",
                        "wind_sc": "1",
                        "wind_spd": "3"
                    }
                }
            ]
        }
        :param city_info:
        :return:
        """

        weather_result = CommonWeatherResult()

        location = cityname
        params = list()
        params.append('key=%s' % HeWeather.key)
        params.append('location=%s' % location)
        params = '&'.join(params)
        url = HeWeather.weather_api + '?' + params

        p = proxy.proxy()
        response = requests.get(url, timeout=timeout)
        text = response.text
        if not text:
            print('request error!')
        result = json.loads(text)
        now = result.get('HeWeather6')[0].get('now')
        weather_result.temperature = now.get('tmp')
        weather_result.wind_direction = now.get('wind_dir')
        weather_result.humidity = now.get('hum') + '%'
        weather_result.wind_strength = now.get('wind_sc') + '级'
        return weather_result

if __name__ == '__main__':
    result = HeWeather.get_weather('深圳市')
    print(result)
