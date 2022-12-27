/* eslint-disable */
import { request as httpRequest } from "http";
import { request as httpsRequest } from "https";
import * as querystring from "querystring";
export const postToChevereto = (params) => new Promise((resolve, reject) => {
    const { apiKey, image, cheveretoHost, customPayload = {} } = { ...params };
    // Throw instantly when 'txt' or 'redirect' is passed to customPayload.format.. We don't do that here
    if (customPayload) {
        if (customPayload.format === "txt" || customPayload.format === "redirect") {
            throw new Error("'options.customPayload.format' standard alternatives to 'json' are not supported; see USE_WITH_CHEVERETO.md for more details.");
        }
    }
    const keyValues = {
        source: image,
        key: apiKey,
        ...customPayload,
    };
    const payload = querystring.stringify(keyValues);
    // Parse cheveretoHost to infer relevant request module; default to https unless explicitly given 'http://'
    const goodOldHttp = cheveretoHost.includes("http://");
    const requestFn = goodOldHttp ? httpRequest : httpsRequest;
    let hostname = cheveretoHost.includes("://") ? cheveretoHost.split("://")[1] : cheveretoHost;
    let port = goodOldHttp ? 80 : 443;
    // Handle explicit, non-standard ports. We care about freaky configs.
    // 'One must still have chaos in oneself to be able to give birth to a dancing star', ですか。
    if (hostname.includes(":")) {
        const splittedHostname = hostname.split(":");
        port = Number(splittedHostname[1]);
        hostname = splittedHostname[0];
    }
    const options = {
        hostname,
        port,
        method: "POST",
        timeout: 15000,
        path: "/api/1/upload",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": payload.length,
        },
        rejectUnauthorized: false,
    };
    const req = requestFn(options, (res) => {
        let response = "";
        res.on("data", (d) => {
            response += d;
        });
        res.on("end", () => {
            try {
                if (response) {
                    const output = JSON.parse(response);
                    // We still need to discriminate between error & success
                    if (output.error) {
                        const error = {
                            message: `${cheveretoHost} API returned an error`,
                            cheveretoResponse: output,
                        };
                        reject(new Error(JSON.stringify(error, null, 4)));
                    }
                    else {
                        resolve(output);
                    }
                }
                else {
                    reject(new Error(String(`${cheveretoHost} returned an empty response`)));
                }
            }
            catch (error) {
                reject(new Error(String(error)));
            }
        });
    })
        .on("timeout", () => {
        // https://stackoverflow.com/a/47546591/11894221
        req.destroy();
    })
        .on("error", (err) => {
        reject(new Error(String(err)));
    });
    req.write(payload);
    return req.end();
});
