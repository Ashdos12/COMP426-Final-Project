release: python3 manage.py migrate
web: python3 manage.py runserver $PORT
web: gunicorn login.wsgi --log-file - 


