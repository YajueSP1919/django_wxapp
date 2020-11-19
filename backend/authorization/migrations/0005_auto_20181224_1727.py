
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0004_auto_20181224_1556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='open_id',
            field=models.CharField(db_index=True, max_length=64, unique=True),
        ),
    ]
