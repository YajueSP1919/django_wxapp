
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0003_auto_20181220_1919'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='focused_cities',
            new_name='focus_cities',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='focused_constellations',
            new_name='focus_constellations',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='focused_stocks',
            new_name='focus_stocks',
        ),
    ]
