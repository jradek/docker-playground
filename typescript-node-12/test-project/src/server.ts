/*--------------------------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
 *-------------------------------------------------------------------------------------------------------------*/

import * as express from 'express';

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';

function greeter(person: string) {
    return "Hello, " + person;
}

// App
const app = express();
app.get('/', (req: any, res: any) => {
    const foo: number = 10;
    const s1 = greeter("from docker");
    let s2 = greeter("foobar");
    // s2 = greeter(10); // WILL NOT COMPILE

    res.send(`Other text ${s1} ` + s2);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Used for automated testing
if (process.env.REGRESSION_TESTING === 'true') { process.exit(0); }
