export function computPlaceTree(list, isNoDeep) {
  let treeData;
  if (!isNoDeep) {
    treeData = window._.cloneDeep(list);
  } else {
    treeData = list;
  }
  let treeMap = {};
  treeData.forEach(v => {
    treeMap[v.id] = v;
  });

  const tempFunction = function(ids) {
    return ids.map(v => treeMap[v]);
  };

  let arr = [];
  treeData.forEach((item, index) => {
    let isParent = false;
    for (let i = 0, l = treeData.length; i < l; i++) {
      const item2 = treeData[i];
      if (item.level === 5 && Array.isArray(item.pcodes) && item.pcodes.includes(item2.id)) {
        const pPlaces = tempFunction(item.pcodes);
        const pLevels = pPlaces.map(v => (v ? v.level : 0));
        const maxLevel = pPlaces[pLevels.indexOf(Math.max.apply(null, pLevels))];
        if (maxLevel.id === item2.id) {
          isParent = true;
        }
      } else {
        if (item.parentId && item.parentId === item2.id && item.id !== item2.id) {
          isParent = true;
        }
      }
      if (isParent) {
        item.parentLevel = item2.level;
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
        break;
      }
    }
    !isParent && arr.push(index);
  });
  treeMap = null;
  return treeData.filter((_, index) => arr.indexOf(index) > -1);
}

export function computTreeList(list, id = "id", pid = "parentId", isNoDeep) {
  let treeData;
  if (!isNoDeep) {
    treeData = window._.cloneDeep(list);
  } else {
    treeData = list;
  }
  let arr = [];
  treeData.forEach((item, index) => {
    let isParent = false;
    for (let i = 0, l = treeData.length; i < l; i++) {
      const item2 = treeData[i];
      if (item[pid] && item[pid] == item2[id]) {
        isParent = true;
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
        break;
      }
    }
    !isParent && arr.push(index);
  });
  return treeData.filter((_, index) => arr.indexOf(index) > -1);
}
