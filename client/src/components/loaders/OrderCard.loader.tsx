import ContentLoader from "react-content-loader"

const OrderCardLoader = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={41}
    viewBox="0 0 100% 41"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="100%" height="41" />
  </ContentLoader>
)

export default OrderCardLoader