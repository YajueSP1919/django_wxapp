from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='App',
            fields=[
                ('appid', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=128)),
                ('application', models.CharField(max_length=128)),
                ('name', models.CharField(max_length=128)),
                ('publish_date', models.DateField()),
                ('url', models.CharField(max_length=128)),
                ('desc', models.TextField()),
            ],
        ),
    ]
