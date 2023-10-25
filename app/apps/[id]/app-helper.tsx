export function stripObject<T extends Record<string, any>>(obj: T, desiredKeys: string[]): Partial<T> {
  return desiredKeys.reduce((acc, key) => {
      if (key in obj) {
          if (Array.isArray(obj[key])) {
              // If the current property is an array, map over it and apply stripObject on each element
              (acc as any)[key] = obj[key].map((item: any) => {
                  if (typeof item === 'object' && item !== null) {
                      return stripObject(item, desiredKeys);
                  }
                  return item;
              });
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              // If the current property is an object (but not an array), recurse into it
              (acc as any)[key] = stripObject(obj[key], desiredKeys);
          } else {
              (acc as any)[key] = obj[key];
          }
      }
      return acc;
  }, {} as Partial<T>);
}