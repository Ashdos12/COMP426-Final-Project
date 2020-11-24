release: python3 manage.py migrate
web: gunicorn login.wsgi --log-file - 
web: python3 manage.py runserver $PORT

