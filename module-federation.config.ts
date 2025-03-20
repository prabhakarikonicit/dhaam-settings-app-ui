export const mfConfig = {
  name: "dhaam_settings_app_ui",
  exposes: {
    "./ConfigurationsComponent": "./src/localComponents/configurations/configurationscomponent",
    "./tailwindStyles": "./src/index.css"
  },
  shared: ["react", "react-dom"],
};
