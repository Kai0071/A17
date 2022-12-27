"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postToChevereto = void 0;
/* eslint-disable */
var http_1 = require("http");
var https_1 = require("https");
var querystring = __importStar(require("querystring"));
var postToChevereto = function (params) {
    return new Promise(function (resolve, reject) {
        var _a = __assign({}, params), apiKey = _a.apiKey, image = _a.image, cheveretoHost = _a.cheveretoHost, _b = _a.customPayload, customPayload = _b === void 0 ? {} : _b;
        // Throw instantly when 'txt' or 'redirect' is passed to customPayload.format.. We don't do that here
        if (customPayload) {
            if (customPayload.format === "txt" || customPayload.format === "redirect") {
                throw new Error("'options.customPayload.format' standard alternatives to 'json' are not supported; see USE_WITH_CHEVERETO.md for more details.");
            }
        }
        var keyValues = __assign({ source: image, key: apiKey }, customPayload);
        var payload = querystring.stringify(keyValues);
        // Parse cheveretoHost to infer relevant request module; default to https unless explicitly given 'http://'
        var goodOldHttp = cheveretoHost.includes("http://");
        var requestFn = goodOldHttp ? http_1.request : https_1.request;
        var hostname = cheveretoHost.includes("://") ? cheveretoHost.split("://")[1] : cheveretoHost;
        var port = goodOldHttp ? 80 : 443;
        // Handle explicit, non-standard ports. We care about freaky configs.
        // 'One must still have chaos in oneself to be able to give birth to a dancing star', ですか。
        if (hostname.includes(":")) {
            var splittedHostname = hostname.split(":");
            port = Number(splittedHostname[1]);
            hostname = splittedHostname[0];
        }
        var options = {
            hostname: hostname,
            port: port,
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
        var req = requestFn(options, function (res) {
            var response = "";
            res.on("data", function (d) {
                response += d;
            });
            res.on("end", function () {
                try {
                    if (response) {
                        var output = JSON.parse(response);
                        // We still need to discriminate between error & success
                        if (output.error) {
                            var error = {
                                message: "".concat(cheveretoHost, " API returned an error"),
                                cheveretoResponse: output,
                            };
                            reject(new Error(JSON.stringify(error, null, 4)));
                        }
                        else {
                            resolve(output);
                        }
                    }
                    else {
                        reject(new Error(String("".concat(cheveretoHost, " returned an empty response"))));
                    }
                }
                catch (error) {
                    reject(new Error(String(error)));
                }
            });
        })
            .on("timeout", function () {
            // https://stackoverflow.com/a/47546591/11894221
            req.destroy();
        })
            .on("error", function (err) {
            reject(new Error(String(err)));
        });
        req.write(payload);
        return req.end();
    });
};
exports.postToChevereto = postToChevereto;
