import ContentLoader from "react-content-loader"

const SelectLoader = () => (
  <ContentLoader 
    speed={2}
    width={250}
    height={100}
    viewBox="0 0 250 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="250" height="100" />
  </ContentLoader>
)

export default SelectLoader