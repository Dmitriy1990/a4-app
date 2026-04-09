declare module '*.svg' {
  import type { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGSVGElement>) => ReactElement;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
