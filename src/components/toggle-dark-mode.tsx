"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

export default function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" right={4} top={4}>
      <IconButton
        aria-label="toggle dark mode"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </Box>
  );
}
