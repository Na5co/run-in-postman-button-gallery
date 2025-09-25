import { ButtonStyle, CustomGradient, ButtonAnimation } from '@/types/button';
import { getCombinedAnimationClass, getAnimationCSS } from '@/lib/animations';
import { shadeColor } from '@/lib/colors';

export interface GenerateHtmlOptions {
  collectionId: string;
  workspaceId?: string;
  style: ButtonStyle;
  customGradient?: CustomGradient;
  buttonText?: string;
  animations?: ButtonAnimation;
  icon?: { name: string, svg: string };
}

export function generatePostmanButtonHtml({
  collectionId,
  workspaceId,
  style,
  customGradient,
  buttonText = 'Run in Postman',
  animations,
  icon,
}: GenerateHtmlOptions): string {
  const gradientFrom = customGradient?.from || style.gradientFrom;
  const gradientTo = customGradient?.to || style.gradientTo;
  
  const forkUrl = `https://god.postman.co/run-collection/${collectionId}?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D${collectionId}%26entityType%3Dcollection%26workspaceId%3D${workspaceId}`;
  
  const getButtonStyles = () => {
    let baseStyle = `
                border-radius: ${style.borderRadius};
                padding: ${style.padding};
                font-size: ${style.fontSize};
                font-weight: ${style.fontWeight};
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                position: relative;
                overflow: hidden;
                border: none;
                will-change: transform, box-shadow;
    `;

    // Special handling for different button types
    if (style.id === 'outlined-minimal') {
      return baseStyle + `
                background: transparent;
                border: 2px solid ${gradientFrom};
                box-shadow: none;
                color: ${gradientFrom};
      `;
    }

    if (style.id === 'glassmorphism') {
      return baseStyle + `
                background: linear-gradient(135deg, ${gradientFrom}40, ${gradientTo}40);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: ${style.shadow};
                color: ${style.textColor};
      `;
    }

    if (style.id === 'retro-vintage') {
      return baseStyle + `
                background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
                text-transform: uppercase;
                letter-spacing: 1px;
                box-shadow: ${style.shadow};
                color: ${style.textColor};
      `;
    }

    if (style.id === 'elevated-3d') {
      const darkerColor = shadeColor(gradientTo, -20);
      return baseStyle + `
                background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
                box-shadow: 0 8px 0 ${darkerColor}, 0 12px 25px ${gradientTo}66;
                color: ${style.textColor};
      `;
    }

    if (style.id === 'pixel-art') {
      const shadowColor = shadeColor(gradientTo, -40);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 4px 4px 0px ${shadowColor};
        border: 4px solid ${shadeColor(gradientTo, -50)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'subtle-shimmer') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 10px 20px ${gradientTo}33;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'skewed-dynamic') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 10px 20px ${gradientTo}33;
        transform: skew(-10deg);
        color: ${style.textColor};
      `;
    }

    if (style.id === 'minimalist-icon') {
        return baseStyle + `
            background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
            box-shadow: 0 4px 10px ${gradientTo}4d;
            border-radius: 50%;
            padding: 16px;
            color: ${style.textColor};
        `;
    }

    if (style.id === 'bold-block') {
      const textColor = shadeColor(gradientFrom, -50);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 0 0 4px ${textColor};
        color: ${textColor};
        border: 2px solid ${textColor};
      `;
    }

    if (style.id === 'comic-book') {
      const shadowColor = shadeColor(gradientTo, -50);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 3px solid ${shadowColor};
        box-shadow: 6px 6px 0px ${shadowColor};
        color: ${shadowColor};
        font-weight: 900;
      `;
    }

    if (style.id === 'caution-tape') {
      return baseStyle + `
        background-image: repeating-linear-gradient(45deg, ${gradientFrom}, ${gradientFrom} 30px, ${gradientTo} 30px, ${gradientTo} 60px);
        color: ${shadeColor(gradientTo, -60)};
        font-weight: 800;
        border: 4px solid ${shadeColor(gradientTo, -60)};
      `;
    }

    if (style.id === 'cyberpunk-glitch') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 0 15px ${gradientTo};
        text-shadow: 2px 2px 0px ${gradientFrom};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'hand-drawn') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 3px solid ${shadeColor(gradientTo, -20)};
        border-radius: 16px 4px 16px 4px / 4px 16px 4px 16px;
        color: ${shadeColor(gradientTo, -20)};
      `;
    }

    if (style.id === 'ugly-90s') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 4px solid ${style.textColor};
        box-shadow: 4px 4px 0px ${style.textColor};
        font-weight: 900;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'baroque-luxury') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 2px solid ${shadeColor(gradientFrom, -20)};
        box-shadow: 0 0 15px ${gradientFrom};
        font-family: serif;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'wood-grain') {
      return baseStyle + `
        background-image: linear-gradient(to right, ${gradientFrom}, ${gradientTo}), linear-gradient(to right, rgba(255,255,255,0.2) 50%, transparent 50%), linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, transparent 50%);
        background-blend-mode: screen;
        background-size: 100%, 8px 8px, 8px 8px;
        border: 2px solid ${shadeColor(gradientFrom, -20)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'liquid-metal') {
      return baseStyle + `
        background: radial-gradient(circle at 100% 100%, ${gradientFrom} 0, ${gradientTo} 100%);
        box-shadow: 0 0 15px ${gradientTo};
        color: ${shadeColor(gradientTo, -40)};
      `;
    }

    if (style.id === 'blueprint') {
      return baseStyle + `
        background: ${gradientFrom};
        border: 2px dashed ${gradientTo};
        color: ${gradientTo};
      `;
    }

    if (style.id === 'rusted-metal') {
      return baseStyle + `
        background-image: linear-gradient(${gradientFrom}, ${gradientTo}), repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 2px, transparent 2px, transparent 4px);
        box-shadow: inset 0 0 10px ${shadeColor(gradientFrom, -30)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'satin-finish') {
      return baseStyle + `
        background: linear-gradient(180deg, ${gradientFrom}, ${gradientTo});
        box-shadow: inset 0 1px 0 ${shadeColor(gradientFrom, 20)}, 0 10px 20px rgba(0,0,0,0.1);
        color: ${style.textColor};
      `;
    }

    if (style.id === 'letterpress') {
      return baseStyle + `
        background: ${gradientFrom};
        box-shadow: inset 0 2px 4px ${shadeColor(gradientFrom, -10)}, 0 1px 1px ${shadeColor(gradientFrom, 10)};
        text-shadow: 0 1px 1px ${shadeColor(gradientFrom, 10)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'dual-tone') {
      return baseStyle + `
        background: linear-gradient(90deg, ${gradientFrom} 50%, ${gradientTo} 50%);
        color: ${style.textColor};
      `;
    }

    if (style.id === 'aurora') {
      return baseStyle + `
        background-image: radial-gradient(ellipse at bottom, ${gradientFrom}, transparent), radial-gradient(ellipse at top, ${gradientTo}, transparent);
        box-shadow: 0 0 20px ${gradientTo};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'minimalist-stroke') {
      return baseStyle + `
        background: transparent;
        border: 2px solid ${gradientFrom};
        color: ${gradientFrom};
      `;
    }

    // Default gradient background
    return baseStyle + `
                background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
                box-shadow: ${style.shadow};
                color: ${style.textColor};
    `;
  };

  const getIconSize = () => {
    if (style.id === 'icon-heavy') return '32';
    if (style.id === 'retro-vintage') return '20';
    return '16';
  };

  const getButtonText = () => {
    if (style.id === 'icon-heavy') return 'Run';
    if (style.id === 'minimalist-icon') return '';
    return buttonText;
  };

  const iconSize = getIconSize();
  const displayText = getButtonText();
  
  const animationClass = animations ? getCombinedAnimationClass(animations.hover, animations.entrance) : '';
  const animationCSS = animations ? 
    [
      animations.entrance && animations.entrance.id !== 'none' ? getAnimationCSS(animations.entrance, `.c-postman-button.${animations.entrance.cssClass}`) : '',
      animations.hover && animations.hover.id !== 'none' ? getAnimationCSS(animations.hover, `.c-postman-button.${animations.hover.cssClass}:hover`) : ''
    ].join('\n') : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Run in Postman Button - ${style.name}</title>
    <style>
        body {
            margin: 0;
            padding: 40px;
            background: #f0f2f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .postman-run-button-container {
            text-align: center;
        }
        .c-postman-button {
            ${getButtonStyles()}
        }
        
        /* Custom Animations */
        ${animationCSS}
    </style>
</head>
<body>
    <div class="postman-run-button-container">
        <a
            href="${forkUrl}"
            target="_blank"
            class="c-postman-button ${animationClass}"
        >
            ${icon ? `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"/><path d="M6 12a2 2 0 0 0-2-2H2v6h2a2 2 0 0 0 2-2Z"/><path d="M12 10a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v10h2a2 2 0 0 0 2-2Z"/><path d="m22 12-4.5 4.5M17.5 12l4.5 4.5"/></svg>` : ''}
            ${displayText}
        </a>
    </div>
</body>
</html>`;
}

export function generateInlineButtonHtml({
  collectionId,
  workspaceId,
  style,
  customGradient,
  buttonText = 'Run in Postman',
  animations,
  icon,
}: GenerateHtmlOptions): string {
  const gradientFrom = customGradient?.from || style.gradientFrom;
  const gradientTo = customGradient?.to || style.gradientTo;
  
  const forkUrl = `https://god.postman.co/run-collection/${collectionId}?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D${collectionId}%26entityType%3Dcollection%26workspaceId%3D${workspaceId}`;
  
  const getButtonStyles = () => {
    let baseStyle = `
        border-radius: ${style.borderRadius};
        padding: ${style.padding};
        font-size: ${style.fontSize};
        font-weight: ${style.fontWeight};
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        position: relative;
        overflow: hidden;
        border: none;
        will-change: transform, box-shadow;
    `;

    // Special handling for different button types
    if (style.id === 'outlined-minimal') {
      return baseStyle + `
        background: transparent;
        border: 2px solid ${gradientFrom};
        box-shadow: none;
        color: ${gradientFrom};
      `;
    }

    if (style.id === 'glassmorphism') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}40, ${gradientTo}40);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: ${style.shadow};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'retro-vintage') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: ${style.shadow};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'elevated-3d') {
      const darkerColor = shadeColor(gradientTo, -20);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 8px 0 ${darkerColor}, 0 12px 25px ${gradientTo}66;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'pixel-art') {
      const shadowColor = shadeColor(gradientTo, -40);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 4px 4px 0px ${shadowColor};
        border: 4px solid ${shadeColor(gradientTo, -50)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'subtle-shimmer') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 10px 20px ${gradientTo}33;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'skewed-dynamic') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 10px 20px ${gradientTo}33;
        transform: skew(-10deg);
        color: ${style.textColor};
      `;
    }

    if (style.id === 'minimalist-icon') {
        return baseStyle + `
            background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
            box-shadow: 0 4px 10px ${gradientTo}4d;
            border-radius: 50%;
            padding: 16px;
            color: ${style.textColor};
        `;
    }

    if (style.id === 'bold-block') {
      const textColor = shadeColor(gradientFrom, -50);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 0 0 4px ${textColor};
        color: ${textColor};
        border: 2px solid ${textColor};
      `;
    }

    if (style.id === 'comic-book') {
      const shadowColor = shadeColor(gradientTo, -50);
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 3px solid ${shadowColor};
        box-shadow: 6px 6px 0px ${shadowColor};
        color: ${shadowColor};
        font-weight: 900;
      `;
    }

    if (style.id === 'caution-tape') {
      return baseStyle + `
        background-image: repeating-linear-gradient(45deg, ${gradientFrom}, ${gradientFrom} 30px, ${gradientTo} 30px, ${gradientTo} 60px);
        color: ${shadeColor(gradientTo, -60)};
        font-weight: 800;
        border: 4px solid ${shadeColor(gradientTo, -60)};
      `;
    }

    if (style.id === 'cyberpunk-glitch') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: 0 0 15px ${gradientTo};
        text-shadow: 2px 2px 0px ${gradientFrom};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'hand-drawn') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 3px solid ${shadeColor(gradientTo, -20)};
        border-radius: 16px 4px 16px 4px / 4px 16px 4px 16px;
        color: ${shadeColor(gradientTo, -20)};
      `;
    }

    if (style.id === 'ugly-90s') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 4px solid ${style.textColor};
        box-shadow: 4px 4px 0px ${style.textColor};
        font-weight: 900;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'baroque-luxury') {
      return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        border: 2px solid ${shadeColor(gradientFrom, -20)};
        box-shadow: 0 0 15px ${gradientFrom};
        font-family: serif;
        color: ${style.textColor};
      `;
    }

    if (style.id === 'wood-grain') {
      return baseStyle + `
        background-image: linear-gradient(to right, ${gradientFrom}, ${gradientTo}), linear-gradient(to right, rgba(255,255,255,0.2) 50%, transparent 50%), linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, transparent 50%);
        background-blend-mode: screen;
        background-size: 100%, 8px 8px, 8px 8px;
        border: 2px solid ${shadeColor(gradientFrom, -20)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'liquid-metal') {
      return baseStyle + `
        background: radial-gradient(circle at 100% 100%, ${gradientFrom} 0, ${gradientTo} 100%);
        box-shadow: 0 0 15px ${gradientTo};
        color: ${shadeColor(gradientTo, -40)};
      `;
    }

    if (style.id === 'blueprint') {
      return baseStyle + `
        background: ${gradientFrom};
        border: 2px dashed ${gradientTo};
        color: ${gradientTo};
      `;
    }

    if (style.id === 'rusted-metal') {
      return baseStyle + `
        background-image: linear-gradient(${gradientFrom}, ${gradientTo}), repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 2px, transparent 2px, transparent 4px);
        box-shadow: inset 0 0 10px ${shadeColor(gradientFrom, -30)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'satin-finish') {
      return baseStyle + `
        background: linear-gradient(180deg, ${gradientFrom}, ${gradientTo});
        box-shadow: inset 0 1px 0 ${shadeColor(gradientFrom, 20)}, 0 10px 20px rgba(0,0,0,0.1);
        color: ${style.textColor};
      `;
    }

    if (style.id === 'letterpress') {
      return baseStyle + `
        background: ${gradientFrom};
        box-shadow: inset 0 2px 4px ${shadeColor(gradientFrom, -10)}, 0 1px 1px ${shadeColor(gradientFrom, 10)};
        text-shadow: 0 1px 1px ${shadeColor(gradientFrom, 10)};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'dual-tone') {
      return baseStyle + `
        background: linear-gradient(90deg, ${gradientFrom} 50%, ${gradientTo} 50%);
        color: ${style.textColor};
      `;
    }

    if (style.id === 'aurora') {
      return baseStyle + `
        background-image: radial-gradient(ellipse at bottom, ${gradientFrom}, transparent), radial-gradient(ellipse at top, ${gradientTo}, transparent);
        box-shadow: 0 0 20px ${gradientTo};
        color: ${style.textColor};
      `;
    }

    if (style.id === 'minimalist-stroke') {
      return baseStyle + `
        background: transparent;
        border: 2px solid ${gradientFrom};
        color: ${gradientFrom};
      `;
    }

    // Default gradient background
    return baseStyle + `
        background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
        box-shadow: ${style.shadow};
        color: ${style.textColor};
    `;
  };

  const getIconSize = () => {
    if (style.id === 'icon-heavy') return '32';
    if (style.id === 'retro-vintage') return '20';
    return '16';
  };

  const getButtonText = () => {
    if (style.id === 'icon-heavy') return 'Run';
    if (style.id === 'minimalist-icon') return '';
    return buttonText;
  };

  const iconSize = getIconSize();
  const displayText = getButtonText();
  
  const animationClass = animations ? getCombinedAnimationClass(animations.hover, animations.entrance) : '';
  const animationCSS = animations ? 
    [
        animations.entrance && animations.entrance.id !== 'none' ? getAnimationCSS(animations.entrance, `.c-postman-button--${style.id}.${animations.entrance.cssClass}`) : '',
        animations.hover && animations.hover.id !== 'none' ? getAnimationCSS(animations.hover, `.c-postman-button--${style.id}.${animations.hover.cssClass}:hover`) : ''
    ].join('\n') : '';

  const getHoverEffects = () => {
    if (style.hoverEffect.includes('scale')) {
      return `this.style.transform='scale(1.05)';`;
    }
    if (style.hoverEffect.includes('translate-y')) {
      return `this.style.transform='translateY(-2px)';`;
    }
    if (style.hoverEffect.includes('rotate')) {
      return `this.style.transform='rotate(1deg) scale(1.05)';`;
    }
    return `this.style.transform='scale(1.05)';`;
  };

  return `<!-- Run in Postman Button - ${style.name} Style -->
<style>
.c-postman-button--${style.id} {
  ${getButtonStyles().replace(/\n/g, '').replace(/\s+/g, ' ')}
}

/* Custom Animations */
${animationCSS}
</style>
<a
    href="${forkUrl}"
    target="_blank"
    class="c-postman-button--${style.id} ${animationClass}"
>
    ${icon ? `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M18 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"/><path d="M6 12a2 2 0 0 0-2-2H2v6h2a2 2 0 0 0 2-2Z"/><path d="M12 10a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v10h2a2 2 0 0 0 2-2Z"/><path d="m22 12-4.5 4.5M17.5 12l4.5 4.5"/></svg>` : ''}
    ${displayText}
</a>`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
