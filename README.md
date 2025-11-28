# StudyShare

A full-stack application built with **Django (backend)** and **React
Native / Expo (frontend)**.

## Overview

This project consists of two main parts:

- **Backend:** Django REST API
- **Frontend:** React Native app using Expo

## Prerequisites

### Make sure you have the following installed before starting

### 1. Python

#### Check Python version

``` sh
python --version
```

### 2. Node.js

#### Check Nodejs version

``` sh
node --version
```

### 3. npm

#### Check npm version

``` sh
npm --version
```

## Backend Setup (Django)

### 1. Navigate to the backend folder

``` sh
cd backend/
```

### 2. Create and activate a virtual environment

#### Windows

``` sh
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

``` sh
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

``` sh
pip install -r requirements.txt
```

### 4. Apply migrations

``` sh
python manage.py migrate
```

### 5. Run the Django server

``` sh
python manage.py runserver 0.0.0.0:8000
```

## Frontend Setup (React Native / Expo)

### 1. Navigate to the frontend folder

``` sh
cd frontend/
```

### 2. Install dependencies

``` sh
npm install
```

## Configure API URL

### 1. Open

``` sh
frontend/src/services/api/client.ts
```

### 2. Replace the value of `ApiUrl`

``` ts
const ApiUrl = "http://<your-local-ip>:8000/api";
```

## Run the Frontend App

``` sh
npx expo start
```
