
// 物品属性
const 很多很多东西 = {
  篮球1: {
    width: 150,
    height: 150,
    price: 500,
    weight: 5,
    className: "gold_1"
  },
  篮球2: {
    width: 120,
    height: 120,
    price: 250,
    weight: 7,
    className: "gold_2"
  },
  篮球3: {
    width: 80,
    height: 80,
    price: 100,
    weight: 9,
    className: "gold_3"
  },
  篮球4: {
    width: 50,
    height: 50,
    price: 50,
    weight: 11,
    className: "gold_4"
  },
  头发1: {
    width: 80,
    height: 48,
    price: 75,
    weight: 5,
    className: "stone_1"
  },
  头发2: {
    width: 50,
    height: 30,
    price: 25,
    weight: 7,
    className: "stone_2"
  },
  鲲1: {
    width: 80,
    height: 112,
    price: 600,
    weight: 12,
    move: 3,
    area: 400,
    className: "kun_1",
  },
};

const LEVEL_1 = {
  篮球1: 2,
  篮球2: 3,
  篮球3: 3,
  篮球4: 5,
  头发1: 2,
  头发2: 2,
  鲲1: 2,
};

const LEVEL_2 = {
  篮球1: 3,
  篮球2: 4,
  篮球3: 3,
  篮球4: 3,
  头发1: 2,
  头发2: 2,
};


const LEVEL = [
  LEVEL_1,
  LEVEL_2,
];


export { LEVEL, 很多很多东西 };

export default {};
