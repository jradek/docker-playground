"influxdb example"

#!/usr/bin/env python3

import random
import requests
import time


def total_ms_now():
    return int(time.time() * 1000)


def gen_next_cpu(curr):
    "generate next cpu value"
    step = random.uniform(-10.0, 10.0)
    return max(0, min(curr + step, 100))


def gen_next_temp(curr, min_temp=0, max_temp=60):
    "generate next temperature value"
    step = random.uniform(-10.0, 10.0)
    return max(min_temp, min(curr + step, max_temp))


def gen_next_memory(curr, max_memory=10000):
    "generate next memory value"
    step = random.randrange(-100, 100)
    return max(0, min(curr + step, max_memory))


def gen_next_sensor_values(start_values):
    "generate sensor values"
    values = start_values
    while True:
        cpu, mem, temp = values
        values = gen_next_cpu(cpu), gen_next_memory(mem), gen_next_temp(temp)
        yield values


def gen_time_series_ms(num_points=5000, start_time_ms=None, time_step_sec=5):
    "generate a time series"
    if start_time_ms is None:
        start_time_ms = total_ms_now() - (time_step_sec * 1000) * num_points

    for i, values in zip(range(num_points), gen_next_sensor_values((10, 0, 20))):
        yield start_time_ms + i * time_step_sec * 1000, values


def line_protocol(values):
    "apply influxdeb line protocol"
    t, (cpu, mem, temp) = values
    return "sensors,device=macbook cpu={0:.2f},memory={1:.1f},temp_celcius={2:.2f} {3}".format(
        cpu, mem, temp, t
    )


def insert_sensors():
    "insert data to DB"
    payload = "\n".join(map(line_protocol, gen_time_series_ms()))
    print(payload)
    url = "http://localhost:8086/write"
    querystring = {"db": "mydb", "precision": "ms"}
    response = requests.request("POST", url, data=payload, params=querystring)
    print(response.text)


def query_sensors():
    "query sensor data"
    url = "http://localhost:8086/query"
    querystring = {"pretty": "true", "db": "mydb", "q": 'SELECT * FROM "sensors"'}
    response = requests.request("GET", url, params=querystring)
    print(response)
    print(response.text)


def main():
    # insert_sensors()
    query_sensors()
    pass


if __name__ == "__main__":
    main()
