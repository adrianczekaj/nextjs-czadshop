import React from "react";
import { App, ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
