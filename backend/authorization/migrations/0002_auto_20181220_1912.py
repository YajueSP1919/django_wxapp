
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='focused_cities',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='user',
            name='focused_constellations',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='user',
            name='focused_stocks',
            field=models.TextField(default=''),
        ),
    ]
