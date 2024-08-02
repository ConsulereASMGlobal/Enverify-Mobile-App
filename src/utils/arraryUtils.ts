export const mergeArrays = (
  arr1: any[],
  arr2: any[],
  arr1Key: string,
  arr2Key: string
) => {
  function mergeObjects(obj1: any, obj2: any) {
    const mergedObj = { ...obj2 };
    for (const key in obj1) {
      if (key !== "id") {
        mergedObj[key] = obj1[key];
      }
    }
    return mergedObj;
  }

  const mergedArray = arr1
    .map((obj1) => {
      const correspondingObj2 = arr2?.find(
        (obj2) => obj1[arr1Key] === obj2[arr2Key]
      );
      if (correspondingObj2) {
        return mergeObjects(obj1, correspondingObj2);
      } else {
        return null;
      }
    })
    .filter(Boolean);

  return mergedArray;
};
