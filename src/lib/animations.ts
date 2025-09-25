import { AnimationOption } from '@/types/button';

export const hoverAnimations: AnimationOption[] = [
  {
    id: 'none',
    name: 'None',
    description: 'No hover animation',
    cssClass: '',
  },
  {
    id: 'scale',
    name: 'Scale Up',
    description: 'Gently scales up on hover',
    cssClass: 'anim-hover-scale',
    hoverStyles: 'transform: scale(1.05);',
  },
  {
    id: 'glow',
    name: 'Glow Effect',
    description: 'Adds a glowing shadow on hover',
    cssClass: 'anim-hover-glow',
    baseStyles: 'position: relative;',
    keyframes: `
      .anim-hover-glow::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
      }

      .anim-hover-glow:hover::after {
        opacity: 1;
      }
    `
  },
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Bounces the button gently',
    cssClass: 'anim-hover-bounce',
    hoverStyles: 'animation: bounce 0.6s ease-out;',
    keyframes: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
    `
  },
  {
    id: 'shake',
    name: 'Shake',
    description: 'Shakes the button on hover',
    cssClass: 'anim-hover-shake',
    hoverStyles: 'animation: shake 0.4s ease-in-out;',
    keyframes: `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
        20%, 40%, 60%, 80% { transform: translateX(3px); }
      }
    `
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Adds a pulsing effect on hover',
    cssClass: 'anim-hover-pulse',
    hoverStyles: 'animation: pulse 1.5s infinite;',
    keyframes: `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
        70% { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
      }
    `
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Adds a shimmer effect on hover',
    cssClass: 'anim-hover-shimmer',
    baseStyles: `
      position: relative;
      overflow: hidden;
    `,
    keyframes: `
      .anim-hover-shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: -50%;
        width: 20%;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);
        transform: skewX(-20deg);
        transition: left 0.75s;
        pointer-events: none;
      }

      .anim-hover-shimmer:hover::after {
        left: 150%;
      }
    `
  }
];

export const entranceAnimations: AnimationOption[] = [
  {
    id: 'none',
    name: 'None',
    description: 'No entrance animation',
    cssClass: '',
  },
];

export const getAnimationCSS = (animation: AnimationOption, selector: string): string => {
  let css = '';
  const baseSelector = selector.split(':')[0];

  if (animation.keyframes) {
    css += animation.keyframes;
  }
  
  if (animation.baseStyles) {
    css += `
      ${baseSelector} {
        ${animation.baseStyles}
      }
    `;
  }
  
  if (animation.hoverStyles) {
    css += `
      ${selector} {
        ${animation.hoverStyles}
      }
    `;
  }

  return css;
};

export const getCombinedAnimationClass = (hover: AnimationOption | null, entrance: AnimationOption | null): string => {
  const classes = [];
  if (entrance && entrance.id !== 'none') classes.push(entrance.cssClass);
  if (hover && hover.id !== 'none') classes.push(hover.cssClass);
  return classes.join(' ');
};
