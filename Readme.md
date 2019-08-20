# Docker playgroud

## Portainer setup

```bash
$ docker volume create portainer_data

$ docker run --name portainer -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

## nginx examples

* See [Readme](nginx/Readme.md) to learn about

    * Nginx static websites
    * Secrets
    * Inter-container networks

## TimeDB example with InfluxDB and Grafana

* See [Readme](timedb/Readme.md) to learn about


## Dockerized Reactapp

* See [Readme](react-sample/Readme.md) to learn about

## Jupyter docker stack

* See [Readme](jupyter/Readme.md) to learn about

## Typescript testing container

* See [Readme](typescript-node-12/README.md) to learn about

