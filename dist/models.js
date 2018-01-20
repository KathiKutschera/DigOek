"use strict";
// JSON-Schemas
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = {
    "id": {
        "id": "id",
        "description": "Id",
        "required": ["id"],
        "properties": {
            "id": {
                "type": "integer",
                "format": "int64",
                "description": "Uniqe ID"
            },
            "error": {
                "type": "string",
                "description": "Error message"
            }
        }
    },
    "count": {
        "id": "count",
        "description": "count",
        "required": ["count"],
        "properties": {
            "count": {
                "type": "integer",
                "description": "Number of affected data sets"
            }
        }
    },
    "user": {
        "id": "id",
        "description": "One user",
        "required": ["username", "passwordhash"],
        "properties": {
            "id": {
                "type": "integer",
                "format": "int64",
                "description": "Uniqe ID"
            },
            "username": {
                "type": "string",
                "description": "Uniqe username"
            },
            "passwordhash": {
                "type": "string",
                "description": "hashed password"
            },
            "isuser": {
                "type": "boolean",
                "description": "only set for administrators"
            }
        }
    },
};
//# sourceMappingURL=models.js.map