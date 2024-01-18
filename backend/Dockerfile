# Base image
FROM python:3.9-slim

# Disable .pyc file generation
ENV PYTHONDONTWRITEBYTECODE 1
# Disable stdout, stderr buffering
ENV PYTHONUNBUFFERED 1

# Workdir
WORKDIR /usr/src/app

# Dependencies
COPY ./requirements.txt ./

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY ./app ./

# Run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
