from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0008_auto_20181224_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(max_length=256),
        ),
    ]
