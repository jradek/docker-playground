# Nginx Playground

```bash
$ docker-compose up
```

## Serve Static Website

* have a look at docker [compose file]()
* mount the files to serve to `/www/data` in container
* mount config to `/etc/nginx` in container
* minimal [`nginx.conf`](nginx/nginx.conf) config

    ```txt
    events {
    }

    http {
        server {
            root /www/data;

            location / {
            }
        }
    }
    ```

## Secrets

* The compose file contains a secret `my-secret`, which is available in the alice container

```bash
$ docker-compose up -d

# location
$ docker exec nginx_alice_1 ls /var/run/secrets
my-secret

# content
$ docker exec nginx_alice_1 cat /var/run/secrets/my-secret
This is the secret haha
```

## Container networks

* The two containers are connected via a network named `???`
* Containers can ping each other by name

    ```bash
    # alice to bob
    $ docker exec nginx_alice_1 ping -c 3 bob
    PING bob (172.27.0.2): 56 data bytes
    64 bytes from 172.27.0.2: seq=0 ttl=64 time=0.181 ms
    64 bytes from 172.27.0.2: seq=1 ttl=64 time=0.298 ms
    64 bytes from 172.27.0.2: seq=2 ttl=64 time=0.276 ms

    # bob to alice
    $ docker exec nginx_bob_1 ping -c 3 alice
    PING alice (172.27.0.3): 56 data bytes
    64 bytes from 172.27.0.3: seq=0 ttl=64 time=0.246 ms
    64 bytes from 172.27.0.3: seq=1 ttl=64 time=0.375 ms
    64 bytes from 172.27.0.3: seq=2 ttl=64 time=0.296 ms
    ```

* And containers can access each others content, of course

    ```bash
    # install curl
    $ docker exec nginx_alice_1 apk add curl
    fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/main/x86_64/APKINDEX.tar.gz

    # get web content of bob
    $ docker exec nginx_alice_1 curl http://bob:80
    #...
    <body>
        <h1>Hello Bob</h1>
        <p>This is bob</p>
    </body>
    # ...
    ```