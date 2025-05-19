"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/jobs/route";
exports.ids = ["app/api/jobs/route"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_varun_Desktop_ai_job_rec_app_api_jobs_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/jobs/route.ts */ \"(rsc)/./app/api/jobs/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/jobs/route\",\n        pathname: \"/api/jobs\",\n        filename: \"route\",\n        bundlePath: \"app/api/jobs/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\varun\\\\Desktop\\\\ai-job-rec\\\\app\\\\api\\\\jobs\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_varun_Desktop_ai_job_rec_app_api_jobs_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/jobs/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZqb2JzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZqb2JzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGam9icyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN2YXJ1biU1Q0Rlc2t0b3AlNUNhaS1qb2ItcmVjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUN2YXJ1biU1Q0Rlc2t0b3AlNUNhaS1qb2ItcmVjJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNlO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWktam9iLXBsYXRmb3JtLz9jYWM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHZhcnVuXFxcXERlc2t0b3BcXFxcYWktam9iLXJlY1xcXFxhcHBcXFxcYXBpXFxcXGpvYnNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2pvYnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9qb2JzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9qb2JzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdmFydW5cXFxcRGVza3RvcFxcXFxhaS1qb2ItcmVjXFxcXGFwcFxcXFxhcGlcXFxcam9ic1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvam9icy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/jobs/route.ts":
/*!*******************************!*\
  !*** ./app/api/jobs/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const title = searchParams.get(\"title\");\n        const location = searchParams.get(\"location\");\n        const skills = searchParams.get(\"skills\");\n        const jobType = searchParams.get(\"jobType\");\n        const client = await _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n        const db = client.db();\n        const query = {};\n        if (title) {\n            query.title = {\n                $regex: title,\n                $options: \"i\"\n            };\n        }\n        if (location) {\n            query.location = {\n                $regex: location,\n                $options: \"i\"\n            };\n        }\n        if (skills) {\n            query.skills = {\n                $in: skills.split(\",\")\n            };\n        }\n        if (jobType) {\n            query.jobType = jobType;\n        }\n        const jobs = await db.collection(\"jobs\").find(query).sort({\n            createdAt: -1\n        }).toArray();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(jobs);\n    } catch (error) {\n        console.error(\"Jobs fetch error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"An error occurred while fetching jobs\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session || session.user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { title, company, location, description, skills, jobType } = await request.json();\n        // Validate input\n        if (!title || !company || !location || !description || !skills || !jobType) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        const client = await _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n        const db = client.db();\n        const result = await db.collection(\"jobs\").insertOne({\n            title,\n            company,\n            location,\n            description,\n            skills,\n            jobType,\n            createdAt: new Date(),\n            updatedAt: new Date()\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Job created successfully\",\n            jobId: result.insertedId\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Job creation error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"An error occurred while creating job\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkE7UUFDckMsT0FBTzVCLHFEQUFZQSxDQUFDMkIsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBdUMsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDNUY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FpLWpvYi1wbGF0Zm9ybS8uL2FwcC9hcGkvam9icy9yb3V0ZS50cz85ZTc4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5pbXBvcnQgY2xpZW50UHJvbWlzZSBmcm9tIFwiQC9saWIvbW9uZ29kYlwiXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9uZXh0XCJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybClcbiAgICBjb25zdCB0aXRsZSA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZVwiKVxuICAgIGNvbnN0IGxvY2F0aW9uID0gc2VhcmNoUGFyYW1zLmdldChcImxvY2F0aW9uXCIpXG4gICAgY29uc3Qgc2tpbGxzID0gc2VhcmNoUGFyYW1zLmdldChcInNraWxsc1wiKVxuICAgIGNvbnN0IGpvYlR5cGUgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiam9iVHlwZVwiKVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xpZW50UHJvbWlzZVxuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKClcblxuICAgIGNvbnN0IHF1ZXJ5OiBhbnkgPSB7fVxuXG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICBxdWVyeS50aXRsZSA9IHsgJHJlZ2V4OiB0aXRsZSwgJG9wdGlvbnM6IFwiaVwiIH1cbiAgICB9XG5cbiAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgIHF1ZXJ5LmxvY2F0aW9uID0geyAkcmVnZXg6IGxvY2F0aW9uLCAkb3B0aW9uczogXCJpXCIgfVxuICAgIH1cblxuICAgIGlmIChza2lsbHMpIHtcbiAgICAgIHF1ZXJ5LnNraWxscyA9IHsgJGluOiBza2lsbHMuc3BsaXQoXCIsXCIpIH1cbiAgICB9XG5cbiAgICBpZiAoam9iVHlwZSkge1xuICAgICAgcXVlcnkuam9iVHlwZSA9IGpvYlR5cGVcbiAgICB9XG5cbiAgICBjb25zdCBqb2JzID0gYXdhaXQgZGIuY29sbGVjdGlvbihcImpvYnNcIikuZmluZChxdWVyeSkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSkudG9BcnJheSgpXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oam9icylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSm9icyBmZXRjaCBlcnJvcjpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgam9ic1wiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG5cbiAgICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiYWRtaW5cIikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgdGl0bGUsIGNvbXBhbnksIGxvY2F0aW9uLCBkZXNjcmlwdGlvbiwgc2tpbGxzLCBqb2JUeXBlIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgLy8gVmFsaWRhdGUgaW5wdXRcbiAgICBpZiAoIXRpdGxlIHx8ICFjb21wYW55IHx8ICFsb2NhdGlvbiB8fCAhZGVzY3JpcHRpb24gfHwgIXNraWxscyB8fCAham9iVHlwZSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyByZXF1aXJlZCBmaWVsZHNcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xpZW50UHJvbWlzZVxuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKClcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJqb2JzXCIpLmluc2VydE9uZSh7XG4gICAgICB0aXRsZSxcbiAgICAgIGNvbXBhbnksXG4gICAgICBsb2NhdGlvbixcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgc2tpbGxzLFxuICAgICAgam9iVHlwZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJKb2IgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIiwgam9iSWQ6IHJlc3VsdC5pbnNlcnRlZElkIH0sIHsgc3RhdHVzOiAyMDEgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSm9iIGNyZWF0aW9uIGVycm9yOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBjcmVhdGluZyBqb2JcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjbGllbnRQcm9taXNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInRpdGxlIiwiZ2V0IiwibG9jYXRpb24iLCJza2lsbHMiLCJqb2JUeXBlIiwiY2xpZW50IiwiZGIiLCJxdWVyeSIsIiRyZWdleCIsIiRvcHRpb25zIiwiJGluIiwic3BsaXQiLCJqb2JzIiwiY29sbGVjdGlvbiIsImZpbmQiLCJzb3J0IiwiY3JlYXRlZEF0IiwidG9BcnJheSIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJQT1NUIiwic2Vzc2lvbiIsInVzZXIiLCJyb2xlIiwiY29tcGFueSIsImRlc2NyaXB0aW9uIiwicmVzdWx0IiwiaW5zZXJ0T25lIiwiRGF0ZSIsInVwZGF0ZWRBdCIsIm1lc3NhZ2UiLCJqb2JJZCIsImluc2VydGVkSWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/jobs/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getUserById: () => (/* binding */ getUserById)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    console.log(\"Auth: Missing credentials\");\n                    return null;\n                }\n                try {\n                    const client = await _mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n                    const db = client.db();\n                    const user = await db.collection(\"users\").findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        console.log(`Auth: No user found for email ${credentials.email}`);\n                        return null;\n                    }\n                    const isPasswordValid = await (0,bcrypt__WEBPACK_IMPORTED_MODULE_1__.compare)(credentials.password, user.password);\n                    if (!isPasswordValid) {\n                        console.log(`Auth: Invalid password for email ${credentials.email}`);\n                        return null;\n                    }\n                    console.log(`Auth: Successful login for ${credentials.email}, role: ${user.role || \"user\"}`);\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        role: user.role || \"user\"\n                    };\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    cookies: {\n        sessionToken: {\n            name: `next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        },\n        callbackUrl: {\n            name: `next-auth.callback-url`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        },\n        csrfToken: {\n            name: `next-auth.csrf-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    debug: \"development\" === \"development\",\n    secret: process.env.NEXTAUTH_SECRET\n};\n// Helper function to get user by ID\nasync function getUserById(id) {\n    try {\n        const client = await _mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n        const db = client.db();\n        const user = await db.collection(\"users\").findOne({\n            _id: new mongodb__WEBPACK_IMPORTED_MODULE_3__.ObjectId(id)\n        });\n        return user;\n    } catch (error) {\n        console.error(\"Error fetching user:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VztZQUNUckMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQzVCOEIsU0FBUztnQkFDUEMsVUFBVTtnQkFDVkMsVUFBVTtnQkFDVkMsTUFBTTtnQkFDTkMsUUFBUUMsa0JBQXlCO1lBQ25DO1FBQ0Y7SUFDRjtJQUNBRyxPQUFPSCxrQkFBeUI7SUFDaENJLFFBQVFKLFFBQVFLLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDO0FBRUQsb0NBQW9DO0FBQzdCLGVBQWVDLFlBQVkxQixFQUFVO0lBQzFDLElBQUk7UUFDRixNQUFNUCxTQUFTLE1BQU1iLGdEQUFhQTtRQUNsQyxNQUFNYyxLQUFLRCxPQUFPQyxFQUFFO1FBQ3BCLE1BQU1DLE9BQU8sTUFBTUQsR0FBR0UsVUFBVSxDQUFDLFNBQVNDLE9BQU8sQ0FBQztZQUFFSSxLQUFLLElBQUlwQiw2Q0FBUUEsQ0FBQ21CO1FBQUk7UUFDMUUsT0FBT0w7SUFDVCxFQUFFLE9BQU9RLE9BQU87UUFDZFosUUFBUVksS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBTztJQUNUO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9haS1qb2ItcGxhdGZvcm0vLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSBcImJjcnlwdFwiXG5pbXBvcnQgY2xpZW50UHJvbWlzZSBmcm9tIFwiLi9tb25nb2RiXCJcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSBcIm1vbmdvZGJcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1dGg6IE1pc3NpbmcgY3JlZGVudGlhbHNcIilcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGllbnRQcm9taXNlXG4gICAgICAgICAgY29uc3QgZGIgPSBjbGllbnQuZGIoKVxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIikuZmluZE9uZSh7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9KVxuXG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQXV0aDogTm8gdXNlciBmb3VuZCBmb3IgZW1haWwgJHtjcmVkZW50aWFscy5lbWFpbH1gKVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBjb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxuXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdXRoOiBJbnZhbGlkIHBhc3N3b3JkIGZvciBlbWFpbCAke2NyZWRlbnRpYWxzLmVtYWlsfWApXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnNvbGUubG9nKGBBdXRoOiBTdWNjZXNzZnVsIGxvZ2luIGZvciAke2NyZWRlbnRpYWxzLmVtYWlsfSwgcm9sZTogJHt1c2VyLnJvbGUgfHwgXCJ1c2VyXCJ9YClcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSB8fCBcInVzZXJcIiwgLy8gRW5zdXJlIHJvbGUgaXMgYWx3YXlzIGRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dGggZXJyb3I6XCIsIGVycm9yKVxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXG4gICAgZXJyb3I6IFwiL2xvZ2luXCIsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG4gIH0sXG4gIGNvb2tpZXM6IHtcbiAgICBzZXNzaW9uVG9rZW46IHtcbiAgICAgIG5hbWU6IGBuZXh0LWF1dGguc2Vzc2lvbi10b2tlbmAsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogXCJsYXhcIixcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhbGxiYWNrVXJsOiB7XG4gICAgICBuYW1lOiBgbmV4dC1hdXRoLmNhbGxiYWNrLXVybGAsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogXCJsYXhcIixcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzcmZUb2tlbjoge1xuICAgICAgbmFtZTogYG5leHQtYXV0aC5jc3JmLXRva2VuYCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiLFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdldCB1c2VyIGJ5IElEXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5SWQoaWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGNsaWVudFByb21pc2VcbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYigpXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJ1c2Vyc1wiKS5maW5kT25lKHsgX2lkOiBuZXcgT2JqZWN0SWQoaWQpIH0pXG4gICAgcmV0dXJuIHVzZXJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgdXNlcjpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJjb21wYXJlIiwiY2xpZW50UHJvbWlzZSIsIk9iamVjdElkIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsImNsaWVudCIsImRiIiwidXNlciIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwiaXNQYXNzd29yZFZhbGlkIiwicm9sZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJlcnJvciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwicHJvY2VzcyIsImNhbGxiYWNrVXJsIiwiY3NyZlRva2VuIiwiZGVidWciLCJzZWNyZXQiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJnZXRVc2VyQnlJZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Please add your MongoDB URI to .env.local\");\n}\nconst uri = process.env.MONGODB_URI;\nlet client;\nlet clientPromise;\nif (true) {\n    // In development mode, use a global variable so that the value\n    // is preserved across module reloads caused by HMR (Hot Module Replacement).\n    const globalWithMongo = global;\n    if (!globalWithMongo._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\n        globalWithMongo._mongoClientPromise = client.connect();\n    }\n    clientPromise = globalWithMongo._mongoClientPromise;\n} else {}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUM7QUFFckMsSUFBSSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLFdBQVcsRUFBRTtJQUM1QixNQUFNLElBQUlDLE1BQU07QUFDbEI7QUFFQSxNQUFNQyxNQUFNSixRQUFRQyxHQUFHLENBQUNDLFdBQVc7QUFDbkMsSUFBSUc7QUFDSixJQUFJQztBQUVKLElBQUlOLElBQXNDLEVBQUU7SUFDMUMsK0RBQStEO0lBQy9ELDZFQUE2RTtJQUM3RSxNQUFNTyxrQkFBa0JDO0lBSXhCLElBQUksQ0FBQ0QsZ0JBQWdCRSxtQkFBbUIsRUFBRTtRQUN4Q0osU0FBUyxJQUFJTixnREFBV0EsQ0FBQ0s7UUFDekJHLGdCQUFnQkUsbUJBQW1CLEdBQUdKLE9BQU9LLE9BQU87SUFDdEQ7SUFDQUosZ0JBQWdCQyxnQkFBZ0JFLG1CQUFtQjtBQUNyRCxPQUFPLEVBSU47QUFFRCxpRUFBZUgsYUFBYUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FpLWpvYi1wbGF0Zm9ybS8uL2xpYi9tb25nb2RiLnRzPzA1YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tIFwibW9uZ29kYlwiXG5cbmlmICghcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGFkZCB5b3VyIE1vbmdvREIgVVJJIHRvIC5lbnYubG9jYWxcIilcbn1cblxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUklcbmxldCBjbGllbnQ6IE1vbmdvQ2xpZW50XG5sZXQgY2xpZW50UHJvbWlzZTogUHJvbWlzZTxNb25nb0NsaWVudD5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgLy8gSW4gZGV2ZWxvcG1lbnQgbW9kZSwgdXNlIGEgZ2xvYmFsIHZhcmlhYmxlIHNvIHRoYXQgdGhlIHZhbHVlXG4gIC8vIGlzIHByZXNlcnZlZCBhY3Jvc3MgbW9kdWxlIHJlbG9hZHMgY2F1c2VkIGJ5IEhNUiAoSG90IE1vZHVsZSBSZXBsYWNlbWVudCkuXG4gIGNvbnN0IGdsb2JhbFdpdGhNb25nbyA9IGdsb2JhbCBhcyB0eXBlb2YgZ2xvYmFsVGhpcyAmIHtcbiAgICBfbW9uZ29DbGllbnRQcm9taXNlPzogUHJvbWlzZTxNb25nb0NsaWVudD5cbiAgfVxuXG4gIGlmICghZ2xvYmFsV2l0aE1vbmdvLl9tb25nb0NsaWVudFByb21pc2UpIHtcbiAgICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKVxuICAgIGdsb2JhbFdpdGhNb25nby5fbW9uZ29DbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKVxuICB9XG4gIGNsaWVudFByb21pc2UgPSBnbG9iYWxXaXRoTW9uZ28uX21vbmdvQ2xpZW50UHJvbWlzZVxufSBlbHNlIHtcbiAgLy8gSW4gcHJvZHVjdGlvbiBtb2RlLCBpdCdzIGJlc3QgdG8gbm90IHVzZSBhIGdsb2JhbCB2YXJpYWJsZS5cbiAgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSlcbiAgY2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xpZW50UHJvbWlzZVxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJ1cmkiLCJjbGllbnQiLCJjbGllbnRQcm9taXNlIiwiZ2xvYmFsV2l0aE1vbmdvIiwiZ2xvYmFsIiwiX21vbmdvQ2xpZW50UHJvbWlzZSIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fjobs%2Froute&page=%2Fapi%2Fjobs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fjobs%2Froute.ts&appDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvarun%5CDesktop%5Cai-job-rec&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();