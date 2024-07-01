const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Request-Headers", "*");
myHeaders.append('Access-Control-Allow-Origin', "*");
myHeaders.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
myHeaders.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');


function insertOne(user, pass) {
    const document = JSON.stringify({
        "collection": "users",
        "database": "app",
        "dataSource": "cluster-free",
        "document": {
            "user": user,
            "password": pass
        }
    });

    const data = {
        method: "POST",
        headers: myHeaders,
        body: document,
        redirect: "follow"
    };

    fetch("https://data.mongodb-api.com/app/data-iixbj/endpoint/data/v1/action/insertOne", data);
}

async function findOne(user, pass) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append('Access-Control-Allow-Origin', "*");
    myHeaders.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    myHeaders.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    const document = JSON.stringify({
        "collection": "users",
        "database": "app",
        "dataSource": "cluster-free",
        "filter": {
            "user": user,
            "password": pass
        }
    });

    let authResponse = authenticate();

    myHeaders.append("Authorize", authResponse.auth);

    const data = {
        mode: 'no-cors',
        method: "POST",
        headers: myHeaders,
        body: document,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://data.mongodb-api.com/app/data-iixbj/endpoint/data/v1/action/findOne", data);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const response_json = await response.json();
        return response_json;
    } catch (error) {
        console.error(error.message);
    }
}

async function authenticate() {

    const myHeadersLogin = new Headers();
    myHeadersLogin.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "key": "AnJcchaSPBkcpFdh4k24hMf72nVW4QME4KTGUivhKznfjpcC9BmKlgGJxf3Y98h7"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeadersLogin,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://services.cloud.mongodb.com/api/client/v2.0/app/data-iixbj/auth/providers/api-key/login", requestOptions);

        const response_json = await response.json();

        const document = JSON.stringify({
            "collection": "users",
            "database": "app",
            "dataSource": "cluster-free",
            "filter": {
                "user": "matias",
                "password": "prueba"
            }
        });

        myHeaders.append("Authorize", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjM3OTk3YTZlYmJjMDdhNWJlODFjZWViIiwiZXhwIjoxNzE5ODc1NTgyLCJpYXQiOjE3MTk4NzM3ODIsImlzcyI6IjY2ODMzMGY2NjYxYjEyYWQ1MjU2ZWUxNiIsImp0aSI6IjY2ODMzMGY2NjYxYjEyYWQ1MjU2ZWUyMCIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjYzNzk5N2E2ZWJiYzA3YTViZTgxY2VlYiIsInN1YiI6IjY2ODJjZWVhNDNhODllZjZjZWU4YWQ4YiIsInR5cCI6ImFjY2VzcyJ9.kZySs5pC74GPeZ_3Zdc0hMlC0Oj_S6WIcXoznHsfC0o");

        const data = {
            mode: 'no-cors',
            method: "POST",
            headers: myHeaders,
            body: document,
            redirect: "follow"
        };

        const responseFindOne = await fetch("https://data.mongodb-api.com/app/data-iixbj/endpoint/data/v1/action/findOne", data);
        
        if (!responseFindOne.ok) {
            throw new Error(`Response status: ${responseFindOne.status}`);
        }

        const response_find_one_json = responseFindOne.json();
        console.log(response_find_one_json);
        return response_find_one_json;
    } catch (error) {
        console.error(error.message);
    }
}