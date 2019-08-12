#!/usr/bin/env sh

# generate
openssl req -x509 -nodes -days 365 -subj '/C=US/ST=CA/O=university/CN=Jupyter Notebook' -newkey rsa:2048 -keyout jupyter-nb-key.key -out jupyter-nb-cert.pem

# view
# openssl x509 -in jupyter-nb-cert.pem -text
