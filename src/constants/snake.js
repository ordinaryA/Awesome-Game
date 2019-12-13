const sidebar = [{
  title: '游戏模式 (Game Modes)',
  children: [{
    label: '经典 (Classic)',
    type: 'mode',
    mode: 'classicMode'
  },
  {
    label: '冒险 (Adventure)',
    type: 'mode',
    mode: 'adventureMode'
  },
  {
    label: '自由 (Freedom)',
    type: 'mode',
    mode: 'freeMode'
  }
  ]
},
{
  title: '棋盘 (Checkerboard)',
  children: [{
    label: '边框 (Border)',
    type: 'board',
    size: 'border'
  },
  {
    label: '20 x 20',
    type: 'board',
    size: 'twenty'
  },
  {
    label: '50 x 50',
    type: 'board',
    size: 'fifty'
  },
  {
    label: '70 x 70',
    type: 'board',
    size: 'seventy'
  },
  {
    label: '100 x 100',
    type: 'board',
    size: 'hundred'
  }
  ]
},
{
  title: '难度 (Difficulty)',
  children: [{
    type: 'difficulty',
    speed: 'normal',
    label: '普通 (Normal)'
  },
  {
    type: 'difficulty',
    speed: 'hard',
    label: '困难 (Hard)'
  },
  {
    type: 'difficulty',
    speed: 'crazy',
    label: '疯狂 (Crazy)'
  }
  ]
}
];

const buttonList = [{
  label: '重新开始 (RESTART)',
  type: 'restart'
},
{
  label: '暂停游戏 (空格键 SPACE)',
  type: 'stop'
},
{
  label: 'TEST BUTTON',
  type: 'alert'
}
];

export {
  sidebar,
  buttonList
};

export default {};

