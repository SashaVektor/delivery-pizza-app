import ContentLoader from "react-content-loader"

const OrderDetaisTextLoader = () => (
  <ContentLoader 
    speed={2}
    width={300}
    height={25}
    viewBox="0 0 300 25"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="300" height="25" />
  </ContentLoader>
)

export default OrderDetaisTextLoader