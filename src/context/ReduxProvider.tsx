"use client";

import { store } from "@/lib/state/store";
import React from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
