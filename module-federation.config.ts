export const mfConfig = {
  name: "dhaam_settings_app_ui",
  exposes: {
    "./ConfigurationsComponent": "./src/localComponents/configurations/configurationscomponent",
    "./MarketPlaceDesignComponent": "./src/localComponents/marketPlaceDesign/marketplacedesigncomponent",
    "./IntegrationComponent": "./src/localComponents/integration/integrationComponent",
    "./tailwindStyles": "./src/index.css"
  },
  shared: ["react", "react-dom"],
};
