export function removeDetailSections(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If the current property is an object or array, recurse into it
        //console.log("Is an object")
        //console.log(obj[key])
        removeDetailSections(obj[key]);
      }
  
      // If the current property is named "detail", delete it
      if (key === 'detail') {
        //console.log("to be deleted")
        //console.log(obj[key])
        delete obj[key];
      }
    }
    return obj;
  }
