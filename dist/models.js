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
        "id": "user",
        "description": "One user",
        "required": ["pk_username", "pwhash"],
        "properties": {
            "pk_username": {
                "type": "string",
                "description": "Uniqe username"
            },
            "pwhash": {
                "type": "string",
                "description": "hashed password"
            },
            "email": {
                "type": "string",
                "description": "email address of the user"
            },
            "isadmin": {
                "type": "boolean",
                "description": "only set for administrators"
            },
            "name": {
                "type": "string",
                "description": "name of the user"
            },
            "surname": {
                "type": "string",
                "description": "surname of the user"
            },
            "companyname": {
                "type": "string",
                "description": "in case of commercial users; name of the company the user is part of"
            },
            "billingaddress": {
                "type": "string",
                "description": "address for the bill"
            },
            "deliveryaddress": {
                "type": "string",
                "description": "address for the delivery"
            },
            "vat": {
                "type": "string",
                "description": "vat number of the company"
            },
            "nameoncc": {
                "type": "string",
                "description": "name of the credit card of the user"
            },
            "creditcardnr": {
                "type": "string",
                "description": "number of the credit card of the user"
            },
            "validyear": {
                "type": "integer",
                "description": "year till that the credit card of the user is valid"
            },
            "validmonth": {
                "type": "integer",
                "description": "month till that the credit card of the user is valid"
            },
            "ccv": {
                "type": "integer",
                "description": "ccv of the users credit card"
            }
        }
    },
    "username": {
        "id": "username",
        "description": "username of the user",
        "required": ["username"],
        "properties": {
            "username": {
                "type": "string",
                "description": "unique username of the user"
            }
        }
    },
    "product": {
        "id": "product",
        "description": "One product",
        "required": ["pk_productid"],
        "properties": {
            "pk_productid": {
                "type": "integer",
                "description": "Uniqe productid"
            },
            "name": {
                "type": "string",
                "description": "name of the product"
            },
            "description": {
                "type": "string",
                "description": "description about the product"
            },
            "soldper": {
                "type": "string",
                "description": "gives the amount/grams/whatever per which that product is sold"
            },
            "amountavailable": {
                "type": "integer",
                "description": "gives the nuber of available items of that product"
            },
            "vatrate": {
                "type": "integer",
                "description": "gives the vat rate for that product"
            },
            "imagename": {
                "type": "string",
                "description": "gives the name of the image for that product (used for GUI)"
            }
        }
    },
};
//# sourceMappingURL=models.js.map