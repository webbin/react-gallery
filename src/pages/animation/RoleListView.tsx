import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

type IRole = {
  name: string;
  icon: any;
  backgroundColors: string[];
};

const RoleList = [
  {
    name: '高启强',
    personId: '高启强',
    shortBrief: '京海最强卖鱼佬',
    backgroundColors: ['#6C8947', '#AEBE99', '#2C362D'],
    icon: require('../../assets/roles/gaoqiqiang.png'),
  },
  {
    name: '李知心',
    personId: '李知心',
    shortBrief: '注重细节，\n善于倾听，\n对话温暖。',
    backgroundColors: ['#ebebfa', '#7790c9'],
    icon: require('../../assets/roles/lizhixin.png'),
  },
  {
    name: '曹操',
    personId: '曹操',
    shortBrief: '治世之能臣，\n乱世之奸雄。',
    backgroundColors: ['#FACABF', '#872626'],
    icon: require('../../assets/roles/caocao.png'),
  },
  {
    name: '苏东坡',
    personId: '苏东坡',
    shortBrief:
      '风骚豪放意，\n诗酒自由情。\n博学多才心宽广，\n笔下留香千古名。',
    backgroundColors: ['#D8D8D3', '#856934'],
    icon: require('../../assets/roles/sudongpo.png'),
  },
];

type RoleProp = {
  data: IRole;
};

function RoleView(props: RoleProp) {
  const { data } = props;
  const { name, icon, backgroundColors } = data;

  const [hovered, setHovered] = useState(0);

  const spring = useSpring({
    width: hovered ? 400 : 300,
    height: hovered ? 300 : 200,
    config: {
      duration: 500,
    },
  });

  const imageSpring = useSpring({
    width: hovered ? 300 : 240,
    height: hovered ? 360 : 288,
    config: {
      duration: 500,
    },
  });

  const background = `linear-gradient(45deg,${backgroundColors.join(',')})`;

  return (
    <animated.div
      onMouseEnter={() => {
        setHovered(1);
      }}
      onMouseLeave={() => {
        setHovered(0);
      }}
      style={{
        position: 'relative',
        background,
        borderRadius: 18,
        marginRight: 16,
        ...spring,
      }}
    >
      <animated.img
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          ...imageSpring,
        }}
        src={icon}
      />
    </animated.div>
  );
}

function RoleListView() {
  return (
    <div
      style={{
        flexDirection: 'row',
        display: 'flex',
        height: 320,
        alignItems: 'flex-end',
        marginBottom: 30,
      }}
    >
      {RoleList.map((role) => (
        <RoleView key={role.name} data={role} />
      ))}
    </div>
  );
}

export default RoleListView;
