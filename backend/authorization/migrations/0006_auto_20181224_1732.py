
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0005_auto_20181224_1727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(db_index=True, max_length=256),
        ),
        migrations.AlterField(
            model_name='user',
            name='open_id',
            field=models.CharField(max_length=64, unique=True),
        ),
    ]
