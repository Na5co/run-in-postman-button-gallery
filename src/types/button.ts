export interface ButtonStyle {
  id: string;
  name: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  fontWeight: string;
  shadow: string;
  hoverEffect: string;
}

export interface CustomGradient {
  from: string;
  to: string;
}

export interface AnimationOption {
  id: string;
  name: string;
  description: string;
  cssClass: string;
  keyframes?: string;
  baseStyles?: string;
  hoverStyles?: string;
}

export interface ButtonAnimation {
  hover: AnimationOption | null;
  entrance: AnimationOption | null;
}

export interface PostmanButtonConfig {
  collectionId: string;
  workspaceId: string;
  style: ButtonStyle;
  customGradient?: CustomGradient;
  animations?: ButtonAnimation;
}
