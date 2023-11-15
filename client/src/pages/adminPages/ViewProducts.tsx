import PaginationsButtons from "../../components/PaginationsButtons";
import PizzaCard from "../../components/PizzaCard";
import EditProductModal from "../../components/adminComponents/EditProductModal";
import PizzaLoader from "../../components/loaders/PizzaLoader";
import { useGetProductsQuery } from "../../store/services/products"
import { useState } from 'react'

const ViewProducts = () => {
  const { data: pizzas, isLoading } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pizzasPerPage = 3;

  const indexOfLastOrder = currentPage * pizzasPerPage;
  const indexOfFirstOrder = indexOfLastOrder - pizzasPerPage;
  const totalPages = Math.ceil((pizzas ? pizzas.length : 0) / pizzasPerPage)

  const currentPizzas = pizzas?.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginateNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <EditProductModal />
      <div className="relative pb-24 flex-1">
        <h4 className="text-red-500 text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-5">
          Товари в наявності:
        </h4>
        <div className="flex flex-wrap gap-5">
          {isLoading || !currentPizzas ? (
            [...new Array(3)].map((_, i) => (
              <PizzaLoader key={i} />
            ))
          )
            : currentPizzas.map((pizza) => (
              <PizzaCard
                pizza={pizza}
                key={pizza._id}
                isAdminCard
              />
            ))}
        </div>
        {currentPizzas?.length ? <PaginationsButtons
          currentPage={currentPage}
          paginateNext={paginateNext}
          paginatePrev={paginatePrev}
          totalPages={totalPages}
        /> : null}
      </div>
    </>
  )
}

export default ViewProducts
