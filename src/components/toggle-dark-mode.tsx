"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

export default function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" right={4} bottom={4} zIndex={99}>
      <IconButton
        aria-label="toggle dark mode"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </Box>
  );
}
