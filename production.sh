#!/bin/bash

sudo docker build -t ermiry/silvertime-overview:latest -f Dockerfile .

sudo docker push ermiry/silvertime-overview:latest
