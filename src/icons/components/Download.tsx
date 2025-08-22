import type { SVGProps } from "react";
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M3 12.3v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="m7.9 12.3 4.1 4 4.1-4" data-name="Right" />
      <path d="M12 2.7v11.5" />
    </g>
  </svg>
);
export default SvgDownload;
