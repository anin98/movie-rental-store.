# movie-rental-store Backend .
Clone the repository using gh repo clone anin98/movie-rental-store.
Activate virtual-env using  venv\Scripts\activate 
Go back one folder using cd..
Go to movierental folder using cd movierental
Install requirements file using pip install requirements.txt
Migrate to apply changes using py manage.py makemigrations
Appy the migrations using py manage.py migrate
To be able to access admin view you need to create superuser, you can do this using:
py manage.py createsuperuser and put your username, email and password. You will be registered as an admin
Then start the server using http://localhost:8000/admin/ and put your username and password to login
# In the admin panel you can see the database tables and populate the tables. You must populate the Movie table from the admin panel


# movie-rental-store Frontend
Go to frontend folder
Make sure you have the virtual environment activated
Install all the packages using npm install
Then create a build using npm run build
Then start the project using npm run start
And the project should start!!

In the frontend, after registration and login, users can add review, go to homepage.
Without login users can only see the list of movies in the website and average rating and review
