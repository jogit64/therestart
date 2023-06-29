// StatusBarCustom.js
import React from "react";
import { StatusBar } from "expo-status-bar";

const COLORS = {
  statusBarBg: "rgba(111,120,189,1)",
};

export const StatusBarCustom = () => (
  <StatusBar style="light" backgroundColor={COLORS.statusBarBg} />
);
