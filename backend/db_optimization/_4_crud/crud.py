
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

def ranstr(length):
    CHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    salt = ''
    for i in range(length):
        salt += random.choice(CHS)
    return salt

# --------------------------------------
# 增：添加一个
def add_one():
    user = User(open_id='test_open_id', nickname='test_nickname')
    user.save()
    User.objects.create(open_id='test_open_id2', nickname='test_nickname2')

# 增：批量添加
def add_batch():
    new_user_list = []
    for i in range(10):
        open_id = ranstr(32)
        nickname = ranstr(10)
        new_user = User(open_id=open_id, nickname=nickname)
        new_user_list.append(new_user)
        User.objects.bulk_create(new_user_list)

# --------------------------------------
# 查
# 获取单个对象
def get_one():
    user = User.objects.get(open_id='test_open_id')

# 数据过滤
def get_filter():
    users = User.objects.filter(open_id='test_open_id')
    users = User.objects.filter(open_id__contains='test_')
    users = User.objects.filter(open_id__startswith='test_')

# 数据排序
def get_order():
    users = User.objects.order_by('open_id')

# 连锁查询
def get_chain():
    users = User.objects.filter(open_id__ccontains='test_').order_by('open_id')
    users = User.objects.filter(open_id__ccontains='test_')[:2]

# --------------------------------------
# 改：
def modify_one():
    user = User.objects.get(open_id='test_open_id')
    user.nickname = 'modify_username'
    user.save()

def modify_batch():
    user = User.objects.filter(open_id__contains='test_').update(nickname='modify_username')

# --------------------------------------
# 删：删一个
def delete_one():
    User.objects.get(open_id='test_open_id').delete()

# 删：批量删
def delete_batch():
    User.objects.filter(open_id='test_open_id').delete()

# 删：全量删
def delete_all():
    User.objects.all().delete()

# --------------------------------------
# 数据库函数
# 文本处理函数
# 字符串拼接：Concat
from django.db.models import Value
from django.db.models.functions import Concat

def concat_function():
    filter_user = User.objects.filter(open_id='concat_open_id')
    if filter_user.count() == 0:
        User.objects.create(open_id='concat_open_id', nickname='concat_nickname')

    user = User.objects.filter(open_id='concat_open_id').annotate(screen_name=Concat(
        Value('open_id='),
        'open_id',
        Value(', '),
        Value('nickname='),
        'nickname')
    )[0]
    print('screen name: ', user.screen_name)

# 字符串长度：Length
from django.db.models.functions import Length

def length_function():
    filter_user = User.objects.filter(open_id='length_open_id')
    if filter_user.count() == 0:
        User.objects.create(open_id='length_open_id', nickname='length_nickname')

    user = User.objects.filter(open_id='length_open_id').annotate(open_id_length=Length('open_id'))[0]
    print('open_id_length: ', user.open_id_length)

# 大小写
from django.db.models.functions import Upper, Lower

def case_function():
    filter_user = User.objects.filter(open_id='case_open_id')
    if filter_user.count() == 0:
        User.objects.create(open_id='case_open_id', nickname='case_nickname')

    user = User.objects.filter(open_id='case_open_id').annotate(open_id_upper=Upper('open_id'), open_id_lower=Lower('open_id'))[0]
    print('upper: ', user.open_id_upper, ', lower: ', user.open_id_lower)

# 日期处理函数
# Now()
from django.db.models.functions import Now

def now_function():
    '''
    返回当前日期之前发布的应用
    :return:
    '''
    apps = App.objects.filter(publish_date__lte=Now())
    print(apps)

# Trunc()
from django.db.models import Count
from django.db.models.functions import Trunc

def trunc_function():
    '''
    打印每个月发布的应用数量
    :return:
    '''
    app_per_day = App.objects.annotate(publish_day=(Trunc('publish_date', 'day')))\
        .values('publish_day')\
        .annotate(publish_num=Count('appid'))
    for app in app_per_day:
        print('date: ', app['publish_day'], ', publish num: ', app['publish_num'])


if __name__ == '__main__':
    trunc_function()