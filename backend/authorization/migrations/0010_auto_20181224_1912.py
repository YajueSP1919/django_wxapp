from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0009_auto_20181224_1738'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(db_index=True, max_length=256),
        ),
    ]
