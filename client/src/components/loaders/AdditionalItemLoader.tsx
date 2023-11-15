import ContentLoader from "react-content-loader"

const AdditionalItemLoader = () => (
  <ContentLoader 
    speed={2}
    width={150}
    height={70}
    viewBox="0 0 150 70"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="150" height="70" />
  </ContentLoader>
)

export default AdditionalItemLoader
