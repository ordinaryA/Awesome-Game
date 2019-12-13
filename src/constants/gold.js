
// 黄金和石头属性
const ITEMS = {
  GOLD_1: {
    size: 80,
    score: 500,
    background: "#000"
  },
  GOLD_2: {
    size: 50,
    score: 250,
    background: "#000"
  },
  GOLD_3: {
    size: 30,
    score: 100,
    background: "#000"
  },
  GOLD_4: {
    size: 15,
    score: 50,
    background: "#000"
  },
  STONE_1: {
    size: 30,
    score: 75,
    background: "#aaa"
  },
  STONE_2: {
    size: 20,
    score: 25,
    background: "#aaa"
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

export { LEVEL_1 };

export default {};
