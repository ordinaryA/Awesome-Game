const sidebar = [{
  title: '游戏难度',
  children: [
    {
      type: 'difficulty',
      mode: 'normal',
      label: '普通 (Normal)'
    },
    {
      type: 'difficulty',
      mode: 'hard',
      label: '困难 (Hard)'
    },
    {
      type: 'difficulty',
      mode: 'crazy',
      label: '疯狂 (Crazy)'
    },
    {
      type: 'difficulty',
      mode: 'hell',
      label: '?????(?????)'
    }
  ],
},
{
  title: '自定义',
  children: [{
    type: 'userSet',
    label: '棋盘大小 (Board)'
  },
  {
    type: 'userSet',
    label: '雷的数量 (Mine)'
  }
  ]
},
];

// 游戏难度雷以及棋盘枚举
const modeEnum = {
  normal: { boardSize: [10, 10], mineCount: 10, type: 'primary' },
  hard: { boardSize: [20, 15], mineCount: 50, type: 'secondary' },
  crazy: { boardSize: [40, 20], mineCount: 150, type: 'warning' },
  hell: { boardSize: [45, 25], mineCount: 230, type: 'danger' },
};

const buttonList = [{
  label: '重新开始 (RESTART)',
  type: 'restart'
}];

export {
  sidebar,
  buttonList,
  modeEnum,
};

export default {};

