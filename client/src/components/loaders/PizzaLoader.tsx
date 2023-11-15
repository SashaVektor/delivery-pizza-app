import ContentLoader from "react-content-loader"

const PizzaLoader = () => (
  <ContentLoader 
    speed={2}
    width={256}
    height={350}
    viewBox="0 0 256 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="20" ry="20" width="256" height="150" /> 
    <rect x="0" y="167" rx="8" ry="8" width="150" height="26" /> 
    <rect x="0" y="204" rx="15" ry="15" width="256" height="70" /> 
    <rect x="0" y="296" rx="13" ry="13" width="68" height="28" /> 
    <rect x="102" y="292" rx="20" ry="20" width="150" height="40" />
  </ContentLoader>
)

export default PizzaLoader