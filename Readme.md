# Docker playgroud

## Portainer setup

```bash
$ docker volume create portainer_data

$ docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

## nginx examples

* See [Readme](nginx/Readme.md) to learn about

    * Nginx static websites
    * Secrets
    * Inter-container networks
