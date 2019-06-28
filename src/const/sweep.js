const sidebar = [{
    title: '游戏难度',
    children: [{
        type: 'difficulty',
        mode: 'normal',
        label: '普通 (Normal)',
      },
      {
        type: 'difficulty',
        mode: 'hard',
        label: '困难 (Hard)',
      },
      {
        type: 'difficulty',
        mode: 'crazy',
        label: '疯狂 (Crazy)',
      },
    ],
  },
  {
    title: '自定义',
    children: [{
        type: 'userSet',
        label: '棋盘大小 (Board)',
      },
      {
        type: 'userSet',
        label: '雷的数量 (Mine)',
      },
    ],
  }
];

const buttonList = [{
  label: '重新开始 (RESTART)',
  type: 'restart'
}, ];

export {
  sidebar,
  buttonList
}
