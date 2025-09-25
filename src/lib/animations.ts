import { AnimationOption } from '@/types/button';

export const hoverAnimations: AnimationOption[] = [
  {
    id: 'none',
    name: 'None',
    description: 'No hover animation',
    cssClass: '',
    animation: '',
  },
  {
    id: 'scale',
    name: 'Scale Up',
    description: 'Gently scales up on hover',
    cssClass: 'anim-hover-scale',
    animation: 'transform: scale(1.05);',
  },
  {
    id: 'glow',
    name: 'Glow Effect',
    description: 'Adds a glowing shadow on hover',
    cssClass: 'anim-hover-glow',
    animation: 'box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);',
  },
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Bounces the button gently',
    cssClass: 'anim-hover-bounce',
    animation: 'animation: bounce 0.8s ease-in-out;',
    keyframes: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `
  },
];

export const entranceAnimations: AnimationOption[] = [
  {
    id: 'none',
    name: 'None',
    description: 'No entrance animation',
    cssClass: '',
    animation: '',
  },
];

export const getAnimationCSS = (animation: AnimationOption, selector: string): string => {
  let css = '';
  if (animation.keyframes) {
    css += animation.keyframes;
  }
  css += `
    ${selector} {
      ${animation.animation}
    }
  `;
  return css;
};

export const getCombinedAnimationClass = (hover: AnimationOption | null, entrance: AnimationOption | null): string => {
  const classes = [];
  if (entrance && entrance.id !== 'none') classes.push(entrance.cssClass);
  if (hover && hover.id !== 'none') classes.push(hover.cssClass);
  return classes.join(' ');
};
