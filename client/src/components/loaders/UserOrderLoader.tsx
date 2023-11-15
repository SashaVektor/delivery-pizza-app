import ContentLoader from "react-content-loader"

const UserOrderLoader = () => (
  <ContentLoader 
    speed={2}
    width={300}
    height={250}
    viewBox="0 0 300 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="8" rx="8" ry="8" width="300" height="17" /> 
    <rect x="0" y="39" rx="8" ry="8" width="260" height="17" /> 
    <rect x="0" y="71" rx="8" ry="8" width="260" height="17" /> 
    <rect x="0" y="106" rx="8" ry="8" width="260" height="17" /> 
    <rect x="0" y="141" rx="8" ry="8" width="260" height="17" /> 
    <rect x="0" y="178" rx="5" ry="5" width="60" height="20" /> 
    <rect x="194" y="180" rx="5" ry="5" width="100" height="20" />
  </ContentLoader>
)

export default UserOrderLoader