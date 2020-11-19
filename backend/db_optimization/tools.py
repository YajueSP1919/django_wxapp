# -*- encoding=utf-8 -*-


import os
import time
import django
import random
import hashlib

import time, statistics

from django.utils import timezone

from backend import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from authorization.models import User
from apis.models import App

def ranstr(length):
    CHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    salt = ''
    for i in range(length):
        salt += random.choice(CHS)
    return salt

class DataTool:

    @classmethod
    def generate_fake_user_data(cls, count):
        all_app = App.objects.all()
        new_user_list = []
        for i in range(count):
            open_id = ranstr(32)
            nickname = ranstr(10)
            new_user = User(open_id=open_id, nickname=nickname)
            new_user_list.append(new_user)
            if i % 1000 == 0:
                print('created %d items.' % i)
                User.objects.bulk_create(new_user_list)
                new_user_list = []
        all_user = User.objects.all()
        for user in all_user:
            user.menu.set(random.sample(list(all_app), random.randint(1, all_app.count())))
            user.save()


from db_optimization._5_lazy_load import lazy_load

class TimeTestTool:
    @classmethod
    def calc_func_time(cls, func):
        start = time.perf_counter()
        func()
        end = time.perf_counter()
        return end - start

    @classmethod
    def statistic_run_time(cls, func, n):
        data = [cls.calc_func_time(func) for i in range(n)]
        mean = statistics.mean(data)
        sd = statistics.stdev(data, xbar=mean)
        return [data, mean, sd, max(data), min(data)]

    @classmethod
    def compare(cls, func1, func2, n):
        result1 = cls.statistic_run_time(func1, n)
        result2 = cls.statistic_run_time(func2, n)
        print('对比\t no prefetch\t prefetch')
        print('平均值\t', result1[1], '\t', result2[1])
        print('标准差\t', result1[2], '\t', result2[2])
        print('最大\t', result1[3], '\t', result2[3])
        print('最小\t', result1[4], '\t', result2[4])


class StressTest:

    def get_all_user(self):
        pass



if __name__ == '__main__':
    # DataTool.generate_fake_user_data(10000)
    TimeTestTool.compare(lazy_load.lazy_load, lazy_load.pre_load, 100)