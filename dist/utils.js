"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPropertyToObject = addPropertyToObject;
function addPropertyToObject(obj, propertyName, propertyValue) {
    Object.defineProperty(obj, propertyName, {
        value: propertyValue,
        writable: true,
        configurable: true,
        enumerable: true,
    });
}
