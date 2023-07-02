/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  daisyui: {
    themes: [
        {
        "light": {
          "primary": "#1a5168",
          "secondary": "#ffd368",
          "accent": "purple", // #f59e0b
          "neutral": "#111827",
          "base-100": "#fef5cf",
          "info": "#1e40af",
          "success": "#0e773d",
          "warning": "#f0870f",
          "error": "#be123c",
          
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
          }
        },
        {
          "dark": {
            "primary": "#fef5cf",
            "secondary": "#ffd368",
            "accent": "#be185d",
            "neutral": "#111827",
            "base-100": "#164e63",
            "info": "#06b6d4",
            "success": "#0e773d",
            "warning": "#f0870f",
            "error": "#be123c",
          
            "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
            "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
            "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
            "--animation-btn": "0.25s", // duration of animation when you click on button
            "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
            "--btn-text-case": "uppercase", // set default text transform for buttons
            "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
            "--border-btn": "1px", // border width of buttons
            "--tab-border": "1px", // border width of tabs
            "--tab-radius": "0.5rem", // border radius of tabs
          }
        }
      ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "",
    logs: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require("daisyui")
  ],
}

