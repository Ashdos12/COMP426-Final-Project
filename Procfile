web: gunicorn login.wsgi:application --log-file - --log-level debug
python manage.py collectstatic 
python manage.py migrate
