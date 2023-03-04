import _ from 'lodash';

//1. takes in array of items to be paginated,
//2. current pagenumber
//3. number of items to display per page.
export function paginate(items, pageNumber, pageSize) {
  // formula to find the starting index of the item from current pageNumber
  const startIndex = (pageNumber - 1) * pageSize;
  //wrap items(item is array) in lodash wrapper so you can call it's method
  return _(items)
  // remove all items from previous pages if any.
    .slice(startIndex)
  // this will take the number of items that can fit in pagesize and return a new array
    .take(pageSize)
  // Display the resulting array from Lodash chain
    .value()
}
