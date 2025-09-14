import React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// simple theme hook (replace with your own theme provider if you have one)
const useTheme = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    // detect system theme
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(dark ? "dark" : "light");
  }, []);

  return { theme };
};

const Toaster = (props: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
