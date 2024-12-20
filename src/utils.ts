export function addPropertyToObject(obj: object, propertyName: string, propertyValue: any) {
  Object.defineProperty(obj, propertyName, {
    value: propertyValue,
    writable: true,
    configurable: true,
    enumerable: true,
  });
}
