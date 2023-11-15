
import ContentLoader from "react-content-loader"

const ProductInOrderLoader = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={70}
    viewBox="0 0 100% 70"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="100%" height="70" />
  </ContentLoader>
)

export default ProductInOrderLoader
