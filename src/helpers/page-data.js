import R from 'ramda';

const getData = (root, comps) => {
  const data = require(root);
  const compData = glob.sync(comps, {});
  const tempData = {};

  compData.forEach(function cb(page) {
    R.merge(tempData, require(page));
  });

  // since require will cache the origin items returned from the require(root) call,
  // we need to delete the cache so it fetches any updated data from the json file
  delete require.cache[require.resolve(root)];
  return R.merge(tempData, data);
};

export default getData;
