export type NavbarAction = { name: string; title: string };

export interface NavbarLayer {
  id: number;
  title?: string;
  theme?: {
    color: string;
    background: string | 'transparent';
    border?: boolean;
  };
  button?: string;
  actions?: NavbarAction[];
  disableTitleTransition?: boolean;
}
