
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0002_auto_20181220_1912'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='focused_cities',
            field=models.TextField(default='[]'),
        ),
        migrations.AlterField(
            model_name='user',
            name='focused_constellations',
            field=models.TextField(default='[]'),
        ),
        migrations.AlterField(
            model_name='user',
            name='focused_stocks',
            field=models.TextField(default='[]'),
        ),
    ]
