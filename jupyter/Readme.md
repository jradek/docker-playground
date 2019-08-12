# Jupyter docker stack notebooks

* [Website](https://jupyter-docker-stacks.readthedocs.io/en/latest/index.html)

## Execute

```bash
$ docker-compose -f scipy-notebook.yaml up
```

## Security (Certifactes and token)

* [Links](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html)
* generate certificates

    ```bash
    $ openssl req -x509 -nodes -days 365 -subj '/C=US/ST=CA/O=university/CN=Jupyter Notebook' -newkey rsa:2048 -keyout jupyter-nb-key.key -out jupyter-nb-cert.pem
    ```

* view

    ```bash
    $ openssl x509 -in jupyter-nb-cert.pem -text
    ```

