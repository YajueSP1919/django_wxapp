#!/usr/bin/python
# -*- encoding=utf-8 -*-


import time
import datetime


def get_day_left_in_second():
    """
    返回一天剩余时间（单位：s）
    :return:
    """
    now = datetime.datetime.now()
    tomorrow = now + datetime.timedelta(days=1)
    left = (datetime.datetime(tomorrow.year,
                              tomorrow.month, tomorrow.day, 0, 0, 0) - now)
    return int(left.total_seconds())


def time_str_trunc_in_ms(s):
    """
    2019-01-24 16:29:49,572 => 2019-01-24 16:29:49
    :param s:
    :return:
    """
    return s.split(',')[0].strip()


def str_to_timestamp(s):
    """
    2019-01-24 16:29:49 => 1548318589
    :param s:
    :return:
    """
    return time.mktime(time.strptime(s, "%Y-%m-%d %H:%M:%S"))


if __name__ == '__main__':
    # print(get_day_left_in_second())
    print(str_to_timestamp('2019-01-24 16:29:49'))
