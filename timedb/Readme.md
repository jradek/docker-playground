# InfluxDB and Grafana example

* generate influxdb conf

    ```bash
    docker run --rm influxdb influxd  config > influxdb.conf
    ```

* deploy

    ```bash
    $ docker-compose -f grafana-influxdb.yaml up -d
    ```

* Create database `mydb` in influxdb

    ```bash
    $ docker exec -it influxdb /bin/bash
    root@fc6553b6b8f1:/# influx
    InfluxDB shell version: 1.7.5
    Enter an InfluxQL query
    > create database mydb;
    > exit
    root@fc6553b6b8f1:/# exit
    exit
    ```

* Insert example data

    ```bash
    $ script/sensors.py
    ```

* Open grafana [http://localhost:3000](http://localhost:3000)
* Configure grafana

    * Add `InfluxDb` as source with settings
    * **URL:** http://influxdb:8086
    * **Skip TLS Verify** checked

* Design a dashboard :-)
