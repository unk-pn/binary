"use client";

import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import c from "./RegisterButton.module.css";

interface RegisterButtonProps {
  theme?: "light" | "dark";
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
}

export const RegisterButton = ({
  theme = "dark",
  variant = "primary",
  size = "medium",
  children,
}: RegisterButtonProps) => {
  return (
    <div className={`${c.wrapper} ${c[variant]} ${c[size]}`}>
      <ClerkSignUpButton
        mode="modal"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            formButtonPrimary: {
              backgroundColor: "var(--accent-color)",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "0.75rem 1.5rem",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#2563eb",
                transform: "translateY(-1px)",
              },
            },
            card: {
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              border: "none",
              outline: "none",
            },
            modalContent: {
              border: "none",
              outline: "none",
            },
            modalCloseButton: {
              outline: "none",
            },
            rootBox: {
              outline: "none",
            },
          },
        }}
      >
        <button className={c.button}>
          <span className={c.text}>{children || "Sign In"}</span>
          <div className={c.shine}></div>
        </button>
      </ClerkSignUpButton>
    </div>
  );
};
