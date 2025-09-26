"use client";

import React, { useState } from "react";
import c from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "../Settings/Settings";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={c.header}>
      <div className={c.container}>
        <div className={c.logo}>
          <Link href="/" className={c.logoLink} onClick={closeMobileMenu}>
            Binary Game
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={c.desktopNav}>
          <ul className={c.navList}>
            <li>
              <Link
                href="/"
                className={`${c.navLink} ${isActive("/") ? c.active : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className={`${c.navLink} ${isActive("/game") ? c.active : ""}`}
              >
                Game
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className={`${c.navLink} ${
                  isActive("/leaderboard") ? c.active : ""
                }`}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Settings Button */}
        <div className={c.desktopSettings}>
          <Settings />
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${c.burgerBtn} ${mobileMenuOpen ? c.active : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={c.burgerLine}></span>
          <span className={c.burgerLine}></span>
          <span className={c.burgerLine}></span>
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <>
            <div className={c.mobileOverlay} onClick={closeMobileMenu}></div>
            <nav className={c.mobileNav}>
              <ul className={c.mobileNavList}>
                <li>
                  <Link
                    href="/"
                    className={`${c.mobileNavLink} ${
                      isActive("/") ? c.activeMobile : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/game"
                    className={`${c.mobileNavLink} ${
                      isActive("/game") ? c.activeMobile : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Game
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    className={`${c.mobileNavLink} ${
                      isActive("/leaderboard") ? c.activeMobile : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Leaderboard
                  </Link>
                </li>
                <li className={c.mobileSettings}>
                  <Settings />
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};
