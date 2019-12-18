
// 黄金和石头属性
const 很多很多东西 = {
  黄金1: {
    width: 80,
    height: 80,
    price: 500,
    className: "gold_1"
  },
  黄金2: {
    width: 50,
    height: 50,
    price: 250,
    className: "gold_2"
  },
  黄金3: {
    width: 30,
    height: 30,
    price: 100,
    className: "gold_3"
  },
  黄金4: {
    width: 15,
    height: 15,
    price: 50,
    className: "gold_4"
  },
  石头1: {
    width: 30,
    height: 30,
    price: 75,
    className: "stone_1"
  },
  石头2: {
    width: 20,
    height: 20,
    price: 25,
    className: "stone_2"
  }
};

const LEVEL_1 = {
  黄金1: 10,
  // 黄金2: 3,
  // 黄金3: 3,
  // 黄金4: 5,
  // 石头1: 2,
  // 石头2: 2,
};
// const LEVEL_1 = {
//   黄金1: 2,
//   黄金2: 3,
//   黄金3: 3,
//   黄金4: 5,
//   石头1: 2,
//   石头2: 2,
// };

const LEVEL_2 = {
  黄金1: 3,
  黄金2: 4,
  黄金3: 3,
  黄金4: 3,
  石头1: 2,
  石头2: 2,
};


const LEVEL = [
  LEVEL_1,
  LEVEL_2,
];


export { LEVEL, 很多很多东西 };

export default {};
