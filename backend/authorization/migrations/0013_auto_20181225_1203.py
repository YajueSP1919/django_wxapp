from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
        ('authorization', '0012_auto_20181224_1917'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='menu',
            field=models.ManyToManyField(to='apis.App'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['open_id', 'nickname'], name='authorizati_open_id_5cfcc1_idx'),
        ),
    ]
