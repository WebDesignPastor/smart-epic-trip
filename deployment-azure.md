# SmartEpicTrip Deployment 🚀

This document outlines the steps taken to deploy the SmartEpicTrip project using Azure services, including creating a resource group, building Docker images, and deploying web applications.
## Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Create a Resource Group](#step-1-create-a-resource-group)
- [Step 2: List Resource Groups](#step-2-list-resource-groups)
- [Step 3: Create Azure Container Registry (ACR)](#step-3-create-azure-container-registry-acr)
- [Step 4: Login to Azure Container Registry](#step-4-login-to-azure-container-registry)
- [Step 5: Build Docker Images](#step-5-build-docker-images)
- [Step 6: List Docker Images](#step-6-list-docker-images)
- [Step 7: Push Docker Images to ACR](#step-7-push-docker-images-to-acr)
- [Step 8: List ACR Repositories](#step-8-list-acr-repositories)
- [Step 9: Create Azure App Service Plan](#step-9-create-azure-app-service-plan)
- [Step 10: Create Web App for Frontend](#step-10-create-web-app-for-frontend)
- [Step 11: Create Web App for Backend](#step-11-create-web-app-for-backend)
- [Step 12: Create Web App for Microservices](#step-12-create-web-app-for-microservices)
- [Step 13: List Web Apps](#step-13-list-web-apps)
- [Step 14: Check web app status](#step-14-check-web-app-status)
- [Step 15: Configure Application Settings](#step-15-configure-application-settings)
- [Step 16: Add CORS for backend and microservices](#step-16-add-cors-for-backend-and-microservices)
- [Step 17 : Update ACR settings](#step-17--update-acr-settings)
- [Step 18: Verify Deployment](#step-18-verify-deployment)
- [Conclusion](#conclusion)

## Prerequisites
Before you begin the deployment process, make sure you have the following prerequisites:
- An Azure account with an active subscription. If you don't have an Azure account, you can create a free account [here](https://azure.microsoft.com/en-us/free/).
- Azure CLI installed on your local machine. You can install Azure CLI by following the instructions [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
- Docker installed on your local machine. You can install Docker by following the instructions [here](https://docs.docker.com/get-docker/).
- The SmartEpicTrip project cloned from the GitHub repository.
- The .env files for frontend and microservices applications with the necessary configurations.
- The Dockerfile for frontend, backend, and microservices applications in the root directory of each application.

Login to your Azure account using the Azure CLI:
```bash
az login
```



## Step 1: Create a Resource Group
To organize all related resources, first create a resource group named `SmartEpicTrip` located in the `eastus` region.

```bash
az group create --name SmartEpicTrip --location eastus
```
## Step 2: List Resource Groups
You can verify the creation of the resource group by listing all resource groups in your Azure account.

```bash
az group list --output table
```

## Step 3: Create Azure Container Registry (ACR)
Next, create an Azure Container Registry named smartepictripacr with a Basic SKU. This registry will store and manage your Docker container images.

```bash
az acr create --resource-group SmartEpicTrip --name smartepictripacr --sku Basic
```

## Step 4: Login to Azure Container Registry
Authenticate your local Docker client to the Azure Container Registry. This step is necessary to push images to your ACR.
    
```bash
az acr login --name smartepictripacr
# Output: Login Succeeded
```

## Step 5: Build Docker Images
Build the Docker images for the frontend and backend applications. Make sure you are in the root directory of each application before running the following commands.

### Frontend Application
```bash
docker build -t smartepictripacr.azurecr.io/frontend:latest -f .\front\Dockerfile .
```

### Backend Application
```bash
docker build -t smartepictripacr.azurecr.io/backend:latest -f .\back\Dockerfile .\back
```
### Microservices
```bash
docker build -t smartepictripacr.azurecr.io/microservices:latest -f .\microservices\Dockerfile .\microservices
```

## Step 6: List Docker Images 📦
You can verify the successful creation of Docker images by listing all images in your local Docker client.

```bash
docker images
```
Sample Output:
```bash
REPOSITORY                                TAG                 IMAGE ID            CREATED             SIZE
smartepictripacr.azurecr.io/frontend       latest              1234567890ab        1 minute ago        200MB
smartepictripacr.azurecr.io/backend        latest              0987654321cd        2 minutes ago       300MB
smartepictripacr.azurecr.io/microservices  latest              567890abcd123        3 minutes ago       400MB
```

## Step 7: Push Docker Images to ACR  🚀
Push the Docker images to your Azure Container Registry.

### Frontend Application
```bash
docker push smartepictripacr.azurecr.io/frontend:latest
```

### Backend Application
```bash
docker push smartepictripacr.azurecr.io/backend:latest
```

### Microservices
```bash
docker push smartepictripacr.azurecr.io/microservices:latest
```

## Step 8: List ACR Repositories  📜
You can verify the successful push of Docker images by listing all repositories in your Azure Container Registry.

```bash
az acr repository list --name smartepictripacr --output table
```

## Step 9: Create Azure App Service Plan ☁️
Create an Azure App Service Plan named `SmartEpicTripPlan` with a Linux operating system and a Basic SKU.

```bash
az appservice plan create --name SmartEpicTripPlan --resource-group SmartEpicTrip --is-linux --sku B1
```

## Step 10: Create Web App for Frontend
Create a web app named `SmartEpicTripFrontend` using the Docker image from your Azure Container Registry.

```bash
az webapp create --resource-group SmartEpicTrip --plan SmartEpicTripPlan --name SmartEpicTripFrontend --deployment-container-image-name smartepictripacr.azurecr.io/frontend:latest
```

## Step 11: Create Web App for Backend
Create a web app named `SmartEpicTripBackend` using the Docker image from your Azure Container Registry.

```bash
az webapp create --resource-group SmartEpicTrip --plan SmartEpicTripPlan --name SmartEpicTripBackend --deployment-container-image-name smartepictripacr.azurecr.io/backend:latest
```

## Step 12: Create Web App for Microservices
Create a web app named `SmartEpicTripMicroservices` using the Docker image from your Azure Container Registry.

```bash
az webapp create --resource-group SmartEpicTrip --plan SmartEpicTripPlan --name SmartEpicTripMicroservices --deployment-container-image-name smartepictripacr.azurecr.io/microservices:latest
```

## Step 13: List Web Apps
You can verify the successful creation of web apps by listing all web apps in your Azure account.

```bash
az webapp list --resource-group SmartEpicTrip --output table
```

## Step 14: Check web app status
You can verify the successful creation of web apps by checking the status of the web apps in your Azure account.

```bash
az webapp show --resource-group SmartEpicTrip --name SmartEpicTripFrontend --query state
```
sample output:
```bash
HostName                                    State
------------------------------------------  -------
epictripmicroservicesapp.azurewebsites.net  Running
epictripbackendapp.azurewebsites.net        Running
epictripfrontendapp.azurewebsites.net       Running
```

## Step 15: Configure Application Settings
Configure the necessary application settings for each web app, including connection strings, environment variables, and other configurations.

### Frontend Application 🌐
```bash
az webapp config appsettings set --resource-group SmartEpicTrip --name EpicTripFrontendApp --settings VITE_GOOGLE_MAPS_API_KEY={VITE_GOOGLE_MAPS_API_KEY} VITE_API_URL=http://epictripbackendapp.azurewebsites.net VITE_USER_API_URL=http://epictripmicroservicesapp.azurewebsites.net/api
```

#### Check configuration for the frontend application
```bash
az webapp config appsettings list --resource-group SmartEpicTrip --name EpicTripFrontendApp
```

### Backend Application
```bash
az webapp config appsettings set --resource-group SmartEpicTrip --name EpicTripBackendApp --settings CGO_ENABLED=1
```

#### Check configuration for the backend application
```bash
az webapp config appsettings list --resource-group SmartEpicTrip --name EpicTripBackendApp
```

### Microservices
```bash
az webapp config appsettings set --resource-group SmartEpicTrip --name EpicTripMicroservicesApp --settings TICKETMASTER_API_KEY={TICKETMASTER_API_KEY} TICKETMASTER_API_URL=https://app.ticketmaster.com/discovery/v2/events GOOGLE_API_KEY={GOOGLE_API_KEY} GOOGLE_API_URL=https://maps.googleapis.com/maps/api/place/nearbysearch/json GOOGLE_API_AUTOCOMPLETE_URL=https://maps.googleapis.com/maps/api/place/autocomplete/json GOOGLE_API_PLACE_DETAILS_URL=https://maps.googleapis.com/maps/api/place/details/json GOOGLE_API_GEOCODE_URL=https://maps.googleapis.com/maps/api/geocode/json RADIUS=50000 PORT=8080
```

#### Check configuration for the microservices
```bash
az webapp config appsettings list --resource-group SmartEpicTrip --name EpicTripMicroservicesApp
```

## Step 16: Add CORS for backend and microservices
Add CORS (Cross-Origin Resource Sharing) settings to allow the frontend application to communicate with the backend and microservices.

### Backend Application
```bash
az webapp cors add --resource-group SmartEpicTrip --name SmartEpicTripBackend --allowed-origins https://epictripfrontendapp.azurewebsites.net
```

### Microservices
```bash
az webapp cors add --resource-group SmartEpicTrip --name SmartEpicTripMicroservices --allowed-origins https://epictripfrontendapp.azurewebsites.net
```

### Check CORS settings for the backend application
```bash
az webapp cors show --resource-group SmartEpicTrip --name SmartEpicTripBackend
```

### Check CORS settings for the microservices
```bash
az webapp cors show --resource-group SmartEpicTrip --name SmartEpicTripMicroservices
```

## Step 17 : Update ACR settings ⚙️
Update the Azure Container Registry settings to allow the web apps to pull images from the ACR.

```bash
az acr update -n smartepictripacr --admin-enabled true
```

## Step 18: Verify Deployment ✅
You can verify the successful deployment of the SmartEpicTrip project by accessing the web apps in your browser.

### Frontend Application
```bash
https://epictripfrontendapp.azurewebsites.net
```

### Backend Application
You can test endpoints using Postman or any other API testing tool.
Create a user on the following endpoint: POST
```bash
http://epictripbackendapp.azurewebsites.net/api/users/
```

{
"user": {
"email": "test1@test.com",
"username": "test1",
"password": "test1"
}
}


## Conclusion
In this document, we have successfully deployed the SmartEpicTrip project using Azure services, including creating a resource group, building Docker images, and deploying web applications. By following these steps, you can easily deploy your own projects on Azure and leverage the power of cloud computing for your applications.




