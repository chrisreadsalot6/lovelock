# LoveLock

## Overview

Mobile web application pointing each of two users towards the other through a compass interface.

Live at https://lovelock.vercel.app/

## Technologies

- React
- React Router DOM
- Flask
- SQLAlchemy
- Semantic UI React
- Docker
- S3

## Features

Display compass direction with Sensors API device orientation.

Display direction of locked user.

Display weather and city data on "lock" with OpenWeatherMap and GeoDB Cities APIs.

Store user geolocation with SQLAlchemy and a Flask backend.

Demo user login.

## Challenges

Mobile development environment setup.

Styling across multiple mobile device browsers.

## Code-Snippets

![](https://github.com/rcreadii/lovelock/blob/main/documentation/create%20a%20lock.png)

![](https://github.com/rcreadii/lovelock/blob/main/documentation/pull%20compass%20data.png)

Created at [ray.so](https://ray.so) by Raycast.

## For Developers - Create Local Environment

### Grab Repository (1)

(1) Download the repository from github. In terminal run `gh repo clone chrisreadsalot6/lovelock`
(ii) In terminal go to the root directory (./) of the project with `cd lovelock`

### Setup Python Virtual Environment (2)

(i) In terminal create a virtual environment by running `conda create --name lovelock python=3.8`

### Setup Database (2)

(i) Download and install Postgres
(ii) Create a database called `lovelock` using the command line or an app like Postico
(iii) Grab the database url and secret key and add both to a .env file in the root directory (./) of the project
(iv) In terminal activate the virtual environment by running `conda activate lovelock`
(v) In terminal structure the database with `flask db migrate && flask db upgrade`. If an error, check if you have to run `flask db init`.
(vi) In terminal seed the database with `flask seed all`

### Setup Backend (3)

(i) In terminal activate the virtual environment by running `conda activate lovelock`
(ii) In terminal at the root directory (./) run `pip install -r requirements.txt -r requirements-dev.txt`
(iii) In terminal at the root directory (./) run `flask run --host=localhost --port=5001`

### Setup Frontend (4)

(i) In ./react-app create a .env file with `REACT_APP_API_URL=http://localhost:5001`, or the url of your backend.
(ii) In terminal go to ./react-app run `npm install`
(iii) In terminal go to ./react-app run `npm start`. This will also run NODE_OPTIONS=--openssl-legacy-provider.

## See the App (5)

(i) Go to `http://localhost:3000/` in your browser to see the app !
