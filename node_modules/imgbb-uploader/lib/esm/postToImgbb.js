/* eslint-disable */
import * as https from "https";
import * as querystring from "querystring";
export const postToImgbb = (params) => new Promise((resolve, reject) => {
    const { apiKey, image, name = null, expiration = null } = { ...params };
    // query string & payload structures are different for imgBB & chevereto-free
    let query = `/1/upload?key=${apiKey}`;
    const payload = querystring.stringify({
        image,
    });
    if (name)
        query += `&name=${encodeURIComponent(name)}`;
    if (expiration)
        query += `&expiration=${expiration}`;
    const options = {
        hostname: "api.imgbb.com",
        method: "POST",
        timeout: 5000,
        path: query,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": payload.length,
        },
    };
    const req = https
        .request(options, (res) => {
        let response = "";
        res.on("data", (d) => {
            response += d;
        });
        res.on("end", () => {
            if (JSON.parse(response).error) {
                const error = {
                    message: "imgBB API returned an error",
                    imgbbApiResponse: JSON.parse(response),
                };
                reject(new Error(JSON.stringify(error, null, 4)));
            }
            else {
                const output = JSON.parse(response).data;
                resolve(output);
            }
        });
    })
        .on("error", (err) => {
        reject(new Error(err));
    });
    req.write(payload);
    return req.end();
});
