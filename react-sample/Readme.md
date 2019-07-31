# Readme

## Bootstrap

This project was bootstrapped like this

1. Start a npm container to create project
   This is similar to the _Project setup_ step in [here](https://mherman.org/blog/dockerizing-a-react-app/#react-router-and-nginx) but does not require `npm` on the host machine

    ```bash
    $ docker run -it -v ${PWD}:/data node:10 /bin/bash

    root@8d89970cf538: cd /data
    root@8d89970cf538: npm install -g create-react-app@3.0.1
    root@8d89970cf538: create-react-app react-sample
    ```

2. Follow the _Docker_ steps from [here](https://mherman.org/blog/dockerizing-a-react-app/#react-router-and-nginx), i.e. basically creating the [Dockerfile](Dockerfile)

    ```bash
    $ docker build -t react-sample:dev .
    $ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm react-sample:dev
    ```

3. Open browser [localhost:3001](http://localhost:3001)

4. Follow tutorial from here [link](https://www.youtube.com/watch?v=dSN44KPRmTU&list=WL&index=67&t=0s)

    * Install additional modules like this (assuming `9d983c69` is the running container)

        ```bash
        $ docker exec 9d983c69 npm install materialize-css@next
        found 0 vulnerabilities

        $ docker exec 9d983c69 npm install react-router-dom axios
        found 0 vulnerabilities
        ```

## Debugging within `vscode`

1. Open folder in `vscode` which would create a devcontainer
2. In container (i.e. terminal in vscode), run `npm start`
3. Launch debug configuration `Debug with Chrome`
4. Happy debugging ...

## Generated `npm` Readme

[Readme](Readme_npm.md)