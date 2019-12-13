
// 黄金和石头属性
const ITEMS = {
  GOLD_1: {
    width: 80,
    height: 80,
    score: 500,
    className: "gold_1"
  },
  GOLD_2: {
    width: 50,
    height: 50,
    score: 250,
    className: "gold_2"
  },
  GOLD_3: {
    width: 30,
    height: 30,
    score: 100,
    className: "gold_3"
  },
  GOLD_4: {
    width: 15,
    height: 15,
    score: 50,
    className: "gold_4"
  },
  STONE_1: {
    width: 30,
    height: 30,
    score: 75,
    className: "stone_1"
  },
  STONE_2: {
    width: 20,
    height: 20,
    score: 25,
    className: "stone_2"
  }
};


const LEVEL_1 = [
  ITEMS.GOLD_1,
  ITEMS.GOLD_1,
  ITEMS.GOLD_1,
  ITEMS.GOLD_2,
  ITEMS.GOLD_2,
  ITEMS.GOLD_3,
  ITEMS.GOLD_3,
  ITEMS.GOLD_4,
  ITEMS.GOLD_4,
  ITEMS.GOLD_4,
  ITEMS.STONE_1,
  ITEMS.STONE_1,
  ITEMS.STONE_2,
  ITEMS.STONE_2,
];

const LEVEL = { 1: LEVEL_1 };


export { LEVEL };

export default {};
