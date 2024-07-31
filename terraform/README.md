# Running Terraform locally

## Pre-requisites

1. Terraform 1.9 or higher
2. You have a GCP account with billing configured
3. You have the following GCP APIs and Services enabled in your project:
    - Cloud Storage API
    - Cloud Domains API
    - Cloud DNS API
    - Compute Engine API

## Deploying for local/dev

If you are deploying for the first time you will need to initialize terraform:

```
> terraform init
```

Then to deploy changes on a regular basis you just do

```
> terraform apply -auto-approve -var-file="main.tfvars"
```

## Destroying for local/dev

```
> terraform destroy -auto-approve -var-file="main.tfvars"
```
