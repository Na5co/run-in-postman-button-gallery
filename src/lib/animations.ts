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
    cssClass: 'hover:scale-105',
    animation: 'transform: scale(1.05);',
  },
  {
    id: 'lift',
    name: 'Lift Up',
    description: 'Lifts the button up on hover',
    cssClass: 'hover:-translate-y-0.5 hover:shadow-lg',
    animation: 'transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.15);',
  },
  {
    id: 'glow',
    name: 'Glow Effect',
    description: 'Adds a glowing shadow on hover',
    cssClass: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]',
    animation: 'box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);',
  },
  {
    id: 'rotate',
    name: 'Slight Rotate',
    description: 'Rotates slightly on hover',
    cssClass: 'hover:rotate-1 hover:scale-102',
    animation: 'transform: rotate(1deg) scale(1.02);',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Pulses the button size',
    cssClass: 'animate-pulse',
    animation: 'animation: pulse 1s infinite;',
    keyframes: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `
  },
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Bounces the button gently',
    cssClass: 'animate-bounce',
    animation: 'animation: bounce 1s;',
    keyframes: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Adds a shimmer effect across the button',
    cssClass: 'animate-shimmer',
    animation: 'animation: shimmer 2s infinite;',
    keyframes: `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
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
    animation: '',
  },
  {
    id: 'fadeIn',
    name: 'Fade In',
    description: 'Fades in when page loads',
    cssClass: 'animate-fadeIn',
    animation: 'animation: fadeIn 0.5s ease-out;',
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `
  },
  {
    id: 'slideUp',
    name: 'Slide Up',
    description: 'Slides up from bottom',
    cssClass: 'animate-slideUp',
    animation: 'animation: slideUp 0.5s ease-out;',
    keyframes: `
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `
  },
  {
    id: 'zoomIn',
    name: 'Zoom In',
    description: 'Zooms in from small size',
    cssClass: 'animate-zoomIn',
    animation: 'animation: zoomIn 0.5s ease-out;',
    keyframes: `
      @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `
  },
  {
    id: 'flipIn',
    name: 'Flip In',
    description: 'Flips in with 3D effect',
    cssClass: 'animate-flipIn',
    animation: 'animation: flipIn 0.6s ease-out;',
    keyframes: `
      @keyframes flipIn {
        from { transform: perspective(400px) rotateY(-90deg); opacity: 0; }
        to { transform: perspective(400px) rotateY(0deg); opacity: 1; }
      }
    `
  }
];

export const getAnimationCSS = (animation: AnimationOption, cssClass: string): string => {
  let css = '';
  if (animation.keyframes) {
    css += animation.keyframes;
  }
  css += `
    .${cssClass} {
      ${animation.animation}
    }
  `;
  return css;
};

export const getCombinedAnimationClass = (hover: AnimationOption | null, entrance: AnimationOption | null): string => {
  const classes = [];
  if (entrance) classes.push(entrance.cssClass);
  if (hover) classes.push(`hover\\:${hover.cssClass}`);
  return classes.join(' ');
};
